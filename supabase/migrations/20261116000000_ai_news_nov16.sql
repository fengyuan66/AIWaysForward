-- Add the November 16, 2026 news refresh to the articles table.
-- Positions are taken relative to the current lowest position so these stories sit ahead of everything
-- already published, and admin edits and deletions are preserved. Safe to run more than once (ids are fixed).
insert into public.articles (id, position, source, author, author_href, published_on, title, href, image_url)
select v.id::uuid, (select coalesce(min(position), 1) from public.articles) - v.n, v.source, v.author, v.author_href, v.published_on::date, v.title, v.href, v.image_url
from (values
  ('adedf930-9a80-5cf0-a422-3ec9de494277', 4, 'The National', 'Kyle Fitzgerald and Cody Combs', null, '2026-11-16', 'Nvidia earnings and Anthropic IPO lead crucial week for AI bulls', 'https://thenationalnews.com/business/markets/2026/11/16/nvidia-earnings-anthropic-ipo', '/media/news/nvidia-anthropic-ipo-2026-11-16.webp'),
  ('88d77a52-ad5e-57e4-ad5b-356ac896d0e5', 3, 'CNBC', 'Ashley Capoot', null, '2026-11-13', 'OpenAI launches ChatGPT Wallet, allowing its ''dots'' AI agents to make purchases for users', 'https://www.cnbc.com/2026/11/13/openai-chatgpt-wallet-dot-purchases.html', '/media/news/chatgpt-wallet-2026-11-13.webp'),
  ('8c3c1af9-2e0b-527d-a36a-a5a3cd6b2fe7', 2, 'CBC News', 'Jeff Lagerquist', 'https://www.cbc.ca/author/jeff-lagerquist-9.14857', '2026-11-12', 'Anthropic is aiming for a $1.4-trillion valuation. Can the AI boom support it?', 'https://www.cbc.ca/news/business/anthropic-ipo-9.7418028', '/media/news/anthropic-valuation-2026-11-12.webp'),
  ('2b128ff0-9548-5e1c-abfe-38356b51cd6a', 1, 'TechCrunch', 'Russell Brandom', null, '2026-11-09', 'Anthropic releases new Mythos and Fable models amid RSI concerns', 'https://techcrunch.com/2026/11/09/anthropic-releases-new-mythos-and-fable-models-amid-rsi-concerns/', '/media/news/anthropic-fable-mythos-2026-11-09.webp')
) as v(id, n, source, author, author_href, published_on, title, href, image_url)
on conflict (id) do nothing;
