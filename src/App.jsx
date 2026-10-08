import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Education from './pages/Education.jsx';
import ClassPage from './pages/ClassPage.jsx';
import Career from './pages/Career.jsx';
import News from './pages/News.jsx';
import Faqs from './pages/Faqs.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

// Routes keep the original Wix slugs so existing links and search results keep working.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about-7" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="education" element={<Education />} />
        <Route path="llms-ai-models" element={<ClassPage slug="llms-ai-models" />} />
        <Route path="ai-tools-applications" element={<ClassPage slug="ai-tools-applications" />} />
        <Route path="practical-ai-skills" element={<ClassPage slug="practical-ai-skills" />} />
        <Route path="career-awareness" element={<Career />} />
        <Route path="innovation" element={<News />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="contact-8" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
