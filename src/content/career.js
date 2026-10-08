// /career-awareness — verbatim. Body text is split into segments so the original inline links survive.
// Segment: string | { href, text }

export const career = {
  title: 'Inspirational Speakers',
  speakers: [
    {
      name: 'Christopher Dede',
      photo: '/media/career/christopher-dede.webp',
      alt: 'Christopher Dede',
      talk: 'Preparing for a Future of Multiple Careers in the Age of AI',
      when: 'September 26th, 3 P.M. PST via Google Meet',
      bio: [
        [
          'Chris Dede is a Senior Research Fellow at the Harvard Graduate School of Education and was for 22 years the Timothy E. Wirth Professor in Learning Technologies. His fields of scholarship include emerging technologies, policy, and leadership. Chris is a Co-Principal Investigator and Associate Director for Research of the NSF-funded National Artificial Intelligence Institute in Adult Learning and Online Education. He is a Fellow of the American Educational Research Association, a Fellow of the Online Learning Consortium, a Scholar of the Immersive Learning Research Network, and a Distinguished Fellow of the Learning Engineering Network.',
        ],
        [
          'In 2020 Chris co-founded the Silver Lining for Learning initiative ( ',
          { href: 'https://silverliningforlearning.org/', text: 'https://silverliningforlearning.org' },
          ' ). His most recent co-edited books include: Virtual, Augmented, and Mixed Realities in Education; Learning engineering for online education; and New Models for Lifelong Learning in the Digital Economy. His professional website is ',
          { href: 'https://chrisdede.com/', text: 'https://chrisdede.com' },
        ],
      ],
      join: { label: 'Join Meeting', href: 'https://forms.fillout.com/t/3T7C7jhKYPus' },
      note: [
        'Before attending this meeting, Dr. Dede would like guests to watch an intro video under ',
        { href: 'https://www.chrisdede.com/', text: 'Understanding AI Literacy' },
        ' from minutes 4:30 - 25:15.',
      ],
    },
    { name: 'To Be Announced', photo: '/media/career/speaker-tba.webp', alt: 'image.png', tba: true },
    { name: 'To Be Announced', photo: '/media/career/speaker-tba.webp', alt: 'image.png', tba: true },
  ],
  paragraphs: [
    'Artificial intelligence is changing careers in different ways, and students need to understand what those changes actually look like in the real world. AI-Ways Forward’s Career Awareness program gives young people the opportunity to hear directly from professionals who are experiencing these changes within their own industries. Through guest speakers, industry talks, interviews, and panel discussions, students will be introduced to a variety of career fields and learn how AI is being used in each one.',
    'Rather than simply discussing whether AI will “replace jobs,” these conversations will focus on the practical changes happening within different professions. Professionals can share how AI has changed the way they work, which tasks are becoming automated or assisted by AI, what new opportunities are emerging, and which skills are becoming more important. Students can also learn how professionals are adapting to these changes and what they believe future workers should begin learning now.',
    'The program will cover a wide range of industries, including medicine and health sciences, software engineering and programming, law, architecture, education, graphic design, accounting, business, and other fields. Each talk will be organized around a specific industry or career area, allowing students to attend events that connect with their own interests and future goals.',
    'By bringing real professionals into conversation with students, AI-Ways Forward aims to make the future of work more understandable and relevant. Students will be able to explore how AI may affect the careers they are considering, discover skills they can begin developing now, and gain a more realistic understanding of what it may mean to work alongside increasingly capable AI.',
    'The goal is not to tell students which careers they should pursue. Instead, AI-Ways Forward wants to give them the information and perspectives they need to make better-informed decisions about their own futures.',
  ],
};
