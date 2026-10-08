// /education and its three class sub-pages — verbatim.
//
// IMPORTANT: the three class sub-pages (/llms-ai-models, /ai-tools-applications,
// /practical-ai-skills) were published on Wix with unedited template filler
// ("Service Name" / "This is a Paragraph…"). That filler is NOT migrated as copy; it is
// recorded in docs/CONTENT_INVENTORY.md and rendered as TBD slots (see docs/TBD_REGISTER.md).

export const education = {
  title: 'Classes',
  crumbParent: { label: 'Services', to: '/services' },
  crumb: 'Education',
  classes: [
    { title: 'LLMs & AI Models', to: '/llms-ai-models', cta: 'Get Started', image: '/media/education/llms.webp', alt: 'Neurotechnology' },
    { title: 'AI Tools & Applications', to: '/ai-tools-applications', cta: 'Get Started', image: '/media/education/tools.webp', alt: 'Made-by-wix_6_edited.jpg', punch: true },
    { title: 'Practical AI Skills', to: '/practical-ai-skills', cta: 'Get Started', image: '/media/education/skills.webp', alt: 'Digital Brain Interface' },
  ],
  paragraphs: [
    'AI-Ways Forward’s Education program is designed to give young people practical knowledge and experience with artificial intelligence. As AI tools continue to develop rapidly, students are often exposed to many different platforms without knowing which ones are useful for a particular task, how reliable their results are, or how to use them effectively. The program aims to help students move beyond simply using AI and develop a deeper understanding of how different AI technologies can be applied.',
    'Students will be introduced to a variety of AI systems, including large language models such as ChatGPT, Gemini, Grok, Claude, DeepSeek, Qwen, and Llama. They will learn about the strengths and weaknesses of different models and understand that there is no single AI system that is best for everything. Instead, students will learn how to choose the right tool depending on what they are trying to accomplish, whether that involves research, writing, coding, analyzing information, creating content, or completing more complex tasks.',
    'The program will also introduce students to practical AI tools used for coding, research, productivity, design, automation, image generation, and video creation. Students may explore tools such as Cursor, GitHub Copilot, NotebookLM, Perplexity, Canva AI, Midjourney, Sora, Runway, Zapier, Make, and other emerging technologies. Since these tools change quickly, the focus will not be on memorizing individual platforms, but on developing the ability to understand, evaluate, and adapt to new AI technologies as they emerge.',
    'A major part of the Education program will also focus on prompt engineering and effective communication with AI. Students will learn how to give AI clear instructions, provide useful context, refine responses, and work through complex tasks with AI. They will also learn how to evaluate AI-generated information rather than automatically accepting it, recognizing that AI systems can produce inaccurate, incomplete, or misleading results.',
    'The program is not intended to focus heavily on the technical science behind how AI models are built. Instead, AI-Ways Forward focuses on how people can actually use AI in school, work, and everyday problem-solving. Students will have opportunities to apply what they learn through hands-on activities, demonstrations, and projects rather than only learning through presentations.',
    'Ultimately, the goal of the Education program is to give students a strong and practical foundation in AI. Rather than becoming dependent on one particular tool, students will develop the ability to understand different technologies, recognize their strengths and limitations, choose the appropriate tool for a task, and continue learning as AI develops.',
  ],
};

// Shared hero image for the three class sub-pages (original used one template photo on all three).
export const classHeroImage = '/media/classes/hero.webp';

export const classPages = {
  'llms-ai-models': {
    title: 'LLMs & AI Models',
    subtitle: "Understand the strengths, weaknesses, and best uses of today's leading AI models.",
    sectionHeading: 'What is LLM',
    // The original page had this heading and nothing beneath it.
    modules: 0,
  },
  'ai-tools-applications': {
    title: 'AI Tools & Applications',
    subtitle: 'Explore the tools professionals use for coding, research, productivity, automation, design, and media.',
    sectionHeading: null,
    // The original page carried six unedited template "Service Name" blocks.
    modules: 6,
  },
  'practical-ai-skills': {
    title: 'Practical AI Skills',
    subtitle: 'Learn how to communicate with AI, build effective workflows, and get better results.',
    sectionHeading: null,
    modules: 6,
  },
};
