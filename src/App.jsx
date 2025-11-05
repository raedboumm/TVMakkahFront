import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

// ✅ Pages
import Home from "./pages/Home";
import News from "./pages/News";
import Videos from "./pages/Videos";
import Live from "./pages/Live";
import Programs from "./pages/Programs";
import Hajj from "./pages/Hajj";

const App = () => {
  return (
    <Router basename="/tv">
      <div className="app">
        <ScrollToTop />
        <Header />

        <main className="app-content">
          <BackToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/live" element={<Live />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/hajj" element={<Hajj />} />

            {/* ✅ Invalid routes fall back to homepage */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
