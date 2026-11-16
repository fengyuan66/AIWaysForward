-- Add four more November 16, 2026 stories to the articles table.
-- Plain values insert with fixed positions: the November 9-16 stories already sit at -8..-5, so these
-- take -12..-9 and lead the page. Existing articles and admin edits are preserved. Safe to run more than once.
insert into public.articles (id, position, source, author, author_href, published_on, title, href, image_url) values
  ('0b5fe7dc-e536-5b45-aa9f-07b2fb7d9f45', -12, 'TechCrunch', 'Rebecca Bellan', null, '2026-11-16', 'Sam Altman on Nvidia without Jensen Huang: the industry will be ''fine''', 'https://techcrunch.com/2026/11/16/sam-altman-on-nvidia-without-jensen-huang-the-industry-will-be-fine/', '/media/news/altman-nvidia-2026-11-16.webp'),
  ('81e420a7-570a-50a0-a57d-0297a6b6ba99', -11, 'CNBC', 'Ashley Capoot', null, '2026-11-16', 'OpenAI inks agreements with four independent evaluators to boost company''s safety work', 'https://www.cnbc.com/2026/11/16/openai-independent-ai-safety-evaluators.html', '/media/news/openai-evaluators-2026-11-16.webp'),
  ('ebcb97b0-e30f-5d5b-a459-0b6dd4b856ba', -10, 'CNBC', 'Jeff Cox', null, '2026-11-16', 'Fed Chairman Kevin Warsh stresses importance of AI to economy, but says it could ''disappoint''', 'https://www.cnbc.com/2026/11/16/fed-ai-task-force-kevin-warsh.html', '/media/news/fed-warsh-ai-2026-11-16.webp'),
  ('b987f5a2-c424-59d5-a154-67a7073765d5', -9, 'CNBC', 'Justin Papp', null, '2026-11-16', 'Cantwell urges Lutnick to stop AI chip sales to China ahead of Xi meeting', 'https://www.cnbc.com/2026/11/16/cantwell-lutnick-ai-chip-china.html', '/media/news/cantwell-ai-chips-2026-11-16.webp')
on conflict (id) do nothing;
