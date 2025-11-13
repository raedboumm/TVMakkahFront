import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/makkah-logo.png"; // keep this path as you have it

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // ✅ sticky refs + state
  const headerRef = useRef(null);
  const headerTopRef = useRef(null);          // ✅ NEW: ref for header-top
  const logoRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const menuItems = [
    { name: "الرئيسية", page: "/", icon: "fa-home" },
    { name: "أخبار", page: "/news", icon: "fa-newspaper" },
    { name: "فيديوهات", page: "/videos", icon: "fa-play-circle" },
    { name: "بث مباشر", page: "/live", icon: "fa-broadcast-tower", },
    { name: "برامج", page: "/programs", icon: "fa-tv" },
    { name: "الحج والعمرة", page: "/hajj", icon: "fa-kaaba" },
  ];

  // 📅 dynamic date
  const today = new Date();
  const dateStr = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  // ✅ Sticky purely with JS (no external CSS needed)
  useEffect(() => {
    const headerEl = headerRef.current;
    const topEl = headerTopRef.current;       // ✅ get the top bar element
    if (!headerEl) return;

    // measure initial height (for spacer)
    const measure = () => setHeaderHeight(headerEl.offsetHeight);
    measure();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldStick = window.scrollY >= 50;
          if (shouldStick !== isSticky) {
            setIsSticky(shouldStick);

            // ✅ Hide/show the header-top only (your request)
            if (topEl) {
              topEl.style.display = shouldStick ? "none" : "";
            }

            if (shouldStick) {
              // apply sticky styles via JS
              headerEl.style.position = "fixed";
              headerEl.style.top = "0";
              headerEl.style.left = "0";
              headerEl.style.right = "0";
              headerEl.style.width = "100%";
              headerEl.style.background = "dbcbb1"; // keeping your value as-is
              headerEl.style.backdropFilter = "blur(6px)";
              headerEl.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)";
              headerEl.style.zIndex = "9999";
              headerEl.style.transition = "all .2s ease";

              // shrink logo
              if (logoRef.current) {
                logoRef.current.style.width = "85px";
                logoRef.current.style.height = "85px";
                logoRef.current.style.transition = ".2s ease";
              }
            } else {
              // reset styles
              headerEl.style.position = "";
              headerEl.style.top = "";
              headerEl.style.left = "";
              headerEl.style.right = "";
              headerEl.style.width = "";
              headerEl.style.background = "";
              headerEl.style.backdropFilter = "";
              headerEl.style.boxShadow = "";
              headerEl.style.zIndex = "";
              headerEl.style.transition = "";

              if (logoRef.current) {
                logoRef.current.style.width = "103px";
                logoRef.current.style.height = "120px";
                logoRef.current.style.transition = ".2s ease";
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSticky]);

  return (
    <>
      {/* spacer to prevent layout shift when header becomes fixed */}
      <div style={{ height: isSticky ? `${headerHeight}px` : 0 }} />

      <header className="header" ref={headerRef}>
        {/* ✅ Top Bar (will be hidden when sticky) */}
        <div className="header-top" ref={headerTopRef}>
          <div className="container header-top-content">
            <span className="header-date">
              <i className="fa-regular fa-calendar"></i> {dateStr}
            </span>
            <div className="header-social">
              <a href="https://www.tiktok.com/@makkahtv.tv" target="_blank" ><i className="fab fa-tiktok"></i></a>
              <a href="https://www.youtube.com/MakkahTV" target="_blank" ><i className="fab fa-youtube"></i></a>
              <a href="https://www.instagram.com/makkahtv/" target="_blank" ><i className="fab fa-instagram"></i></a>
              <a href="https://x.com/MakkahTV" target="_blank" ><i className="fab fa-x"></i></a>
              <a href="https://www.facebook.com/MakkahTV" target="_blank" ><i className="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>

        {/* ✅ Main Header */}
        <div className="container header-main">
          {/* Logo */}

          <div className="logo-box">
            <Link to="/">
              <img
                ref={logoRef}
                src={logo}
                alt="Makkah TV logo"
                style={{ objectFit: "contain", display: "block", cursor: "pointer" }}
              />
            </Link>
          </div>


          {/* ✅ Desktop Navbar */}
          <nav className="nav-desktop">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.page}
                className={`nav-link ${location.pathname === item.page ? "active-link" : ""}`}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search & Mobile Icons */}
          <div className="header-actions">
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <i className="fas fa-search"></i>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="menu-btn">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* ✅ Search Bar */}
        {searchOpen && (
          <div className="search-box container">
            <input type="text" placeholder="ابحث عن الأخبار والفيديوهات..." />
          </div>
        )}

        {/* ✅ Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.page}
                className={location.pathname === item.page ? "active-link" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className={`fas ${item.icon}`}></i> {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
