-- Add the October 28, 2026 news refresh to an existing articles table.
-- New negative positions place these stories before the original seeded archive.
-- Existing articles and admin edits are preserved. Safe to run more than once.
insert into public.articles (id, position, source, author, author_href, published_on, title, href, image_url) values
  ('f1601c44-cc50-5359-a3fb-76194e641bdc', -4, 'The Associated Press', 'Kaitlyn Huamani', null, '2026-10-28', 'Google misses Wall Street expectations, Alphabet stock sinks in early after-hours trading', 'https://apnews.com/article/1acf6aff00d4dc084c5243d613307388', '/media/news/google-earnings-2026-10-28.webp'),
  ('11c33756-4821-5a58-ab2b-2208bfb0a34b', -3, 'Axios', 'Sam Sabin', 'https://www.axios.com/authors/ssabin', '2026-10-28', 'AI''s cyber scare delivers a Y2K lesson', 'https://www.axios.com/2026/10/28/cybersecurity-black-october-ai-hacks', '/media/news/ai-cybersecurity-2026-10-28.webp'),
  ('a276776e-128f-5d39-adfc-8c17a8b9b025', -2, 'Reuters', 'Carlos Méndez', null, '2026-10-28', 'OpenAI plans to buy Google''s AI chips, The Information reports', 'https://www.aol.com/articles/openai-plans-buy-googles-ai-012329000.html', '/media/news/openai-google-chips-2026-10-28.webp'),
  ('de11a8c5-0efa-5e5d-a6a9-04891e616aab', -1, 'The Associated Press', 'Glenn Gamboa', null, '2026-10-26', 'Anthropic expands AI support for nonprofits as it files to sell shares to the public', 'https://apnews.com/article/e4db0d624495c8224187b3227939dd27', '/media/news/anthropic-nonprofits-2026-10-26.webp')
on conflict (id) do nothing;
