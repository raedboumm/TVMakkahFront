import React, { useEffect, useState } from "react";
import api from "../services/api";
import ArticleCard from "../components/ArticleCard";
import VideoCard from "../components/VideoCard";
import PrayerTimes from "../components/PrayerTimes";
import TrendingArticles from "../components/TrendingArticles";
import "../styles/home.css";
import ChannelInfo from "../components/ChannelInfo";
import poster1 from "../assets/episode/post1.png";
import poster2 from "../assets/episode/poste2.png";
import poster3 from "../assets/episode/poste3.png";
import poster4 from "../assets/episode/poste4.png";
import poster5 from "../assets/episode/post5.png";3




import hq from "../assets/episode/resize1.png"

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
                      image_url: 'https://i.ytimg.com/vi/vDs_ab_J96I/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIF4oTjAP&rs=AOn4CLB8oAC6mzG2Z-Y7J6Dfa1Qgyu0vCA',
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
            image1: poster1,
            image2: "https://i.ytimg.com/vi/ccV974FRPI8/mqdefault.jpg"
          },
          {
            program: "أول من سكن مكة | مكة المكان | المكرمة | قناة مكة",
            episode: "برنامج المكرمة واجهة إعلامية واسعة للتعريف بمكة المكرمة وكعبتها المشرفة وآياتها البينات وخصائصها الباهرات ورجالها العظام وتاريخها المجيد ومن بعث فيها من الرسل وما نزل بها من الكتب وما أودع الله فيها من الهدى والفضل",
            time: "34 دقيقة",
            youtube: "https://www.youtube.com/watch?v=qKS9sC3nl_c&list=PLSG0qi3h4n36JTbcxMZVpxW-GPyb1dLhI",
            image1: poster2,
            image2: "https://i.ytimg.com/vi/kDhScAcGyVM/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAnvyNXLmzg6LqaP44iY64QOJQ7NQ"
          },
          {
            program: "الاربعون المكية 39 وفد الله | قناة مكة",
            episode: "باب الطهارة – الفتاوى الشائعة",
            time: "22 دقيقة",
            youtube: "https://www.youtube.com/watch?v=TKUcUAecRtI",
            image1: poster3,
            image2: "https://i.ytimg.com/vi/vDs_ab_J96I/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIF4oTjAP&rs=AOn4CLB8oAC6mzG2Z-Y7J6Dfa1Qgyu0vCA"
          },
          {
            program: "أطهر انسان | قناة مكة",
            episode: "مولد الرسول ﷺ – البداية المباركة",
            time: "30 دقيقة",
            youtube: "https://www.youtube.com/watch?v=5j1Vt9M2eo0",
            image1: poster4,
            image2: "https://i.ytimg.com/vi/kdZVmYqdN-M/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDFLZ62M3di-azXvBPz0U2ehvuTVg"
          },
          {
            program: "حارات مكة القديمة | قناة مكة",
            episode: "برنامج المكرمة واجهة إعلامية واسعة للتعريف بمكة المكرمة",
            time: "22 دقيقة",
            youtube: "https://www.youtube.com/watch?v=kdZVmYqdN-M&list=PLSG0qi3h4n342_0h_gSjHvUzQAmnpD2Ik&index=1",
            image1: poster5,
            image2: "https://i.ytimg.com/vi/pVvkKzvWWBQ/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIGIoKzAP&rs=AOn4CLB1OW9fLilwdQjGq1bJZZkbKd8omg"
          },
        ];

        const C = React.lazy(() => import('../components/ProgramEpisodes.jsx'));
        return (
          <React.Suspense fallback={null}>
            <C title="لقاءات مباشرة" episodes={episodes} />
          </React.Suspense>
        );
      })()}

    </div>
  );
};

export default Home;
