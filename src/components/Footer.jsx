import React from "react";
import "../styles/footer.css";
import logo from "../assets/smallIcon.png"; // keep this path as you have it


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__wrap">
        <div className="footer__grid">
          {/* About */}
          <div className="footer__col">
            <h3 style={{marginTop:"-15px" ,marginRight:"-1px"}} className="footer__title">
              <span className="footer__logoWrap">
                <img className="footer__logo" src={logo} alt="makkah logo" />
              </span>
              قناة مكة
            </h3>

            <p className="footer__text">
              قناة مكة الفضائية - البث المباشر من المسجد الحرام والمسجد النبوي، أخبار الحج
              والعمرة، برامج دينية، تلاوات قرآنية على مدار الساعة.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h3 className="footer__title">روابط سريعة</h3>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  من نحن
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  اتصل بنا
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  الإعلانات
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  سياسة الخصوصية
                </a>
              </li>
            </ul>
          </div>

          {/* Sections */}
          <div className="footer__col">
            <h3 className="footer__title">الأقسام</h3>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  أخبار
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  فيديو
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  برامج
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  <i className="fa-solid fa-chevron-left footer__chev"></i>
                  الحج والعمرة
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h3 className="footer__title">تواصل معنا</h3>
            <div className="footer__contact">
              <p className="footer__text">
                <i className="fa-solid fa-envelope footer__goldIcon"></i>
                info@makkahtv.tv
              </p>
              <p className="footer__text">
                <i className="fa-solid fa-phone footer__goldIcon"></i>
                +966 12 345 6789
              </p>

              <div className="footer__social">
                <a href="https://www.facebook.com/makkahtv" className="socialBtn" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/makkahtv" className="socialBtn" aria-label="Twitter / X">
                  <i className="fa-brands fa-x"></i>
                </a>
                <a href="https://www.youtube.com/makkahtv" className="socialBtn" aria-label="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://www.instagram.com/makkahtv" className="socialBtn" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@makkahtv" className="socialBtn" aria-label="tiktok">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="footer__bottom">
          <p>© 2025 قناة مكة الفضائية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
