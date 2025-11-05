import React, { useEffect, useState } from "react";
import api from "../services/api";
import ArticleCard from "../components/ArticleCard";
import VideoCard from "../components/VideoCard";
import PrayerTimes from "../components/PrayerTimes";
import TrendingArticles from "../components/TrendingArticles";
import "../styles/home.css";
import ChannelInfo from "../components/ChannelInfo";

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videosPage, setVideosPage] = useState(1);
  const [videosTotalPages, setVideosTotalPages] = useState(1);
  const [mostViewed, setMostViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (page = 1) => {
    setLoading(true);
    try {
      const [
        featuredRes,
        articlesRes,
        videosRes,
        mostViewedRes
      ] = await Promise.all([
        api.get("/articles?featured=true&limit=3"),
        api.get("/articles?limit=2"),
        api.get(`/videos?page=${page}&limit=8`),
        api.get("/videos/trending/most-viewed?limit=4"),
      ]);

      if (featuredRes?.success) setFeaturedArticles(featuredRes.data ?? []);
      if (articlesRes?.success) setArticles(articlesRes.data ?? []);
      if (videosRes?.success) {
        setVideos(videosRes.data ?? []);
        if (videosRes.pagination) {
          setVideosPage(videosRes.pagination.page || 1);
          setVideosTotalPages(videosRes.pagination.totalPages || 1);
        }
      }
      if (mostViewedRes?.success) setMostViewed(mostViewedRes.data ?? []);

    } catch (err) {
      console.error("Error loading homepage data:", err);
      // Optionally reset values to []
      // setFeaturedArticles([]);
      // setArticles([]);
      // setVideos([]);
      // setMostViewed([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">جاري التحميل...</p>;

  return (
    <div className="home-wrapper">

      {/* ✅ Featured Hero Section */}
      <section className="hero-gradient">
        <div className="container">
          <div className="grid hero-grid">
            {featuredArticles.map((article, i) =>
              i === 0 ? (
                // ✅ Replace FIRST featured article ONLY with YouTube Live
                <div key="yt-live" >
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/mF4VaH_er8A?si=rQGd6fT7uJyACmDh"
                    title="YouTube live"
                    frameBorder="0"
                    loading="lazy"

                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <ArticleCard key={article.id} index={i} mostViewed={mostViewed} article={article} featured />
              ))}
          </div>
        </div>
      </section>

      {/* ✅ Latest News + Sidebar */}
      <section className="news-wrapper">
        <div className="container news-layout">
          {/* Main News */}
          <div className="articles-section">
            <h2 className="section-title">
              <span className="title-bar"></span> أحدث الأخبار
            </h2>
            <div className="grid news-grid">
              {(() => {
                const channelNews = [
                  {
                    id: 'channel-3',
                    slug: 'makkah-live-update',
                    title_ar: 'تحديث في البث المباشر لقناة مكة',
                    summary_ar: 'تحسينات تقنية في جودة البث واستقرار الإرسال للمشاهدين حول العالم.',
                    image_url: 'https://makkahlive.net/images/MakkahLiveCover.jpg',
                    category_name_ar: 'أخبار',
                    category_slug: 'news',
                    is_breaking: 1,
                    view_count: 1242,
                    created_at: '2025-01-05',
                  },
                  {
                    id: 'channel-4',
                    slug: 'makkah-app-release',
                    title_ar: 'إطلاق تطبيق قناة مكة الجديد',
                    summary_ar: 'تطبيق جديد يتيح متابعة البث المباشر والمحتوى عند الطلب وإشعارات التنبيهات.',
                    image_url: 'https://yt3.googleusercontent.com/nK6NGlAkcQZKCRhS75Xq4UWUl9IhsedhL3vXwoG14wddcC0uw1D4DfyUclaZDr0wp4qLxBVs=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
                    category_name_ar: 'أخبار',
                    category_slug: 'news',
                    is_breaking: 1,
                    view_count: 1422,
                    created_at: '2025-01-06',
                  },
                ];
                return channelNews.map((article, i) => (
                  <ArticleCard key={article.id || i} article={article} />
                ));
              })()}

            </div>
            <div className="articles-section">
              <h2 className="section-title">
                <span className="title-bar"></span> أخبار القناة
              </h2>
              <div className="grid news-grid">
                {(() => {
                  const channelNews = [
                    {
                      id: 'channel-1',
                      slug: 'makkah-friday-khutbah',
                      title_ar: 'خصائص البلد الحرام 06 قيام للناس | قناة مكة',
                      summary_ar: 'حلقة تتناول أبرز خصائص البلد الحرام ودوره كقيام للناس من منظور شرعي وروحاني.',
                      image_url: 'https://i.ytimg.com/vi/lhwurDCEss4/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgVihHMA8=&rs=AOn4CLDbgn4eImg_UXJPZfO2DOrvTfwQuQ',
                      category_name_ar: 'أخبار',
                      category_slug: 'news',
                      is_breaking: 0,
                      view_count: 1425,
                      created_at: '2025-01-03',
                    },
                    {
                      id: 'channel-2',
                      slug: 'hajj-season-1446-start',
                      title_ar: 'خصائص البلد الحرام 08 هدى للعالمين | قناة مكة',
                      summary_ar: 'حلقة تتناول أبرز خصائص البلد الحرام ودوره كقيام للناس من منظور شرعي وروحاني.',
                      image_url: 'https://i.ytimg.com/an_webp/b5XpuE6nlC4/mqdefault_6s.webp?du=3000&sqp=CNatr8gG&rs=AOn4CLBNVc-p-Z3p58ntIFQPT3K_OmI8lg',
                      category_name_ar: 'الحج والعمرة',
                      category_slug: 'hajj-umrah',
                      is_breaking: 1,
                      view_count: 456,
                      created_at: '2025-01-04',
                    },
                  ];
                  return channelNews.map((article, i) => (
                    <ArticleCard key={article.id || i} article={article} />
                  ));
                })()}

              </div>

            </div>

          </div>


          {/* Sidebar */}
          <aside className="sidebar">


            {/* ✅ Prayer Times */}
            <PrayerTimes />
            <ChannelInfo />

          </aside>
        </div>
      </section>

      {/* ✅ Latest Videos */}
      {(() => {
        const C = React.lazy(() => import('../components/PaginatedVideos.jsx'));
        return (
          <React.Suspense fallback={null}>
            <C title="أحدث الفيديوهات" pageSize={4} videos={videos} />
          </React.Suspense>
        );
      })()}

      {(() => {
        const episodes = [
          {
            program: "المكرمة 1443 | مكة خير",
            episode: "حلقة 12 - أصوات من المسجد الحرام",
            time: "28 دقيقة",
            youtube: "https://www.youtube.com/watch?v=ccV974FRPI8&list=PLSG0qi3h4n37Q_TYX51GDk691TqaRvHHV",
            image: "https://i.ytimg.com/vi/ccV974FRPI8/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBaxr6FmuRgLGdlmKROVNMx486iRQ"
          },
          {
            program: "خصائص البلد الحرام 05 قبلة للعالمين | قناة مكة",
            episode: "غزوة بدر – الدروس والعبر",
            time: "34 دقيقة",
            youtube: "https://www.youtube.com/watch?v=CPFkAbK5SfU",
            image: "https://i.ytimg.com/an_webp/CPFkAbK5SfU/mqdefault_6s.webp?du=3000&sqp=CPumr8gG&rs=AOn4CLD3rR7HJaLPPOvRCsFLDqt9Dt_TMA"
          },
          {
            program: "الاربعون المكية 39 وفد الله | قناة مكة",
            episode: "باب الطهارة – الفتاوى الشائعة",
            time: "22 دقيقة",
            youtube: "https://www.youtube.com/watch?v=TKUcUAecRtI",
            image: "https://i.ytimg.com/an_webp/8DicPXr_Mms/mqdefault_6s.webp?du=3000&sqp=COjgrsgG&rs=AOn4CLDf3wmm0RHIMe55FB9o5Uc7L5xJ1Q"
          },
          {
            program: "أطهر انسان | قناة مكة",
            episode: "مولد الرسول ﷺ – البداية المباركة",
            time: "30 دقيقة",
            youtube: "https://www.youtube.com/watch?v=5j1Vt9M2eo0",
            image: "https://i.ytimg.com/vi/5j1Vt9M2eo0/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGFsgYChlMA8=&rs=AOn4CLD_dfoEZp7cLBTgKA_DoW_myLn4iQ"
          },
              {
            program: "ركنان | قناة مكة",
            episode: "باب الطهارة – الفتاوى الشائعة",
            time: "22 دقيقة",
            youtube: "https://www.youtube.com/watch?v=yYeQf-MaEWQ",
            image: "https://i.ytimg.com/vi/yYeQf-MaEWQ/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgXChRMA8=&rs=AOn4CLBdCWkYb9qa7ix1IqCBGJDoBp5icA"
          },
        ];

        const C = React.lazy(() => import('../components/ProgramEpisodes.jsx'));
        return (
          <React.Suspense fallback={null}>
            <C title="أحدث  السلاسل" episodes={episodes} />
          </React.Suspense>
        );
      })()}

    </div>
  );
};

export default Home;
