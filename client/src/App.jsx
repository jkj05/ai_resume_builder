import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import Editor from "./pages/Editor";
import Templates from "./pages/Templates";
import ATS from "./pages/ATS";
import Interview from "./pages/Interview";
import Download from "./pages/Download";
import Dashboard from "./pages/Dashboard";


export default function App() {
  return (
    <>
      <Layout />
      <main className="site-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/ats" element={<ATS />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/download" element={<Download />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* other pages will go here */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
