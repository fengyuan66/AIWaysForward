# Content inventory — AI-Ways Forward

> **Generated** by `npm run inventory` from `src/content/*.js`. Do not edit by hand — edit the content modules and regenerate.
> Source: https://www.ai-waysforward.com (Wix), extracted October 2026. Text is verbatim.
> Sections that exist only on the original site (and are *not* in the content modules) live in the hand-written appendices at the bottom, which the script appends from `docs/_inventory-appendix.md`.

## Site map

| Original URL (kept as the route) | Original `<title>` | Page | Content module |
| --- | --- | --- | --- |
| `/` | Home \| Mysite | Home | site.js, services.js, news.js (teasers) |
| `/about-7` | About Us \| Mysite | About Us | about.js |
| `/services` | Services \| Mysite | Services | services.js |
| `/education` | Education \| Mysite | Classes (Education) | education.js |
| `/llms-ai-models` | LLMs & AI Models \| Mysite | Class page | education.js → classPages |
| `/ai-tools-applications` | AI Tools & Applications \| Mysite | Class page | education.js → classPages |
| `/practical-ai-skills` | Practical AI Skills \| Mysite | Class page | education.js → classPages |
| `/career-awareness` | Career Awareness \| Mysite | Inspirational Speakers (upcoming) | career.js → career |
| `/past-speakers` | — (new page; the original had no equivalent) | Past Speakers (timeline) | career.js → pastEvents |
| `/innovation` | AI News \| Mysite | Latest AI News | news.js |
| `/faqs` | FAQs \| Mysite | FAQs | faq-contact.js |
| `/contact-8` | Contact Us \| Mysite | Contact | faq-contact.js, site.js |

Wix `sitemap.xml` lists exactly these 11 pages. The brand name in every `<title>` was the Wix default "Mysite"; the redesign uses "<Page> | AI-Ways Forward".

## Global elements (every page)

**Navigation** (order and labels as on the original):

- Home → `/`
- About Us → `/about-7`
- Services → `/services`
- Career Awareness → `/career-awareness`
- FAQs → `/faqs`
- Contact Us → `/contact-8`

Also in the original header: a Wix "member login" person icon (no label). → rendered as the **Log In** pill. It opens the admin sign-in (see `docs/ADMIN.md`); until a Supabase project is connected it stays inert and carries a TBD chip.

**Footer / contact block**

- Heading: Contact Us
- Phone: 672-515-5775
- Email: director@ai-waysforward.com (`mailto:director@ai-waysforward.com`)
- Discord: discord.gg/33CsDt3K (`http://discord.gg/33CsDt3K`)
- YouTube icon link → https://www.youtube.com/@AI-waysForward
- Copyright: © 2026 by J. Yang.

## Home — `/`

**Heading:** Learn & Use

> AI-Ways Forward provides a chance for young people to acknowledge, adapt to, and prepare for an Artificial Intelligence dominant future.

Original had one full-width hero image (below) with the text overlaid; nothing else on the page.

Design-handoff additions (from `design_handoff_homepage_2a`, not original copy): CTA labels "Join our Discord!" and "Watch our YouTube", the "AI-Ways Forward for…" pill (Education · Career Awareness · AI News), and the Services/Latest AI News teasers that reuse text from the pages below.

## About Us — `/about-7`

**Heading:** About Us

> AI-Ways Forward is a youth-focused foundation dedicated to helping young people understand, adapt to, and prepare for a future shaped by artificial intelligence. As AI continues to develop and become part of everyday work, students are entering a world where the skills, responsibilities, and opportunities associated with many careers may look very different from today. AI-Ways Forward aims to give young people the knowledge and experiences they need to understand these changes and prepare for them.
>
> We focus on three main areas: AI education, career awareness, and innovation. Through educational classes and workshops, AI-Ways Forward introduces students to modern AI technologies and teaches them how to use these tools effectively in their education, future careers, and everyday problem-solving. Students will learn about different AI systems and their strengths and limitations, explore tools for coding, research, productivity, design, automation, and content creation, and develop practical skills such as prompt engineering and responsible AI use. The goal is not simply to teach students how AI works, but to show them how AI can actually be used.
>
> We also connect students with professionals who are experiencing the impact of AI in their careers firsthand. Through guest speakers, industry talks, and discussions, students can hear from people working in fields such as medicine, healthcare, software engineering, law, architecture, education, design, accounting, and business. These conversations will give students a realistic understanding of how AI is changing different industries, what tasks are being transformed, what skills are becoming more important, and how professionals are adapting to new technology. By connecting AI education with real careers, the foundation aims to help students make more informed decisions about their own futures.
>
> Beyond learning and career awareness, AI-Ways Forward encourages young people to become creators. The foundation will provide opportunities for students to take what they have learned and turn their ideas into real projects through AI competitions, hackathons, student showcases, and other innovation-focused events. Students will be encouraged to identify problems, experiment with AI, and develop their own AI-driven tools and solutions. The goal is to move students from simply using technology created by others to becoming people who can use technology to create something of their own.
>
> We are primarily focused on high school students in Grades 8–12, providing opportunities for young people to explore AI before they enter university, college, trades, or the workforce. AI is not limited to computer science, and the foundation aims to make AI education relevant to students with a wide range of interests and career goals. Whether a student is interested in medicine, programming, business, law, design, engineering, or another field, AI-Ways Forward aims to help them understand how artificial intelligence may affect their future.
>
> We build opportunities within schools and local communities, with the goal of developing partnerships with educators, universities, professionals, businesses, technology organizations, and community groups. As we grow, these opportunities will expand into larger programs such as mentorship, internships, summer programs, scholarships, research projects, and student conferences.
>
> At the center of AI-Ways Forward is a simple idea: young people should not be left to figure out the impact of artificial intelligence on their own. They should have opportunities to learn about the technology, hear directly from people experiencing its effects, and experiment with it themselves. We aim to create those opportunities and help the next generation move forward with the knowledge, adaptability, and creativity needed for an AI-driven future.

**Closing line:** Understand AI. Adapt to AI. Build with AI.

### Staff

**Founder: Jason Yang**  
Photo: `/media/about/jason-yang.webp`

> Jason established this organization driven by his strong belief in the potential of artificial intelligence and a desire to share that enthusiasm with others. He noticed the prevalent fear and panic surrounding AI and wanted to transform this anxiety into something beneficial for students. By helping individuals understand and utilize AI in their everyday lives, he hopes to unlock new opportunities while fostering a calm and positive approach. Jason invites everyone to join him on this journey as they explore the transformative power of AI together.

**Cofounder: Harry Liu**  
Photo: `/media/about/harry-liu.webp`

> As a leader and active participant in local youth tech communities, Harry Liu believes that knowledge is essential to cutting through exaggerated and sensationalized narratives around artificial intelligence. Through AI-Ways Forward, he hopes to foster a more grounded, pragmatic understanding of AI among youth. Harry is optimistic about AI’s potential to improve productivity and create new opportunities, while remaining mindful of its nuances and limitations. He sees the program not only as a way to inform his peers, but also as an opportunity to learn alongside them.

## Services — `/services`

**Heading:** Services

### Education

> Welcome to our AI Education program! Here, students will learn how to effectively understand and utilize modern AI tools, focusing on their strengths, weaknesses, and ideal use cases. We'll explore leading AI systems like ChatGPT, Gemini, and others, alongside essential tools for coding, research, and design. Our curriculum emphasizes practical applications, teaching students to choose the right AI tool for various tasks, evaluate AI-generated information, and integrate multiple tools to tackle complex challenges. Join us in discovering best AI solutions tailored to your needs!

Link: "More" → `/education`

Homepage teaser (from handoff 1a, abridged): Students learn how to effectively understand and utilize modern AI tools, focusing on their strengths, weaknesses, and ideal use cases.

### Career Awareness

> Enhance career awareness by hosting speakers from a range of professions. This includes a doctor, lawyer, software engineer, architect, teacher, graphic designer, accountant, and business owner, who will demonstrate how they incorporate artificial intelligence into their roles. This initiative aims to inspire and educate individuals on the various ways AI can be applied in different careers.

Link: "More" → `/career-awareness`

Homepage teaser (from handoff 1a, abridged): Speakers from a range of professions demonstrate how they incorporate artificial intelligence into their roles.

### AI News

> Stay informed about the latest developments in artificial intelligence. We bring together interesting and important AI news from a variety of sources, covering new technologies, major updates, research, and real-world applications. Our goal is to make it easier for young people to discover, understand, and keep up with the rapidly changing world of AI.

Link: "More" → `/innovation`

Homepage teaser (from handoff 1a, abridged): Interesting and important AI news from a variety of sources, covering new technologies, major updates, research, and real-world applications.

## Education — `/education`

**Heading:** Classes

- **LLMs & AI Models** — button "Get Started" → `/llms-ai-models` · image `/media/education/llms.webp` (original alt: "Neurotechnology")
- **AI Tools & Applications** — button "Get Started" → `/ai-tools-applications` · image `/media/education/tools.webp` (original alt: "Made-by-wix_6_edited.jpg")
- **Practical AI Skills** — button "Get Started" → `/practical-ai-skills` · image `/media/education/skills.webp` (original alt: "Digital Brain Interface")

> AI-Ways Forward’s Education program is designed to give young people practical knowledge and experience with artificial intelligence. As AI tools continue to develop rapidly, students are often exposed to many different platforms without knowing which ones are useful for a particular task, how reliable their results are, or how to use them effectively. The program aims to help students move beyond simply using AI and develop a deeper understanding of how different AI technologies can be applied.
>
> Students will be introduced to a variety of AI systems, including large language models such as ChatGPT, Gemini, Grok, Claude, DeepSeek, Qwen, and Llama. They will learn about the strengths and weaknesses of different models and understand that there is no single AI system that is best for everything. Instead, students will learn how to choose the right tool depending on what they are trying to accomplish, whether that involves research, writing, coding, analyzing information, creating content, or completing more complex tasks.
>
> The program will also introduce students to practical AI tools used for coding, research, productivity, design, automation, image generation, and video creation. Students may explore tools such as Cursor, GitHub Copilot, NotebookLM, Perplexity, Canva AI, Midjourney, Sora, Runway, Zapier, Make, and other emerging technologies. Since these tools change quickly, the focus will not be on memorizing individual platforms, but on developing the ability to understand, evaluate, and adapt to new AI technologies as they emerge.
>
> A major part of the Education program will also focus on prompt engineering and effective communication with AI. Students will learn how to give AI clear instructions, provide useful context, refine responses, and work through complex tasks with AI. They will also learn how to evaluate AI-generated information rather than automatically accepting it, recognizing that AI systems can produce inaccurate, incomplete, or misleading results.
>
> The program is not intended to focus heavily on the technical science behind how AI models are built. Instead, AI-Ways Forward focuses on how people can actually use AI in school, work, and everyday problem-solving. Students will have opportunities to apply what they learn through hands-on activities, demonstrations, and projects rather than only learning through presentations.
>
> Ultimately, the goal of the Education program is to give students a strong and practical foundation in AI. Rather than becoming dependent on one particular tool, students will develop the ability to understand different technologies, recognize their strengths and limitations, choose the appropriate tool for a task, and continue learning as AI develops.

## Class sub-pages

### `/llms-ai-models` — LLMs & AI Models

> Understand the strengths, weaknesses, and best uses of today's leading AI models.

Section heading: **What is LLM** (original: nothing beneath it)

### `/ai-tools-applications` — AI Tools & Applications

> Explore the tools professionals use for coding, research, productivity, automation, design, and media.

6 unedited Wix template blocks — see Appendix A (not migrated as copy; TBD slots).

### `/practical-ai-skills` — Practical AI Skills

> Learn how to communicate with AI, build effective workflows, and get better results.

6 unedited Wix template blocks — see Appendix A (not migrated as copy; TBD slots).

## Career Awareness — `/career-awareness`

**Heading:** Inspirational Speakers

The original page opened with Christopher Dede's talk (now a past event — see the next section), followed by two "To Be Announced" slots. A live "latest event" is entered by an admin and shown above the slots (see `docs/ADMIN.md`).

### To Be Announced
Photo: `/media/career/speaker-tba.webp` (original alt: "image.png")

### To Be Announced
Photo: `/media/career/speaker-tba.webp` (original alt: "image.png")

> Artificial intelligence is changing careers in different ways, and students need to understand what those changes actually look like in the real world. AI-Ways Forward’s Career Awareness program gives young people the opportunity to hear directly from professionals who are experiencing these changes within their own industries. Through guest speakers, industry talks, interviews, and panel discussions, students will be introduced to a variety of career fields and learn how AI is being used in each one.
>
> Rather than simply discussing whether AI will “replace jobs,” these conversations will focus on the practical changes happening within different professions. Professionals can share how AI has changed the way they work, which tasks are becoming automated or assisted by AI, what new opportunities are emerging, and which skills are becoming more important. Students can also learn how professionals are adapting to these changes and what they believe future workers should begin learning now.
>
> The program will cover a wide range of industries, including medicine and health sciences, software engineering and programming, law, architecture, education, graphic design, accounting, business, and other fields. Each talk will be organized around a specific industry or career area, allowing students to attend events that connect with their own interests and future goals.
>
> By bringing real professionals into conversation with students, AI-Ways Forward aims to make the future of work more understandable and relevant. Students will be able to explore how AI may affect the careers they are considering, discover skills they can begin developing now, and gain a more realistic understanding of what it may mean to work alongside increasingly capable AI.
>
> The goal is not to tell students which careers they should pursue. Instead, AI-Ways Forward wants to give them the information and perspectives they need to make better-informed decisions about their own futures.

## Past Speakers — `/past-speakers`

New page: events that have happened, as a timeline grouped by year. The first entry is the original Career Awareness copy, unchanged; only the "Join Meeting" button (it pointed to https://forms.fillout.com/t/3T7C7jhKYPus) was dropped because the meeting is over.

### Christopher Dede
Photo: `/media/career/christopher-dede.webp` (original alt: "Christopher Dede")

**Talk:** Preparing for a Future of Multiple Careers in the Age of AI  
**When:** September 26th, 3 P.M. PST via Google Meet  
**Sort date:** 2026-09-26 (year inferred — the original said "September 26th" only)

> Chris Dede is a Senior Research Fellow at the Harvard Graduate School of Education and was for 22 years the Timothy E. Wirth Professor in Learning Technologies. His fields of scholarship include emerging technologies, policy, and leadership. Chris is a Co-Principal Investigator and Associate Director for Research of the NSF-funded National Artificial Intelligence Institute in Adult Learning and Online Education. He is a Fellow of the American Educational Research Association, a Fellow of the Online Learning Consortium, a Scholar of the Immersive Learning Research Network, and a Distinguished Fellow of the Learning Engineering Network.
>
> In 2020 Chris co-founded the Silver Lining for Learning initiative ( [https://silverliningforlearning.org](https://silverliningforlearning.org/) ). His most recent co-edited books include: Virtual, Augmented, and Mixed Realities in Education; Learning engineering for online education; and New Models for Lifelong Learning in the Digital Economy. His professional website is [https://chrisdede.com](https://chrisdede.com/)

Note: Before attending this meeting, Dr. Dede would like guests to watch an intro video under [Understanding AI Literacy](https://www.chrisdede.com/) from minutes 4:30 - 25:15.

## Latest AI News — `/innovation`

**Heading:** Latest AI News

1. **A.I. Is Everywhere in China. See For Yourself.** — https://www.nytimes.com/interactive/2026/08/21/world/asia/china-ai-life.html?searchResultPosition=3
   - Source: The New York Times
   - Author(s): Agnes Chang, Vivian Wang, Jiwoong Hong, Aaron Byrd and Qilai Shen
   - Publication Date: Aug 21st 2026
   - Image: `/media/news/1.webp`
2. **Australia bans fully AI-made songs from charts after Madonna cover goes viral** — https://www.cbc.ca/news/entertainment/australia-music-chart-ban-ai-9.7319875
   - Source: CBC News
   - Author(s): Kayla McLean (https://www.cbc.ca/author/kayla-mclean-1.7635421)
   - Publication Date: Aug 25th 2026
   - Image: `/media/news/2.webp`
3. **Trump's tariffs risk higher prices for AI, video games, cellphones: experts** — https://www.cbc.ca/news/business/trump-tariff-ai-9.7318970
   - Source: CBC News
   - Author(s): Jeff Lagerquist (https://www.cbc.ca/author/jeff-lagerquist-9.14857)
   - Publication Date: Aug 25th 2026
   - Image: `/media/news/3.webp`
4. **Why are there suddenly so many data centres planned in Canada? Your questions answered** — https://www.cbc.ca/news/climate/data-centres-ask-faq-9.7316098
   - Source: CBC News
   - Author(s): Alexandra Mae Jones (https://www.cbc.ca/news/author/alexandra-mae-jones-1.7305275)
   - Publication Date: Aug 23rd 2026
   - Image: `/media/news/4.webp`
5. **Backlash against AI-generated graphics grows in N.S.** — https://www.cbc.ca/news/canada/nova-scotia/backlash-against-ai-generated-graphics-grows-in-n-s-9.7308798
   - Source: CBC News
   - Author(s): Yuan Wang (https://www.cbc.ca/author/yuan-wang-9.14373)
   - Publication Date: Aug 25th 2026
   - Image: `/media/news/5.webp`
6. **This A.I. Start-Up Aims to Reverse the Backlash Against Data Centers** — https://www.nytimes.com/2026/08/25/business/dealbook/emerald-ai-start-up-data-center-backlash.html?searchResultPosition=2
   - Source: The New York Times
   - Author(s): Sri Muppidi ⚠ original link pointed at a different author
   - Publication Date: Aug 25th 2026
   - Image: `/media/news/6.webp`
7. **By Opening a Model, a Chinese A.I. Lab May Test the World’s Cybersecurity** — https://www.nytimes.com/2026/08/25/science/cybersecurity-zai-open-weights.html?searchResultPosition=4
   - Source: The New York Times
   - Author(s): Cade Metz
   - Publication Date: Aug 25th 2026
   - Image: `/media/news/7.webp`
8. **Alberta minister hosts second AI data centre town hall in Sturgeon County** — https://globalnews.ca/news/12028166/ai-data-centre-town-hall-sturgeon-county/
   - Source: Global News
   - Author(s): Staff ⚠ original link pointed at a different author
   - Publication Date: Aug 20th 2026
   - Image: `/media/news/8.webp`
9. **Montreal youth accused of using AI to plot school attack** — https://globalnews.ca/news/12030244/rcmp-montreal-youth-arrest-terrorism-allegations/
   - Source: Global News
   - Author(s): Aaron D'Andrea (https://globalnews.ca/author/aaron-dandrea/)
   - Publication Date: Aug 21st 2026
   - Image: `/media/news/9.webp`

## FAQs — `/faqs`

**Heading:** FAQs · **Sub-heading:** Common Questions

**Is AI-Ways Forward free to participate in?**

> Yes. Access to AI-Ways Forward's news, articles, and educational resources is free. We want to make reliable and accessible information about artificial intelligence available to as many people as possible, regardless of their technical background or financial circumstances. Some future programs, events, or specialized services may have separate requirements or costs, which will be clearly communicated.

**Do I need to be a certain age to participate?**

> No. AI-Ways Forward is designed to make AI information accessible to people of different ages and backgrounds. Whether you are a student learning about AI for the first time or someone who already follows developments in the field, you can explore our articles, news, and educational content. Some specific programs or events may have age requirements, which will be clearly stated when applicable.

**Do I need to know how to code or have technical experience?**

> No. You do not need to know how to code or have technical experience to use AI-Ways Forward. Our goal is to make developments in artificial intelligence understandable and accessible to everyone. Our content will cover AI news, tools, developments, and their impact on everyday life and future careers in a way that can be understood by people with different levels of technical knowledge.

**Form — "Still Have a Question?":** fields: Your Name · Email Address · Your Questions or Concerns · submit: "Hand In"

## Contact — `/contact-8`

**Heading:** Contact

- Phone Number: 672-515-5775
- Email Address: director@ai-waysforward.com
- Follow Us on: [Youtube@AI-ways Forward](https://www.youtube.com/@AI-waysForward)

**Form fields:** Your Name · Email Address · Your Message · submit: "Hand In"

---

## Appendix A — Wix template filler (extracted, deliberately **not** migrated as copy)

`/ai-tools-applications` and `/practical-ai-skills` both still carry the unedited Wix "service list" template. `/llms-ai-models` carries only the hero and the heading "What is LLM". The text below is template boilerplate, not authored content, so the redesign shows **TBD slots** (striped placeholder + TBD chip) instead.

Repeated six times per page (2 columns × 3 rows), each with a stock photo:

> Service Name
>
> This is a Paragraph. Click on "Edit Text" or double click on the text box to edit the content and make sure to add any relevant information that you want to share with your visitors.

Two of the six blocks on each page also carry:

> People are genuinely interested in learning more about you, so don’t be afraid to share personal anecdotes to create a more friendly quality.

and two of the six blocks per page use the shorter filler: `This is a Paragraph. Click on "Edit Text" or double click on the text box to start editing the content.`

If real module copy exists, replace the `modules` count in `src/content/education.js` with a `modules: [{ title, description, image }]` array and update `ClassPage.jsx` (see docs/ARCHITECTURE.md).

## Appendix B — Original image assets

All downloaded at full resolution to `source-assets/` (untouched). Web-ready copies are generated into `public/media/` by `npm run media`.

| Local raw file | Original Wix media id | Used on | Original alt text | Notes |
| --- | --- | --- | --- | --- |
| `brand/logo-wordmark-arrow.png` | `fce4a0_acaaf789fc6746ba87c661625914b2a9~mv2.png` | Header (all pages) | — | Wordmark + hand-drawn red arrow. Shipped on an opaque white field; the media script converts white to real transparency and trims. |
| `brand/icon-youtube.png` | `78aa2057f0cb42fbbaffcbc36280a64a.png` | Footer, Contact | YouTube | Black glyph; inverted to white on the Deep Brick footer. |
| `home/hero-abstract-node.jpg` | `fce4a0_2e2a59486d744936b3f9aad2dc74c115~mv2.jpg` | Home (original hero, full width) | "Abstract node colorful frosted glass 3d render black … IG_ _ikanhaiyasharma_edited_e" | The handoff keeps this as "the one non-photographic tile" in the gallery rail. Credit in the alt text: *ikanhaiyasharma* (Instagram). |
| `about/founder-jason-yang.png` | `fce4a0_e7dff48fe03d4dc48f1e016545e8f572~mv2.png` | About → Staff | "Screenshot 2026-08-07 163453.png" | Original is a screenshot-derived crop (573 px). Replace with the original portrait when available. |
| `about/cofounder-harry-liu.png` | `fce4a0_e81c7be7f6da4a46980bc7a1ef423522~mv2.png` | About → Staff | "image.png" | |
| `education/class-llms-neurotechnology.jpg` | `fce4a0_def265511e7549dd8aebcbe4c30d0f99~mv2.jpg` | Education → LLMs & AI Models card | "Neurotechnology_edited.jpg" | Original page used a portrait crop (x948, w1545 of 3000×1895); the media script reproduces it. |
| `education/class-tools-made-by-wix.jpg` | `fce4a0_5bab6226119f4a6b8030da4afb93d8b9~mv2.jpg` | Education → AI Tools & Applications card | "Made-by-wix_6_edited.jpg" | Wix stock render (gear + tools). |
| `education/class-skills-digital-brain-interface.jpg` | `489a2c8c728e4d4786747253c728fd65.jpg` | Education → Practical AI Skills card | "Digital Brain Interface" | |
| `career/speaker-christopher-dede.png` | `fce4a0_f56de934e2614e858a4e021f2a19c0f9~mv2.png` | Career Awareness | "image.png" | |
| `career/speaker-tba.png` | `fce4a0_c38392a6001a49bf9a032aaee4685d8a~mv2.png` | Career Awareness (×2, "To Be Announced") | "image.png" | Generic silhouette. |
| `news/dom-01.png … dom-09.png` | `fce4a0_610a2b53…`, `0a2fb3e9…`, `7d78e428…`, `422de07d…`, `91f23b26…`, `0b9a4d68…`, `04c9aaa4…`, `5b93df6e…`, `71d5886f…` (all `~mv2.png`) | News (article order 1–9) | "image.png" | Publisher thumbnails, ~300 px wide — displayed at native size; they will look soft on high-DPI screens. |
| `classes/hero-texture.jpg` | `a3c153_a0c884d86e064a5ba8e7cc5f990e2f8e~mv2.jpg` | All three class sub-pages (hero) | "" | Wix template stock (aerial ice/sand). Kept as the sub-page hero because the original used it. |
| `classes/grid-1.jpg … grid-6.jpg` | `a3c153_608f6162…`, `ec8e183c…`, `29ef14be…`, `41602b53…`, `e34864e8…`, `d4bce080…` (all `~mv2.jpg`) | Template "Service Name" blocks | "" (originals: `11062b_fd5c21…`, `noah-boyer-…-unsplash`, `sumner-mahaffey-…-unsplash`, `matt-artz-…-unsplash copy`, `hasan-almasi-…-unsplash Copy_j`, `olga-o-…-unsplash`) | Unrelated Wix/Unsplash stock (sand, shoreline, quartz). Archived, not shown. |

## Appendix C — On the original site, intentionally not carried over

| Original | Why not carried |
| --- | --- |
| "Powered and secured by Wix" (footer, every page except Home) | Platform attribution; no longer true. Original footer line read "© 2026 by J. Yang. Powered and secured by Wix". |
| Wix member "Log In" icon behaviour | No auth backend exists. UI is present and marked **TBD**. |
| Wix form submission | No backend. Forms compose an email to the director until an endpoint is chosen. Marked **TBD**. |
| Page `<title>` suffix "Mysite" | Wix default placeholder; replaced with "AI-Ways Forward". |

