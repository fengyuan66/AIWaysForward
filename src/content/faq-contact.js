// /faqs and /contact-8 — verbatim.

export const faqs = {
  title: 'FAQs',
  subtitle: 'Common Questions',
  items: [
    {
      q: 'Is AI-Ways Forward free to participate in?',
      a: "Yes. Access to AI-Ways Forward's news, articles, and educational resources is free. We want to make reliable and accessible information about artificial intelligence available to as many people as possible, regardless of their technical background or financial circumstances. Some future programs, events, or specialized services may have separate requirements or costs, which will be clearly communicated.",
    },
    {
      q: 'Do I need to be a certain age to participate?',
      a: 'No. AI-Ways Forward is designed to make AI information accessible to people of different ages and backgrounds. Whether you are a student learning about AI for the first time or someone who already follows developments in the field, you can explore our articles, news, and educational content. Some specific programs or events may have age requirements, which will be clearly stated when applicable.',
    },
    {
      q: 'Do I need to know how to code or have technical experience?',
      a: 'No. You do not need to know how to code or have technical experience to use AI-Ways Forward. Our goal is to make developments in artificial intelligence understandable and accessible to everyone. Our content will cover AI news, tools, developments, and their impact on everyday life and future careers in a way that can be understood by people with different levels of technical knowledge.',
    },
  ],
  form: {
    heading: 'Still Have a Question?',
    fields: { name: 'Your Name', email: 'Email Address', message: 'Your Questions or Concerns' },
    submit: 'Hand In',
  },
};

export const contactPage = {
  title: 'Contact',
  rows: [
    { label: 'Phone Number', kind: 'phone' },
    { label: 'Email Address', kind: 'email' },
    { label: 'Follow Us on', kind: 'youtube' },
  ],
  form: {
    fields: { name: 'Your Name', email: 'Email Address', message: 'Your Message' },
    submit: 'Hand In',
  },
};
