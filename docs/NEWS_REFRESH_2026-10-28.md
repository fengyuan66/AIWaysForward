# AI news refresh: October 28, 2026

Four recent stories were checked against reporting available by October 28, 2026. The site keeps its existing linked-headline format, source and author labels, ordinal dates, full-colour thumbnails, lead story, and homepage selection of the first three articles. The nine original articles remain below the new entries.

| Publication date | Source and author | Reporting |
| --- | --- | --- |
| Oct 28th 2026 | The Associated Press, Kaitlyn Huamani | [Google's quarterly results](https://apnews.com/article/1acf6aff00d4dc084c5243d613307388). Headline and byline also checked in [AP's syndicated report at Chron](https://www.chron.com/business/article/google-misses-revenue-expectations-alphabet-22499369.php). |
| Oct 28th 2026 | Axios, Sam Sabin | [AI's cyber scare delivers a Y2K lesson](https://www.axios.com/2026/10/28/cybersecurity-black-october-ai-hacks). |
| Oct 28th 2026 | Reuters, Carlos Méndez | [OpenAI's reported plan to buy Google's AI chips](https://www.aol.com/articles/openai-plans-buy-googles-ai-012329000.html). Reuters report syndicated by AOL, with an October 28 UTC timestamp and an October 27 dateline. The headline preserves attribution to The Information because the purchase is reported, rather than confirmed. |
| Oct 26th 2026 | The Associated Press, Glenn Gamboa | [Anthropic's nonprofit support](https://apnews.com/article/e4db0d624495c8224187b3227939dd27). Headline and byline also checked in [AP's syndicated report at SeattlePI](https://www.seattlepi.com/business/anthropic-expands-ai-support-for-nonprofits-as-it-a22495084). |

## Thumbnail provenance

The raw files are stored in `source-assets/news/`. `npm run media -- news/` generates the local WebP thumbnails, capped at 660 pixels wide for the existing 330-pixel lead image slot on high-density displays. The layout retains its established crop and rounded corners.

- `google-earnings-2026-10-28.jpg`: Google sign photograph, Jeff Chiu/AP, from the syndicated AP report's social image.
- `ai-cybersecurity-2026-10-28.jpg`: illustration by Sarah Grillo/Axios, stock from Getty Images, linked by the Axios report.
- `openai-google-chips-2026-10-28.jpg`: social image from the Reuters report syndicated by AOL.
- `anthropic-nonprofits-2026-10-26.jpg`: Anthropic website photograph, Patrick Sison/AP, from the syndicated AP report's social image.

## Database-backed sites

The bundled content updates both `/innovation` and the homepage. When Supabase is connected, database articles take precedence. Apply `supabase/migrations/20261028_ai_news.sql` to add these four stories ahead of the original seeded archive without replacing existing articles. The migration has been prepared locally and has not been applied to a remote database. `supabase/seed.sql` also includes the new articles for fresh setups.

## Verification

- Production build passed.
- News component, homepage rendering logic, CSS, and design tokens were preserved.
- New entries retain all required metadata, use distinct HTTPS links and local thumbnails, and contain no em dashes.
- Browser access was unavailable because control of Microsoft Edge was not approved. Visual browser verification remains outstanding.
