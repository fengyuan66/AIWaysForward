import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Education from './pages/Education.jsx';
import ClassPage from './pages/ClassPage.jsx';
import Career from './pages/Career.jsx';
import PastSpeakers from './pages/PastSpeakers.jsx';
import News from './pages/News.jsx';
import Faqs from './pages/Faqs.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

// The admin console is its own chunk: visitors and non-admin accounts never download it.
const Admin = lazy(() => import('./pages/Admin.jsx'));

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
        <Route path="past-speakers" element={<PastSpeakers />} />
        <Route path="innovation" element={<News />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="contact-8" element={<Contact />} />
        <Route
          path="admin"
          element={
            <Suspense fallback={null}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
