// /innovation: "Latest AI News". New reporting first, followed by the original archive.
// Refreshed October 28, 2026. Headlines, bylines and dates checked against the linked reporting.
// `authors`: string | [{ text, href? }]. Two original author links pointed at the wrong person
// (marked `suspect: true`); they are rendered unlinked until the client confirms — see docs/TBD_REGISTER.md.

export const news = {
  title: 'Latest AI News',
  labels: { source: 'Source', authors: 'Author(s)', date: 'Publication Date' },
  items: [
    {
      image: '/media/news/google-earnings-2026-10-28.webp',
      source: 'The Associated Press',
      authors: [{ text: 'Kaitlyn Huamani' }],
      date: 'Oct 28th 2026',
      title: 'Google misses Wall Street expectations, Alphabet stock sinks in early after-hours trading',
      href: 'https://apnews.com/article/1acf6aff00d4dc084c5243d613307388',
    },
    {
      image: '/media/news/ai-cybersecurity-2026-10-28.webp',
      source: 'Axios',
      authors: [{ text: 'Sam Sabin', href: 'https://www.axios.com/authors/ssabin' }],
      date: 'Oct 28th 2026',
      title: "AI's cyber scare delivers a Y2K lesson",
      href: 'https://www.axios.com/2026/10/28/cybersecurity-black-october-ai-hacks',
    },
    {
      image: '/media/news/openai-google-chips-2026-10-28.webp',
      source: 'Reuters',
      authors: [{ text: 'Carlos Méndez' }],
      date: 'Oct 28th 2026',
      title: "OpenAI plans to buy Google's AI chips, The Information reports",
      href: 'https://www.aol.com/articles/openai-plans-buy-googles-ai-012329000.html',
    },
    {
      image: '/media/news/anthropic-nonprofits-2026-10-26.webp',
      source: 'The Associated Press',
      authors: [{ text: 'Glenn Gamboa' }],
      date: 'Oct 26th 2026',
      title: 'Anthropic expands AI support for nonprofits as it files to sell shares to the public',
      href: 'https://apnews.com/article/e4db0d624495c8224187b3227939dd27',
    },
    {
      image: '/media/news/1.webp',
      source: 'The New York Times',
      authors: [{ text: 'Agnes Chang, Vivian Wang, Jiwoong Hong, Aaron Byrd and Qilai Shen' }],
      date: 'Aug 21st 2026',
      title: 'A.I. Is Everywhere in China. See For Yourself.',
      href: 'https://www.nytimes.com/interactive/2026/08/21/world/asia/china-ai-life.html?searchResultPosition=3',
    },
    {
      image: '/media/news/2.webp',
      source: 'CBC News',
      authors: [{ text: 'Kayla McLean', href: 'https://www.cbc.ca/author/kayla-mclean-1.7635421' }],
      date: 'Aug 25th 2026',
      title: 'Australia bans fully AI-made songs from charts after Madonna cover goes viral',
      href: 'https://www.cbc.ca/news/entertainment/australia-music-chart-ban-ai-9.7319875',
    },
    {
      image: '/media/news/3.webp',
      source: 'CBC News',
      authors: [{ text: 'Jeff Lagerquist', href: 'https://www.cbc.ca/author/jeff-lagerquist-9.14857' }],
      date: 'Aug 25th 2026',
      title: "Trump's tariffs risk higher prices for AI, video games, cellphones: experts",
      href: 'https://www.cbc.ca/news/business/trump-tariff-ai-9.7318970',
    },
    {
      image: '/media/news/4.webp',
      source: 'CBC News',
      authors: [{ text: 'Alexandra Mae Jones', href: 'https://www.cbc.ca/news/author/alexandra-mae-jones-1.7305275' }],
      date: 'Aug 23rd 2026',
      title: 'Why are there suddenly so many data centres planned in Canada? Your questions answered',
      href: 'https://www.cbc.ca/news/climate/data-centres-ask-faq-9.7316098',
    },
    {
      image: '/media/news/5.webp',
      source: 'CBC News',
      authors: [{ text: 'Yuan Wang', href: 'https://www.cbc.ca/author/yuan-wang-9.14373' }],
      date: 'Aug 25th 2026',
      title: 'Backlash against AI-generated graphics grows in N.S.',
      href: 'https://www.cbc.ca/news/canada/nova-scotia/backlash-against-ai-generated-graphics-grows-in-n-s-9.7308798',
    },
    {
      image: '/media/news/6.webp',
      source: 'The New York Times',
      // original href: https://www.cbc.ca/author/yuan-wang-9.14373 (a CBC page for a different author)
      authors: [{ text: 'Sri Muppidi', suspect: true }],
      date: 'Aug 25th 2026',
      title: 'This A.I. Start-Up Aims to Reverse the Backlash Against Data Centers',
      href: 'https://www.nytimes.com/2026/08/25/business/dealbook/emerald-ai-start-up-data-center-backlash.html?searchResultPosition=2',
    },
    {
      image: '/media/news/7.webp',
      source: 'The New York Times',
      authors: [{ text: 'Cade Metz' }],
      date: 'Aug 25th 2026',
      title: 'By Opening a Model, a Chinese A.I. Lab May Test the World’s Cybersecurity',
      href: 'https://www.nytimes.com/2026/08/25/science/cybersecurity-zai-open-weights.html?searchResultPosition=4',
    },
    {
      image: '/media/news/8.webp',
      source: 'Global News',
      // original href: https://www.cbc.ca/author/kayla-mclean-1.7635421 (a CBC page for a different author)
      authors: [{ text: 'Staff', suspect: true }],
      date: 'Aug 20th 2026',
      title: 'Alberta minister hosts second AI data centre town hall in Sturgeon County',
      href: 'https://globalnews.ca/news/12028166/ai-data-centre-town-hall-sturgeon-county/',
    },
    {
      image: '/media/news/9.webp',
      source: 'Global News',
      authors: [{ text: "Aaron D'Andrea", href: 'https://globalnews.ca/author/aaron-dandrea/' }],
      date: 'Aug 21st 2026',
      title: 'Montreal youth accused of using AI to plot school attack',
      href: 'https://globalnews.ca/news/12030244/rcmp-montreal-youth-arrest-terrorism-allegations/',
    },
  ],
};
