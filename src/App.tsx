import { HashRouter, Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import { ToastProvider } from './components/Toast';
import FinalProject from './pages/FinalProject';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import ParentGuide from './pages/ParentGuide';
import ParentReport from './pages/ParentReport';
import PlatformAudit from './pages/PlatformAudit';
import Resources from './pages/Resources';
import SafetyLab from './pages/SafetyLab';
import Welcome from './pages/Welcome';
import { CourseProvider } from './state/CourseContext';

export default function App() {
  return (
    <CourseProvider>
      <ToastProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="lessons/:id" element={<Lesson />} />
              <Route path="lab" element={<SafetyLab />} />
              <Route path="audit" element={<PlatformAudit />} />
              <Route path="final" element={<FinalProject />} />
              <Route path="report" element={<ParentReport />} />
              <Route path="parent" element={<ParentGuide />} />
              <Route path="resources" element={<Resources />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </ToastProvider>
    </CourseProvider>
  );
}
