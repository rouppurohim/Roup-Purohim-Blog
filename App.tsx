import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

// Lazy Load Pages for Performance Code Splitting
const Home = lazy(() => import('./pages/Home'));
const Insights = lazy(() => import('./pages/Insights'));
const Resources = lazy(() => import('./pages/Resources'));
const About = lazy(() => import('./pages/About'));
const WorkWithMe = lazy(() => import('./pages/WorkWithMe'));
const AdminInit = lazy(() => import('./pages/AdminInit'));
const Admin = lazy(() => import('./pages/Admin'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const Playbook = lazy(() => import('./pages/Playbook'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background dark:bg-darkbg text-secondary dark:text-white">
    <div className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Initializing Hub...</div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/category/:name" element={<Insights />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/about" element={<About />} />
                <Route path="/work-with-me" element={<WorkWithMe />} />
                <Route path="/admin-init" element={<AdminInit />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/playbook" element={<Playbook />} />
                <Route path="/:slug" element={<PostDetail />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}
