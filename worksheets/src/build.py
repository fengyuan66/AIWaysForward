# -*- coding: utf-8 -*-
"""Build the 生词 practice workbook + answer key (PDF, US Letter)."""
import math
import random
import re
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

from vocab import CHAPTERS, MNEMONICS, TIPS, SIMPLE
import glyphs as G

W, H = letter
M = 36
GAP = 20
COLW = (W - 2 * M - GAP) / 2
RED = (0.78, 0.08, 0.08)
INK = (0.1, 0.1, 0.1)
GREY = (0.42, 0.42, 0.42)
CONTENT_TOP = H - 100
CONTENT_BOTTOM = 40

TYPES = {
    "semi": dict(no="1", cn="半拼音听写", en="Semi-Pinyin Dictation",
                 instr="看拼音和半个字，写出整个汉字。  Use the pinyin and the part shown to write the whole character."),
    "py": dict(no="2", cn="拼音听写", en="Pinyin Dictation",
               instr="看拼音，写汉字。  Write the characters for the pinyin."),
    "chr": dict(no="3", cn="词语听写", en="Vocab Dictation",
                instr="看汉字，写拼音（别忘了声调）。  Write the pinyin for each word — don’t forget the tone marks."),
    "fill": dict(no="4", cn="填空", en="Fill in the Blank",
                 instr="把方框补充完整。  Fill each box with the missing word."),
}
SHORT = {"semi": "半拼音", "py": "拼音听写", "chr": "写拼音", "fill": "填空"}


# ------------------------------------------------------------------ items
class Item:
    def __init__(self, ci, tup):
        self.ci = ci
        self.word, self.py, self.sa, self.sb = tup[:4]
        self.show = tup[4] if len(tup) > 4 else self.word
        self.pys = G.pinyin_list(self.py)
        assert len(self.pys) == len(self.word), (self.word, self.py)
        for a, b in zip(self.word, self.pys):
            assert (a == "…") == (b == "…"), (self.word, self.py)
        flat = re.sub(r"[{}]", "", self.sa)
        for s in (self.sa, self.sb):
            blanks = "".join(re.findall(r"\{([^}]*)\}", s))
            assert blanks == self.word.replace("…", ""), (self.word, s)


ITEMS = [[Item(ci, t) for t in ch["items"]] for ci, ch in enumerate(CHAPTERS)]


def order(ci, kind, setname):
    items = list(ITEMS[ci])
    if setname == "B":
        rnd = random.Random(1000 * (ci + 1) + len(kind) * 7)
        while True:
            rnd.shuffle(items)
            if all(a is not b for a, b in zip(items, ITEMS[ci])):
                break
    return items


def balanced(n, cap):
    pages = math.ceil(n / cap)
    per = math.ceil(n / pages)
    out, i = [], 0
    while i < n:
        out.append((i, min(n, i + per)))
        i += per
    return out


# ------------------------------------------------------------------ text helpers
from fontTools.ttLib import TTFont as _TT
_cm_deng = _TT(G.FONT_DIR + r"\Deng.ttf").getBestCmap()


def cjk_font(ch):
    return G.SANS if ord(ch) in _cm_deng else G.KAI


def run_font(ch, latin):
    return latin if ord(ch) < 0x2E80 else cjk_font(ch)


def tokens(text):
    out, buf = [], ""
    for ch in text:
        if ord(ch) < 0x2E80 and ch != " ":
            buf += ch
        else:
            if buf:
                out.append(buf)
                buf = ""
            out.append(ch)
    if buf:
        out.append(buf)
    return out


def tw(tok, size, latin):
    return sum(G.pdfmetrics.stringWidth(ch, run_font(ch, latin), size) for ch in tok)


def wrap(text, width, size, latin):
    lines, cur, cw = [], "", 0
    for tok in tokens(text):
        w = tw(tok, size, latin)
        if cur and cw + w > width and tok != " " and tok not in "，。！？：；、）」”,.!?":
            lines.append(cur.rstrip())
            cur, cw = "", 0
            if tok == " ":
                continue
        cur += tok
        cw += w
    if cur.strip():
        lines.append(cur.rstrip())
    return lines


def draw_mixed(c, x, y, text, size, latin=G.LAT, color=INK):
    c.setFillColorRGB(*color)
    for ch in text:
        f = run_font(ch, latin)
        c.setFont(f, size)
        c.drawString(x, y, ch)
        x += G.pdfmetrics.stringWidth(ch, f, size)
    return x


def mixed_width(text, size, latin=G.LAT):
    return tw(text, size, latin)


def dots(c, x, cy, w, color=GREY):
    c.setFillColorRGB(*color)
    for k in (-1, 0, 1):
        c.circle(x + w / 2 + k * w * 0.22, cy, 1.1, stroke=0, fill=1)


# ------------------------------------------------------------------ page chrome
class Doc:
    def __init__(self, path, answers, total_pages):
        self.c = canvas.Canvas(path, pagesize=letter)
        self.answers = answers
        self.total = total_pages
        self.pageno = 0
        self.started = False
        self.c.setTitle("生词练习 Vocabulary Practice" + (" – Answer Key" if answers else ""))
        self.c.setAuthor("NW Chinese")

    def new_page(self, num):
        if self.started:
            self.c.showPage()
        self.started = True
        self.pageno = num

    def finish(self):
        self.c.save()


def footer(d, left):
    c = d.c
    c.setStrokeGray(.75)
    c.setLineWidth(.4)
    c.line(M, 32, W - M, 32)
    c.setFillColorRGB(*GREY)
    draw_mixed(c, M, 21, left, 7.5, G.LAT, GREY)
    s = f"{d.pageno} / {d.total}"
    c.setFont(G.LAT, 7.5)
    c.drawRightString(W - M, 21, s)


def header(d, ci, kind, setname, n_items, bank=False):
    c = d.c
    t = TYPES[kind]
    ch = CHAPTERS[ci]
    c.setFillColorRGB(*INK)
    # chapter tab
    c.setFont(G.SANSB, 15)
    c.drawString(M, H - 46, ch["title"])
    x = M + G.pdfmetrics.stringWidth(ch["title"], G.SANSB, 15) + 10
    x = draw_mixed(c, x, H - 46, f"练习{t['no']}  {t['cn']}", 13, G.LATB, INK)
    c.setFont(G.LAT, 9)
    c.setFillColorRGB(*GREY)
    c.drawString(x + 6, H - 46, t["en"])
    # set badge
    c.setLineWidth(1)
    c.setStrokeColorRGB(*INK)
    c.roundRect(W - M - 44, H - 52, 44, 20, 3, stroke=1, fill=0)
    draw_mixed(c, W - M - 44 + 8, H - 46, f"{setname} 组", 11, G.LATB, INK)
    # name line
    if d.answers:
        c.setFillColorRGB(*RED)
        c.setFont(G.SANSB, 11)
        c.drawString(M, H - 66, "参考答案 ANSWER KEY — 教师用 for teacher use")
        c.setFont(G.LAT, 8)
        c.drawRightString(W - M, H - 66, f"{n_items} items on this page")
    else:
        c.setFont(G.SANS, 9)
        c.setFillColorRGB(*INK)
        c.drawString(M, H - 66, "姓名 Name")
        c.setStrokeGray(.3)
        c.setLineWidth(.5)
        c.line(M + 50, H - 68, M + 220, H - 68)
        c.drawString(M + 240, H - 66, "日期 Date")
        c.line(M + 290, H - 68, M + 380, H - 68)
        c.drawString(M + 400, H - 66, "得分 Score")
        c.line(M + 448, H - 68, M + 478, H - 68)
        c.setFont(G.LAT, 9)
        c.drawString(M + 482, H - 66, f"/ {n_items}")
    # instruction
    instr = t["instr"]
    if kind == "fill":
        instr = ("把方框补充完整，方框下有拼音提示。  Fill each box with the missing word — the pinyin hint is under the box."
                 if setname == "A" else
                 "从词库中选词，写在方框里（没有拼音提示）。  Choose from the Word Bank and write the word in the boxes (no hints).")
    draw_mixed(c, M, H - 80, instr, 8, G.LAT, GREY)
    c.setStrokeGray(.2)
    c.setLineWidth(.9)
    c.line(M, H - 86, W - M, H - 86)


# ------------------------------------------------------------------ writing grid
def tian(c, x, y, s, answers_char=None, part=None, ch=None, ink=INK):
    c.setLineWidth(.45)
    c.setDash(2, 2)
    c.setStrokeGray(.72)
    c.line(x + s / 2, y + 1, x + s / 2, y + s - 1)
    c.line(x + 1, y + s / 2, x + s - 1, y + s / 2)
    c.setDash()
    c.setLineWidth(.8)
    c.setStrokeGray(.35)
    c.rect(x, y, s, s)
    if answers_char:
        G.draw_glyph(c, answers_char, x + s / 2, y + s / 2, s * .78, RED)
    elif part and ch:
        G.draw_glyph(c, ch, x + s / 2, y + s / 2, s * .78, ink, part=part)


BOX = 34
PH = 12
PITCH = 47


def draw_pinyin_above(c, x, ybox_top, s, text, size=10):
    w = G.pdfmetrics.stringWidth(text, G.LAT, size)
    if w > s - 1:
        size = size * (s - 1) / w
    c.setFillColorRGB(*INK)
    c.setFont(G.LAT, size)
    c.drawCentredString(x + s / 2, ybox_top + 3, text)


def boxes_page(d, ci, kind, setname, items, start):
    c = d.c
    header(d, ci, kind, setname, len(items))
    rows = math.ceil(len(items) / 2)
    part = "A" if setname == "A" else "B"
    pitch = min(58, (CONTENT_TOP - CONTENT_BOTTOM) / rows)
    BOX = min(40, pitch - PH - 3)
    for k, it in enumerate(items):
        col, r = divmod(k, rows)
        cx = M + col * (COLW + GAP)
        ybox = CONTENT_TOP - r * pitch - PH - BOX - 2
        c.setFont(G.LATB, 9)
        c.setFillColorRGB(*INK)
        c.drawString(cx, ybox + BOX / 2 - 3, f"{start + k + 1}.")
        x = cx + 20
        for chh, py in zip(it.word, it.pys):
            if chh == "…":
                dots(c, x, ybox + BOX / 2, 22)
                x += 22
                continue
            draw_pinyin_above(c, x, ybox + BOX, BOX, py)
            if d.answers:
                tian(c, x, ybox, BOX, answers_char=chh)
            elif kind == "semi" and G.has_split(chh):
                tian(c, x, ybox, BOX, part=part, ch=chh)
            else:
                tian(c, x, ybox, BOX)
            x += BOX
    footer(d, f"{CHAPTERS[ci]['title']} 生词练习 · {SHORT[kind]} · {setname}组")


# ------------------------------------------------------------------ pinyin-writing rows (type 3)
CFS = 21


def draw_word(c, x, y, text, fs, color=INK):
    c.setFillColorRGB(*color)
    for part in re.split(r"(…)", text):
        if part == "…":
            dots(c, x, y + fs * .35, fs * .8)
            x += fs * .8
        elif part:
            c.setFont(G.KAI, fs)
            c.drawString(x, y, part)
            x += G.pdfmetrics.stringWidth(part, G.KAI, fs)
    return x


def word_width(text, fs):
    w = 0
    for part in re.split(r"(…)", text):
        if part == "…":
            w += fs * .8
        elif part:
            w += G.pdfmetrics.stringWidth(part, G.KAI, fs)
    return w


def pinyin_grid(c, x0, x1, ymid):
    h = 6
    ys = [ymid - 1.5 * h + i * h for i in range(4)]
    c.setLineWidth(.5)
    for i, y in enumerate(ys):
        c.setStrokeGray(.35 if i in (0, 3) else .7)
        if i in (1, 2):
            c.setDash(2, 2)
        c.line(x0, y, x1, y)
        c.setDash()
    return ys


def chr_page(d, ci, kind, setname, items, start):
    c = d.c
    header(d, ci, kind, setname, len(items))
    rows = math.ceil(len(items) / 2)
    pitch = min(58, (CONTENT_TOP - CONTENT_BOTTOM) / rows)
    for k, it in enumerate(items):
        col, r = divmod(k, rows)
        cx = M + col * (COLW + GAP)
        ymid = CONTENT_TOP - r * pitch - pitch / 2 - 4
        c.setFont(G.LATB, 9)
        c.setFillColorRGB(*INK)
        c.drawString(cx, ymid - 3, f"{start + k + 1}.")
        x = cx + 20
        fs = CFS
        while word_width(it.show, fs) > COLW - 20 - 100:
            fs -= 1
        x = draw_word(c, x, ymid - 7, it.show, fs)
        gx0 = x + 10
        gx1 = cx + COLW - 2
        assert gx1 - gx0 > 85, (it.word, gx1 - gx0)
        ys = pinyin_grid(c, gx0, gx1, ymid)
        if d.answers:
            c.setFillColorRGB(*RED)
            c.setFont(G.LAT, 12.5)
            c.drawString(gx0 + 3, ys[1] + 0.5, " ".join(it.pys))
    footer(d, f"{CHAPTERS[ci]['title']} 生词练习 · {SHORT[kind]} · {setname}组")


# ------------------------------------------------------------------ fill in the blank (type 4)
FB = 24
FPITCH = 33
FFS = 15
BANK_H = 40


def fill_page(d, ci, setname, items, start):
    c = d.c
    header(d, ci, "fill", setname, len(items))
    top = CONTENT_TOP
    bank_extra = 0
    if setname == "B":
        bank = [" ".join(it.pys) for it in items]
        rnd = random.Random(ci + 5)
        rnd.shuffle(bank)
        text = "    ·    ".join(bank)
        lines = wrap(text, W - 2 * M - 16, 9.5, G.LAT)
        h = 14 + 12 * len(lines) + 4
        c.setLineWidth(.7)
        c.setStrokeGray(.4)
        c.roundRect(M, top - h + 4, W - 2 * M, h, 4, stroke=1, fill=0)
        draw_mixed(c, M + 8, top - 8, "词库 Word Bank", 8.5, G.LATB, GREY)
        for i, ln in enumerate(lines):
            draw_mixed(c, M + 8, top - 21 - 12 * i, ln, 9.5, G.LAT, INK)
        top -= BANK_H + 12 * max(0, len(lines) - 2)
    n = len(items)
    avail = top - CONTENT_BOTTOM
    FPITCH = min(46, avail / n)
    FB = min(30, FPITCH - 10)
    FFS = FB * 0.64

    def need(fb):
        w = 0
        for it in items:
            for s_ in (it.sa, it.sb):
                nb = sum(len(x) for x in re.findall(r"\{([^}]*)\}", s_))
                txt = re.sub(r"\{[^}]*\}", "", s_)
                w = max(w, 22 + nb * fb + len(txt) * fb * 0.64 + 6)
        return w
    while need(FB) > W - 2 * M and FB > 22:
        FB -= 1
    FFS = FB * 0.64
    for k, it in enumerate(items):
        s = it.sa if setname == "A" else it.sb
        ybox = top - k * FPITCH - FB - 4
        c.setFont(G.LATB, 9)
        c.setFillColorRGB(*INK)
        c.drawString(M, ybox + FB / 2 - 3, f"{start + k + 1}.")
        x = M + 20
        pys = list(it.pys)
        pys = [p for p in pys if p != "…"]
        pi = 0
        for seg in re.split(r"(\{[^}]*\})", s):
            if not seg:
                continue
            if seg[0] == "{":
                for chh in seg[1:-1]:
                    if d.answers:
                        tian(c, x, ybox, FB, answers_char=chh)
                    else:
                        tian(c, x, ybox, FB)
                        if setname == "A":
                            c.setFont(G.LAT, 7.5)
                            c.setFillColorRGB(*GREY)
                            c.drawCentredString(x + FB / 2, ybox - 8, pys[pi])
                    pi += 1
                    x += FB
            else:
                c.setFillColorRGB(*INK)
                c.setFont(G.KAI, FFS)
                c.drawString(x + 1, ybox + FB * 0.27, seg)
                x += G.pdfmetrics.stringWidth(seg, G.KAI, FFS) + 2
        assert x < W - M, (s, x)
    footer(d, f"{CHAPTERS[ci]['title']} 生词练习 · {SHORT['fill']} · {setname}组")


# ------------------------------------------------------------------ front matter
def front_page(d, toc):
    c = d.c
    c.setFillColorRGB(*INK)
    c.setFont(G.SANSB, 26)
    c.drawString(M, H - 80, "生词练习册")
    c.setFont(G.LATB, 13)
    c.setFillColorRGB(*GREY)
    c.drawString(M, H - 100, "Vocabulary Practice Workbook  ·  Lessons 1–4")
    c.setStrokeGray(.2)
    c.setLineWidth(1)
    c.line(M, H - 112, W - M, H - 112)

    y = H - 140
    draw_mixed(c, M, y, "怎么用 How to use", 12, G.LATB, INK)
    y -= 20
    steps = [
        ("1", "先看「生词总表」和「记忆小窍门」，把不会的字多读几遍。",
         "Read the Master List and the Memory Aids first."),
        ("2", "挑一课，从练习1做到练习4。每种练习有 A 组和 B 组：A 组按课文顺序，B 组顺序打乱——先做 A，再做 B。",
         "Pick a lesson and work Exercise 1→4. Set A follows textbook order; Set B is shuffled — do A first, then B."),
        ("3", "做完后对答案，错的字在旁边多写三遍。做得越多，记得越牢！",
         "Check your work, rewrite every mistake 3 times. The more sets you do, the better you’ll remember."),
    ]
    for n, cn, en in steps:
        c.setFont(G.LATB, 10)
        c.drawString(M, y, n + ".")
        for ln in wrap(cn, W - 2 * M - 20, 10, G.LAT):
            draw_mixed(c, M + 16, y, ln, 10, G.LAT, INK)
            y -= 13.5
        for ln in wrap(en, W - 2 * M - 20, 8.5, G.LAT):
            draw_mixed(c, M + 16, y, ln, 8.5, G.LAT, GREY)
            y -= 11
        y -= 6

    y -= 6
    draw_mixed(c, M, y, "四种练习 The four exercises", 12, G.LATB, INK)
    y -= 18
    desc = [
        ("1", "半拼音听写", "给出拼音和半个字，把汉字补完整。Pinyin + half the character → write the whole character."),
        ("2", "拼音听写", "只给拼音，写汉字。Pinyin only → write the characters."),
        ("3", "词语听写", "给出汉字，写拼音和声调。Characters → write the pinyin with tones."),
        ("4", "填空", "在句子里填入缺的词语。Fill the missing word into a sentence."),
    ]
    for no, cn, en in desc:
        draw_mixed(c, M, y, f"练习{no}  {cn}", 10, G.LATB, INK)
        draw_mixed(c, M + 130, y, en, 8.5, G.LAT, GREY)
        y -= 15

    y -= 14
    draw_mixed(c, M, y, "目录 Contents  (page numbers)", 12, G.LATB, INK)
    y -= 8
    colx = [M, M + 120, M + 245, M + 370, M + 455]
    heads = ["", "练习1 半拼音", "练习2 拼音听写", "练习3 写拼音", "练习4 填空"]
    rowh = 36
    y -= 16
    c.setLineWidth(.6)
    c.setStrokeGray(.3)
    c.line(M, y + 12, W - M, y + 12)
    for x, h in zip(colx, heads):
        draw_mixed(c, x, y, h, 9.5, G.LATB, INK)
    c.line(M, y - 6, W - M, y - 6)
    y -= 6 + 18
    for ci in range(4):
        draw_mixed(c, colx[0], y, CHAPTERS[ci]["title"], 11, G.LATB, INK)
        for ti, kind in enumerate(("semi", "py", "chr", "fill")):
            ya = y
            for st in ("A", "B"):
                pg = toc[(ci, kind, st)]
                lab = f"{st}: p.{pg[0]}" + (f"–{pg[-1]}" if len(pg) > 1 else "")
                c.setLineWidth(.6)
                c.setStrokeGray(.35)
                c.rect(colx[ti + 1], ya - 1, 8, 8)
                draw_mixed(c, colx[ti + 1] + 13, ya, lab, 9, G.LAT, INK)
                ya -= 12
        y -= rowh
        c.setStrokeGray(.8)
        c.line(M, y + 22, W - M, y + 22)

    y -= 4
    draw_mixed(c, M, y,
               "Tick the box when you finish a set.   Memory aids: pages {}–{}  ·  Master list: page {}".format(toc["mem"][0], toc["mem"][-1], toc["master"]),
               9, G.LAT, GREY)
    footer(d, "生词练习册 Vocabulary Practice Workbook")


def master_page(d):
    c = d.c
    draw_mixed(c, M, H - 50, "生词总表", 18, G.SANSB, INK)
    draw_mixed(c, M + 90, H - 50, "Vocabulary Master List — read it out loud, then cover and write!", 9, G.LAT, GREY)
    c.setStrokeGray(.2)
    c.setLineWidth(1)
    c.line(M, H - 58, W - M, H - 58)
    ncol = 4
    cw = (W - 2 * M) / ncol
    y = H - 76
    for ci, ch in enumerate(CHAPTERS):
        draw_mixed(c, M, y, ch["title"], 12, G.SANSB, INK)
        c.setLineWidth(.5)
        c.setStrokeGray(.6)
        c.line(M + 52, y + 3, W - M, y + 3)
        y -= 20
        rows = math.ceil(len(ITEMS[ci]) / ncol)
        for k, it in enumerate(ITEMS[ci]):
            col, r = divmod(k, rows)
            x = M + col * cw
            yy = y - r * 23
            draw_word(c, x, yy, it.show if it.word != "一米八二" else "1.82米(一米八二)", 13)
            c.setFont(G.LAT, 7.5)
            c.setFillColorRGB(*GREY)
            c.drawString(x, yy - 9, " ".join(it.pys))
        y -= rows * 23 + 8
    assert y > 40, ("master overflow", y)
    footer(d, "生词总表 Vocabulary Master List")


CARD_W = (W - 2 * M) / 3
CARD_H = 66


def card(c, x, ytop, ent):
    ch, py, tag, cn, en = ent
    c.setLineWidth(.5)
    c.setStrokeGray(.65)
    c.roundRect(x + 2, ytop - CARD_H + 3, CARD_W - 6, CARD_H - 3, 3, stroke=1, fill=0)
    # glyph(s)
    n = len(ch)
    fs = 30 if n == 1 else 21
    gw = n * fs
    gx = x + 8
    c.setFillColorRGB(*INK)
    c.setFont(G.KAI, fs)
    c.drawString(gx, ytop - 34, ch)
    pys = " ".join(G.pinyin_list(py))
    c.setFont(G.LAT, 8)
    c.setFillColorRGB(*GREY)
    c.drawCentredString(gx + gw / 2, ytop - 49, pys)
    # tag
    tx = x + 8 + 44
    tx = x + 56
    tcol = (0.15, 0.15, 0.15)
    c.setFillColorRGB(*tcol)
    c.roundRect(tx, ytop - 14, 13, 11, 2, stroke=0, fill=1)
    c.setFillColorRGB(1, 1, 1)
    c.setFont(G.SANSB, 7.5)
    c.drawCentredString(tx + 6.5, ytop - 11.8, tag)
    wtext = CARD_W - 56 - 10
    ty = ytop - 12
    lines = wrap(cn, wtext - 17, 9, G.SANS)
    for i, ln in enumerate(lines):
        draw_mixed(c, tx + 17 if i == 0 else tx, ty - i * 11, ln, 9, G.SANS, INK)
    ty -= 11 * len(lines) + 2
    for ln in wrap(en, wtext, 7, G.LAT):
        draw_mixed(c, tx, ty - 6, ln, 7, G.LAT, GREY)
        ty -= 8.4


def memory_page(d, pg):
    """pg 0: lessons 1-2; pg 1: lessons 3-4 (+ reading tips)."""
    c = d.c
    for a, b in [((0, 1), (2, 3))[pg]]:
        draw_mixed(c, M, H - 50, "记忆小窍门", 18, G.SANSB, INK)
        draw_mixed(c, M + 100, H - 50, "Memory Aids — 联想 (记) and 谜语 (谜): riddles & word pictures for hard characters", 8.5, G.LAT, GREY)
        c.setStrokeGray(.2)
        c.setLineWidth(1)
        c.line(M, H - 58, W - M, H - 58)
        y = H - 78
        for ci in (a, b):
            title, ents = MNEMONICS[ci]
            draw_mixed(c, M, y, title, 12, G.SANSB, INK)
            c.setLineWidth(.5)
            c.setStrokeGray(.6)
            c.line(M + 52, y + 3, W - M, y + 3)
            y -= 12
            for k, ent in enumerate(ents):
                col, r = k % 3, k // 3
                card(c, M + col * CARD_W, y - r * CARD_H, ent)
            y -= math.ceil(len(ents) / 3) * CARD_H + 14
        if pg == 1:
            draw_mixed(c, M, y, "读音提醒 Watch the reading!", 12, G.SANSB, INK)
            c.setLineWidth(.5)
            c.setStrokeGray(.6)
            c.line(M + 150, y + 3, W - M, y + 3)
            y -= 16
            half = math.ceil(len(TIPS) / 2)
            for k, t in enumerate(TIPS):
                col, r = divmod(k, half)
                draw_mixed(c, M + col * (W - 2 * M) / 2, y - r * 13, "• " + t, 9, G.SANS, INK)
            assert y - half * 13 > 38, ("tips overflow", y)
        assert y > 38, ("memory page overflow", y)
        footer(d, "记忆小窍门 Memory Aids")


# ------------------------------------------------------------------ layout planner
def plan():
    """Return list of page specs and a TOC mapping."""
    pages = []          # (callable, args)
    toc = {}
    # front pages: 1 front, 1 master, 2 memory
    pages += [("front",), ("master",), ("mem", 0), ("mem", 1)]
    toc["master"] = 2
    toc["mem"] = [3, 4]
    for ci in range(4):
        for kind in ("semi", "py", "chr", "fill"):
            for st in ("A", "B"):
                items = order(ci, kind, st)
                if kind in ("semi", "py", "chr"):
                    cap = 28
                else:
                    cap = int((CONTENT_TOP - CONTENT_BOTTOM - (BANK_H + 12 if st == "B" else 0)) // FPITCH)
                chunks = balanced(len(items), cap)
                nums = []
                for (i0, i1) in chunks:
                    pages.append(("ex", ci, kind, st, items[i0:i1], i0))
                    nums.append(len(pages))
                toc[(ci, kind, st)] = nums
    return pages, toc


def render(path, answers):
    pages, toc = plan()
    total = len(pages)
    d = Doc(path, answers, total)
    for idx, spec in enumerate(pages, start=1):
        if answers and idx <= 4:      # key omits front matter but keeps worksheet page numbers
            continue
        d.new_page(idx)
        if spec[0] == "front":
            front_page(d, toc)
        elif spec[0] == "master":
            master_page(d)
        elif spec[0] == "mem":
            memory_page(d, spec[1])
        else:
            _, ci, kind, st, items, start = spec
            if kind in ("semi", "py"):
                boxes_page(d, ci, kind, st, items, start)
            elif kind == "chr":
                chr_page(d, ci, kind, st, items, start)
            else:
                fill_page(d, ci, st, items, start)
    d.finish()
    return total


def render_type(path, answers, kind):
    """One PDF holding only exercise `kind` for all four lessons (A and B sets)."""
    pages, _ = plan()
    specs = [p for p in pages if p[0] == "ex" and p[2] == kind]
    d = Doc(path, answers, len(specs))
    for n, spec in enumerate(specs, start=1):
        d.new_page(n)
        _, ci, k, st, items, start = spec
        if k in ("semi", "py"):
            boxes_page(d, ci, k, st, items, start)
        elif k == "chr":
            chr_page(d, ci, k, st, items, start)
        else:
            fill_page(d, ci, st, items, start)
    d.finish()
    return len(specs)


if __name__ == "__main__":
    out = sys.argv[1]
    key = sys.argv[2]
    if out == "--by-type":
        names = {"semi": "1_semi-pinyin", "py": "2_pinyin-to-character",
                 "chr": "3_character-to-pinyin", "fill": "4_fill-in-the-blank"}
        for kind, nm in names.items():
            n = render_type(f"{key}/{nm}.pdf", False, kind)
            render_type(f"{key}/{nm}_ANSWER-KEY.pdf", True, kind)
            print(nm, n, "pages")
    else:
        n = render(out, False)
        render(key, True)
        print("pages:", n)
