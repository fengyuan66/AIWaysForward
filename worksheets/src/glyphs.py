# -*- coding: utf-8 -*-
"""Font registration, pinyin conversion and (partial) glyph drawing."""
import re
from fontTools.ttLib import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLFont

from vocab import SPLIT, SIMPLE

FONT_DIR = r"C:\Windows\Fonts"
KAI = "KaiTi"
SANS = "DengXian"
SANSB = "DengXianB"
LAT = "ArialPY"
LATB = "ArialPYB"

pdfmetrics.registerFont(RLFont(KAI, FONT_DIR + r"\simkai.ttf"))
pdfmetrics.registerFont(RLFont(SANS, FONT_DIR + r"\Deng.ttf"))
pdfmetrics.registerFont(RLFont(SANSB, FONT_DIR + r"\Dengb.ttf"))
pdfmetrics.registerFont(RLFont(LAT, FONT_DIR + r"\arial.ttf"))
pdfmetrics.registerFont(RLFont(LATB, FONT_DIR + r"\arialbd.ttf"))

_tt = TTFont(FONT_DIR + r"\simkai.ttf")
_cmap = _tt.getBestCmap()
_glyf = _tt["glyf"]
UPEM = _tt["head"].unitsPerEm


def bbox(ch):
    """Ink bounding box (x0, y0, x1, y1) in font units, or None."""
    g = _glyf[_cmap[ord(ch)]]
    if not hasattr(g, "xMin"):
        return None
    return g.xMin, g.yMin, g.xMax, g.yMax


# --------------------------- pinyin ---------------------------
_TONES = {
    "a": "āáǎà", "e": "ēéěè", "i": "īíǐì", "o": "ōóǒò", "u": "ūúǔù", "ü": "ǖǘǚǜ",
}


def syl(s):
    """'xia4' -> 'xià'; '…' passes through."""
    if s == "…":
        return s
    m = re.fullmatch(r"([a-zü]+)([1-5])", s.replace("v", "ü"))
    if not m:
        raise ValueError(s)
    body, tone = m.group(1), int(m.group(2))
    if tone == 5:
        return body
    for v in "ae":
        if v in body:
            return body.replace(v, _TONES[v][tone - 1], 1)
    if "ou" in body:
        return body.replace("o", _TONES["o"][tone - 1], 1)
    idx = max(i for i, c in enumerate(body) if c in "aeiouü")
    c = body[idx]
    return body[:idx] + _TONES[c][tone - 1] + body[idx + 1:]


def pinyin_list(py):
    return [syl(s) for s in py.split()]


# --------------------------- drawing ---------------------------
from PIL import Image, ImageDraw, ImageFont
_pil = ImageFont.truetype(FONT_DIR + r"\simkai.ttf", 300)
_cache = {}


def refined_split(ch):
    """Snap the nominal split fraction to the emptiest column/row nearby."""
    if ch in _cache:
        return _cache[ch]
    axis, s = SPLIT[ch]
    im = Image.new("L", (420, 420), 0)
    ImageDraw.Draw(im).text((60, 40), ch, font=_pil, fill=255)
    bb = im.getbbox()
    px = im.load()
    x0, y0, x1, y1 = bb
    if axis == "x":
        prof = [sum(1 for y in range(y0, y1) if px[x, y] > 100) for x in range(x0, x1)]
    else:
        prof = [sum(1 for x in range(x0, x1) if px[x, y] > 100) for y in range(y0, y1)]
    n = len(prof)
    lo, hi = int(max(0.12, s - .13) * n), int(min(0.88, s + .13) * n)
    best = min(range(lo, hi + 1), key=lambda i: (prof[i], abs(i - s * n)))
    # centre of the run of equally-empty columns around best
    j = best
    while j + 1 <= hi and prof[j + 1] <= prof[best]:
        j += 1
    best = (best + j) // 2
    _cache[ch] = (axis, best / n)
    return _cache[ch]


def split_rect(ch, part, fs):
    """Clip region (relative offsets handled by caller) for part 'A' or 'B' of ch.
    Returns None for no clip (draw everything), or (x0,y0,x1,y1) in font units."""
    bb = bbox(ch)
    x0, y0, x1, y1 = bb
    axis, s = refined_split(ch)
    pad = 40
    if axis == "x":
        cut = x0 + s * (x1 - x0)
        return (x0 - pad, y0 - pad, cut, y1 + pad) if part == "A" else (cut, y0 - pad, x1 + pad, y1 + pad)
    cut = y1 - s * (y1 - y0)       # 'first' = top part
    return (x0 - pad, cut, x1 + pad, y1 + pad) if part == "A" else (x0 - pad, y0 - pad, x1 + pad, cut)


def draw_glyph(c, ch, cx, cy, fs, color=(0.1, 0.1, 0.1), part=None):
    """Draw ch centred (by ink box) at (cx, cy). part None=full, 'A'/'B' = half."""
    bb = bbox(ch)
    if bb is None:
        return
    sc = fs / UPEM
    bx = (bb[0] + bb[2]) / 2
    by = (bb[1] + bb[3]) / 2
    ox = cx - bx * sc
    oy = cy - by * sc
    c.saveState()
    if part:
        r = split_rect(ch, part, fs)
        p = c.beginPath()
        p.rect(ox + r[0] * sc, oy + r[1] * sc, (r[2] - r[0]) * sc, (r[3] - r[1]) * sc)
        c.clipPath(p, stroke=0, fill=0)
    c.setFillColorRGB(*color)
    c.setFont(KAI, fs)
    c.drawString(ox, oy, ch)
    c.restoreState()


def has_split(ch):
    return ch in SPLIT and ch not in SIMPLE
