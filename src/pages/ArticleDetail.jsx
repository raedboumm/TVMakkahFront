/* ==========================================================================
   🟦 THE ULTIMATE INTERNAL NEWS PAGE — FINAL PREMIUM VERSION
   Clean • Modern • Arabic RTL • Editorial • Professional UI
========================================================================== */

import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import "../styles/articleDetail.css";
import ArticleCard from "../components/ArticleCard";
import staticArticles from '../data/staticArticles';

const ArticleDetail = () => {
    const articleRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [pageToastVisible, setPageToastVisible] = useState(false);
    const [pageToastText, setPageToastText] = useState('');
    const prevAidRef = useRef(null);
    const location = useLocation();

    const { id } = useParams();
    const navigate = useNavigate();
    const aid = id ? String(id) : null;

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    /* -------------------------------
       ✅ Scroll Progress Bar
    --------------------------------*/
    useEffect(() => {
        const onScroll = () => {
            if (!articleRef.current) return;
            const el = articleRef.current;
            const total = el.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY - el.offsetTop;
            const pct = Math.max(0, Math.min(1, scrolled / total)) * 100;
            setProgress(isNaN(pct) ? 0 : pct);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* -------------------------------
       ✅ DEMO STATIC CONTENT
    --------------------------------*/
    const demo = {
        title:
            "مشروع حضري جديد يغيّر وجه المدينة: مسارات خضراء، مواصلات ذكية، وتجربة عيش مستدامة",
        category: "تقارير",
        date: "11 نوفمبر 2025",
        views: "98,234",
        summary:
            "أعلنت السلطات المحلية عن خطة حضرية متكاملة لتطوير الأحياء وإعادة تصميم المسارات العامة لتكون أكثر صداقة للمشاة والدراجات، مع حلول نقل ذكية وتوسيع للمساحات الخضراء.",
        leadImage:
            "https://images.unsplash.com/photo-1558481795-7e7b7b0a3861?w=1600",
        body: `
      <p>تهدف الخطة الجديدة إلى إعادة تشكيل المشهد الحضري عبر<span> نهج شامل </span>يراعي الاستدامة والراحة. وتشمل الخطة ممرات مظللة، مناطق استراحة متعددة، وحدائق جيبية داخل الأحياء لرفع جودة الحياة اليومية.</p>

      <h2>أهداف المشروع</h2>
      <ul>
        <li>توسيع المسارات الخضراء ورفع نسبة التشجير في الأحياء.</li>
        <li>إطلاق منظومة مواصلات ذكية تعمل عبر تطبيقات فورية.</li>
        <li>تحسين الوصول إلى الخدمات الأساسية للمشاة والدراجات.</li>
      </ul>

      <blockquote>“المدينة ليست طرقًا فقط — هي تجارب يومية للناس” — رئيس فريق التخطيط</blockquote>

      <p>تتضمن المرحلة الأولى إنشاء محاور رئيسية للمشاة تمتد بين الحدائق والمدارس والمراكز الصحية، مع توفير خدمات مشاركة الدراجات ومساحات انتظار آمنة لها.</p>

      <img src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1600" alt="صورة project" />

      <h3>مشاركة المجتمع</h3>
      <p>أطلقت البلدية منصة تفاعلية لتلقي مقترحات السكان، حيث ستحدد الأولويات بناء على الاحتياجات الفعلية لكل حي.</p>
    `,
        keyFacts: [
            "زيادة 25% في التشجير والمساحات الخضراء",
            "شبكة مسارات مشاة ودراجات تربط الأحياء الحيوية",
            "لوحات معلومات ذكية وتطبيق تنقل فوري",
            "شراكات مع متاجر محلية لتحسين الواجهات",
        ],
        tags: ["المدينة الذكية", "التنقل", "الاستدامة", "تطوير حضري"],
        author: {
            name: "فاطمة الزهراء العلوي",
            role: "صحفية متخصصة في الشأن الحضري",
            avatar:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256",
            bio: "تغطي قصص التحول الحضري والابتكار في الخدمات العامة منذ 2017.",
        },
        suggestions: [
            {
                title: "كيف تغيّر المدن شوارعها لتصبح صالحة للمشي؟",
                date: "8 نوفمبر 2025",
                image:
                    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=900",
            },
            {
                title: "دراجات تشاركية: تجربة جديدة للنقل النظيف",
                date: "5 نوفمبر 2025",
                image:
                    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900",
            },
            {
                title: "الحدائق الجيبية: مساحات صغيرة بتأثير كبير",
                date: "3 نوفمبر 2025",
                image:
                    "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=900",
            },
            {
                title: "إضاءة ذكية تقلل استهلاك الطاقة",
                date: "1 نوفمبر 2025",
                image:
                    "https://images.unsplash.com/photo-1497290756760-23ac55edf36f?w=900",
            },
        ],
    };

    /* -------------------------------
       ✅ Load Article from Database OR Fallback Demo
    --------------------------------*/
    const articleFromData = aid ? staticArticles.find(a => String(a.id) === aid) : null;

    const article = articleFromData ? {
        id: articleFromData.id,
        title: articleFromData.title_ar,
        category: articleFromData.category_name,
        date: articleFromData.publish_date,
        views: articleFromData.view_count,
        summary: articleFromData.summary_ar,
        leadImage: articleFromData.image_url,
        body: articleFromData.body || articleFromData.summary_ar,
        tags: articleFromData.tags || []
    } : demo;
    /* -------------------------------
       ✅ Prev / Next Computation
    --------------------------------*/
    let prevArticle = null;
    let nextArticle = null;

    if (articleFromData) {
        const currentIndex = staticArticles.findIndex(a => a.id === articleFromData.id);
        prevArticle = currentIndex > 0 ? staticArticles[currentIndex - 1] : null;
        nextArticle =
            currentIndex < staticArticles.length - 1
                ? staticArticles[currentIndex + 1]
                : null;
    } else if (staticArticles.length > 0) {
        // Demo fallback: always functional
        prevArticle = staticArticles[staticArticles.length - 1];
        nextArticle = staticArticles[0];
    }

    /* -------------------------------
       ✅ Share Functions
    --------------------------------*/
    const shareWhatsApp = () => {
        const text = `${article.title} - ${currentUrl}`;
        window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
            "_blank"
        );
    };

    const shareFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
            )}`,
            "_blank"
        );
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) { }
    };

    const doPrint = () => window.print();

    /* -------------------------------
       ✅ Reading Time
    --------------------------------*/
    const estimateReadingTime = (html) => {
        const text = (html || "").replace(/<[^>]*>/g, " ");
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(words / 200));
        return `${minutes} دقيقة قراءة`;
    };

    /* -------------------------------
       ✅ Page Toast (Animated)
    --------------------------------*/
    useEffect(() => {
        const newAid = aid;
        const prev = prevAidRef.current;

        try {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch { }

        if (prev === null) {
            prevAidRef.current = newAid;
            return;
        }
        if (prev === newAid) return;

        let toast = "تم الانتقال إلى مقال جديد";

        const prevIdx = staticArticles.findIndex((a) => String(a.id) === String(prev));
        const newIdx = staticArticles.findIndex((a) => String(a.id) === String(newAid));

        if (prevIdx !== -1 && newIdx !== -1) {
            if (newIdx > prevIdx) toast = "تقرير لاحق →";
            else if (newIdx < prevIdx) toast = "← تقرير سابق";
        }

        setPageToastText(toast);
        setPageToastVisible(true);

        const t = setTimeout(() => setPageToastVisible(false), 1200);
        prevAidRef.current = newAid;
        return () => clearTimeout(t);
    }, [location.pathname]);

    /* -------------------------------
       ✅ Sanitize HTML (prevent XSS) — dynamic import for runtime-safe bundling
    --------------------------------*/
    const [sanitizedBody, setSanitizedBody] = useState(article.body || "");

    useEffect(() => {
        let mounted = true;
        if (typeof window === 'undefined') {
            setSanitizedBody(article.body || "");
            return () => (mounted = false);
        }

        // dynamically import DOMPurify in the browser to avoid bundler/global issues
        import('dompurify')
            .then((mod) => {
                const purifier = mod && (mod.default || mod);
                const clean = purifier && purifier.sanitize ? purifier.sanitize(article.body || "") : (article.body || "");
                if (mounted) setSanitizedBody(clean);
            })
            .catch(() => {
                if (mounted) setSanitizedBody(article.body || "");
            });

        return () => (mounted = false);
    }, [article.body]);

    /* -------------------------------
       ✅ RENDER
    --------------------------------*/
    return (
        <main className="article-detail" dir="rtl">

            {/* Reading Progress */}
            <div className="reading-progress">
                <span style={{ width: `${progress}%` }} />
            </div>

            {/* Page Toast */}
            <div
                className={`page-toast ${pageToastVisible ? "show" : ""}`}
                role="status"
                aria-hidden={!pageToastVisible}
            >
                {pageToastText}
            </div>

            {/* Article Container */}
            <div className="container article-detail-inner" ref={articleRef}>
                <article className="detail-card">

                    {/* SHARE BAR */}
                    <aside className="share-bar">
                        <button className="share-btn" onClick={shareWhatsApp}>WA</button>
                        <button className="share-btn" onClick={shareFacebook}>FB</button>
                        <button className="share-btn" onClick={copyLink}>{copied ? "✓" : "⎘"}</button>
                        <button className="share-btn" onClick={doPrint}>📄</button>
                    </aside>

                    {/* HEADER */}
                    <header className="detail-header">
                        <span className="cat">{article.category}</span>
                        <h1 className="detail-title">
                            <span className="title-bar" aria-hidden="true"></span>
                            {article.title}
                        </h1>

                        <div className="detail-meta">
                            <time>{article.date}</time>
                            <span className="dot">•</span>
                            <span className="views">{article.views} مشاهدة</span>
                            <span className="dot hide-on-mobile">•</span>
                            <span className="hide-on-mobile">
                                {estimateReadingTime(article.body)}
                            </span>
                        </div>
                    </header>

                    {/* LEAD SECTION */}
                    <section className="lead-row">
                        <div className="lead-summary-col">
                            <p className="detail-summary">{article.summary}</p>

                            <div className="lead-static">
                                <p className="small">• ممرات واسعة للمشاة</p>
                                <p className="small">• مسارات دراجات آمنة</p>
                                <p className="small">• نقاط جلوس مظللة</p>
                                <p className="small">• تصميم جمالي حديث</p>
                            </div>
                        </div>

                        <div className="lead-extra-col">
                            {/* space for future components */}
                        </div>

                        <div className="lead-media">
                            <img src={article.leadImage} loading="lazy" alt="" />
                        </div>
                    </section>

                    {/* BODY CONTENT */}
                    <section
                        className="detail-body"
                        style={{ fontSize: `${fontSize}px` }}
                        dangerouslySetInnerHTML={{ __html: sanitizedBody }}
                    />

                    {/* KEY FACTS */}
                    <section className="keyfacts">
                        <h3>أبرز النقاط</h3>
                        <ul>
                            {(article.keyFacts || demo.keyFacts).map((k, i) => (
                                <li key={i}>{k}</li>
                            ))}
                        </ul>
                    </section>

                    {/* EXTRA DETAILS */}
                    <section className="extra-details">
                        <h3>تفاصيل إضافية</h3>

                        <div className="timeline">
                            <h4>الجدول الزمني للمشروع</h4>
                            <ol>
                                <li>
                                    <strong>المرحلة الأولى (1-6 أشهر):</strong> دراسات ميدانية وتصميم مفاهيم.
                                </li>
                                <li>
                                    <strong>المرحلة الثانية (7-18 شهرًا):</strong> تنفيذ البنية التحتية والمسارات.
                                </li>
                                <li>
                                    <strong>المرحلة الثالثة (19-36 شهرًا):</strong> الإطلاق والتشغيل الكامل.
                                </li>
                            </ol>
                        </div>

                        <div className="related-media">
                            <h4>وسائط ذات صلة</h4>
                            <div className="media-grid">
                                <img
                                    src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=800"
                                    alt="وسائط"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=800"
                                    alt="وسائط"
                                />
                            </div>
                        </div>
                    </section>

                    {/* TAGS */}
                    <section className="tags">
                        {(article.tags || demo.tags).map((t, i) => (
                            <a key={i} className="tag" href="#">{t}</a>
                        ))}
                    </section>

                    {/* AUTHOR BOX */}
                    <section className="author-box">
                        <img src={demo.author.avatar} alt={demo.author.name} />
                        <div>
                            <h4>{demo.author.name}</h4>
                            <p className="author-role">{demo.author.role}</p>
                            <p className="author-bio">{demo.author.bio}</p>
                        </div>
                    </section>

                    {/* PREV / NEXT NAVIGATION */}
                    <nav className="prevnext">
                        {prevArticle ? (
                            <Link
                                to={`/news/${prevArticle.id}`}
                                className="prev nav-link"
                            >
                                ← تقرير سابق
                            </Link>
                        ) : (
                            <button className="prev nav-disabled">← تقرير سابق</button>
                        )}

                        {nextArticle ? (
                            <Link
                                to={`/news/${nextArticle.id}`}
                                className="next nav-link"
                            >
                                تقرير لاحق →
                            </Link>
                        ) : (
                            <button className="next nav-disabled">تقرير لاحق →</button>
                        )}
                    </nav>

                    {/* SUGGESTIONS */}
                    <footer className="detail-footer">
                        <h3>مواضيع قد تهمك</h3>

                        <div className="suggestions-grid">
                            {(staticArticles?.length
                                ? staticArticles.slice(0, 4)
                                : demo.suggestions
                            ).map((a, i) => {
                                const articleShape = a.id
                                    ? a
                                    : {
                                        id: `demo-${i}`,
                                        title_ar: a.title,
                                        summary_ar: "",
                                        image_url: a.image,
                                        category_name: "",
                                        publish_date: a.date,
                                        view_count: 0,
                                    };

                                return (
                                    <div key={i} className="suggestion-item">
                                        <ArticleCard article={articleShape} />
                                    </div>
                                );
                            })}
                        </div>
                    </footer>

                </article>
            </div>
        </main>
    );
};

export default ArticleDetail;
