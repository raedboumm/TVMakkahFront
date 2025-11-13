import React, { useEffect, useState } from "react";
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
import poster5 from "../assets/episode/post5.png";





const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videosPage, setVideosPage] = useState(1);
  const [videosTotalPages, setVideosTotalPages] = useState(1);
  const [mostViewed, setMostViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static featured articles
  const staticFeaturedArticles = [
    {
      id: 1,
      title_ar: "البث المباشر من المسجد الحرام",
      summary_ar: "متابعة مباشرة للصلوات والشعائر من الحرم المكي الشريف",
      image_url: "https://makkahlive.net/images/MakkahLiveCover.jpg",
      category_name: "بث مباشر",
      publish_date: "2024-01-15",
      view_count: 2450,
      featured: true
    },
    {
      id: 2,
      title_ar: "افتتاح مشروع توسعة المسجد الحرام",
      summary_ar: "أعلنت الرئاسة العامة لشؤون المسجد الحرام عن افتتاح المرحلة الأولى من التوسعة",
      image_url: "https://i.ytimg.com/vi/lhwurDCEss4/hqdefault.jpg",
      category_name: "أخبار",
      publish_date: "2024-01-14",
      view_count: 180,
      featured: true
    },

  ];

  // Static articles
  const staticArticles = [
    {
      id: 4,
      title_ar: "برامج توعوية للحجاج بعدة لغات",
      summary_ar: "أطلقت وزارة الحج والعمرة برامج توعوية شاملة",
      image_url: "https://i.ytimg.com/vi/QlasJcax37k/hqdefault.jpg",
      category_name: "حج وعمرة",
      publish_date: "2024-01-12",
      view_count: 4500
    },
    {
      id: 5,
      title_ar: "تطوير خدمات الإفتاء في الحرم",
      summary_ar: "تم تطوير مركز الإفتاء في المسجد الحرام",
      image_url: "https://i.ytimg.com/vi/hE9VDhUDT-4/hqdefault.jpg",
      category_name: "أخبار",
      publish_date: "2024-01-11",
      view_count: 380
    }
  ];

  // Static videos
  const staticVideos = [
    {
      id: 1,
      title_ar: "صلاة التراويح من المسجد الحرام",
      description_ar: "صلاة التراويح المباشرة من الحرم المكي",
      thumbnail_url: "https://i.ytimg.com/vi/lhwurDCEss4/hqdefault.jpg",
      youtube_id: "lhwurDCEss4",
      video_url: "https://www.youtube.com/watch?v=lhwurDCEss4",
      duration: 3420,
      view_count: 1250,
      publish_date: "2024-01-20",
      type_name: "صلاة"
    },
    {
      id: 2,
      title_ar: "خطبة الجمعة من مكة المكرمة",
      description_ar: "خطبة الجمعة المباشرة من المسجد الحرام",
      thumbnail_url: "https://i.ytimg.com/vi/vDs_ab_J96I/hqdefault.jpg",
      youtube_id: "vDs_ab_J96I",
      video_url: "https://www.youtube.com/watch?v=vDs_ab_J96I",
      duration: 2640,
      view_count: 980,
      publish_date: "2024-01-19",
      type_name: "خطبة"
    },
    {
      id: 3,
      title_ar: "برنامج نور القرآن",
      description_ar: "برنامج يومي لتفسير القرآن الكريم",
      thumbnail_url: "https://i.ytimg.com/vi/QlasJcax37k/hqdefault.jpg",
      youtube_id: "QlasJcax37k",
      video_url: "https://www.youtube.com/watch?v=QlasJcax37k",
      duration: 1800,
      view_count: 870,
      publish_date: "2024-01-18",
      type_name: "برنامج"
    },
    {
      id: 4,
      title_ar: "في رحاب الحرم",
      description_ar: "جولات حصرية داخل المسجد الحرام",
      thumbnail_url: "https://i.ytimg.com/vi/hE9VDhUDT-4/hqdefault.jpg",
      youtube_id: "hE9VDhUDT-4",
      video_url: "https://www.youtube.com/watch?v=hE9VDhUDT-4",
      duration: 2100,
      view_count: 760,
      publish_date: "2024-01-17",
      type_name: "برنامج"
    },
    {
      id: 5,
      title_ar: "مناسك الحج والعمرة",
      description_ar: "شرح تفصيلي لمناسك الحج والعمرة",
      thumbnail_url: "https://i.ytimg.com/vi/WIZ8I4pxqQA/hqdefault.jpg",
      youtube_id: "WIZ8I4pxqQA",
      video_url: "https://www.youtube.com/watch?v=WIZ8I4pxqQA",
      duration: 2520,
      view_count: 650,
      publish_date: "2024-01-16",
      type_name: "تعليمي"
    },
    {
      id: 6,
      title_ar: "أذان الفجر من الحرم",
      description_ar: "أذان الفجر المباشر من المسجد الحرام",
      thumbnail_url: "https://i.ytimg.com/vi/dGY1RVobDPU/hqdefault.jpg",
      youtube_id: "dGY1RVobDPU",
      video_url: "https://www.youtube.com/watch?v=dGY1RVobDPU",
      duration: 1320,
      view_count: 540,
      publish_date: "2024-01-15",
      type_name: "أذان"
    },
    {
      id: 7,
      title_ar: "حديث الروح",
      description_ar: "برنامج روحاني يتناول القصص الإيمانية",
      thumbnail_url: "https://i.ytimg.com/vi/qKS9sC3nl_c/hqdefault.jpg",
      youtube_id: "qKS9sC3nl_c",
      video_url: "https://www.youtube.com/watch?v=qKS9sC3nl_c",
      duration: 1680,
      view_count: 480,
      publish_date: "2024-01-14",
      type_name: "برنامج"
    },
    {
      id: 8,
      title_ar: "لقاء مع علماء الأمة",
      description_ar: "حوارات مباشرة مع كبار العلماء",
      thumbnail_url: "https://i.ytimg.com/vi/BOk9o1GpTUo/hqdefault.jpg",
      youtube_id: "BOk9o1GpTUo",
      video_url: "https://www.youtube.com/watch?v=BOk9o1GpTUo",
      duration: 1920,
      view_count: 420,
      publish_date: "2024-01-13",
      type_name: "لقاء"
    }
  ];

  // Static most viewed
  const staticMostViewed = [
    {
      id: 1,
      title_ar: "صلاة التراويح من المسجد الحرام",
      view_count: 1250
    },
    {
      id: 2,
      title_ar: "خطبة الجمعة من مكة المكرمة",
      view_count: 980
    },
    {
      id: 3,
      title_ar: "تلاوة خاشعة للشيخ السديس",
      view_count: 870
    },
    {
      id: 4,
      title_ar: "برنامج في رحاب الحرم",
      view_count: 7600
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (page = 1) => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setFeaturedArticles(staticFeaturedArticles);
      setArticles(staticArticles);
      setVideos(staticVideos);
      setMostViewed(staticMostViewed);
      setVideosPage(1);
      setVideosTotalPages(1);
      setLoading(false);
    }, 300);
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
                <div
                  key="yt-live"
                  role="button"
                  tabIndex={0}
                  aria-label="Play live stream"
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%", // 16:9
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#000",
                  }}
                  onKeyDown={async (ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      ev.currentTarget.click();
                    }
                  }}
                  onClick={async (ev) => {
                    const wrapper = ev.currentTarget;
                    if (wrapper.dataset.started) return; // prevent double init
                    wrapper.dataset.started = "1";

                    const src = "https://media2.streambrothers.com:1936/8122/8122/playlist.m3u8";

                    // Build <video> programmatically
                    const video = document.createElement("video");
                    Object.assign(video, {
                      controls: true,
                      autoplay: true,
                      muted: true,
                      playsInline: true,
                    });
                    Object.assign(video.style, {
                      position: "absolute",
                      inset: "0",
                      width: "100%",
                      height: "100%",
                      // objectFit: "cover",
                      display: "block",
                      background: "#000",
                    });

                    // Replace thumbnail with the player
                    wrapper.innerHTML = "";
                    wrapper.appendChild(video);

                    try {
                      // Safari (native HLS)
                      if (video.canPlayType("application/vnd.apple.mpegurl")) {
                        video.src = src;
                        await video.play().catch(() => { });
                      } else {
                        // Other browsers via hls.js
                        const { default: Hls } = await import("hls.js");
                        if (Hls.isSupported()) {
                          const hls = new Hls();
                          hls.loadSource(src);
                          hls.attachMedia(video);
                        } else {
                          // Last-resort fallback
                          video.src = src;
                          await video.play().catch(() => { });
                        }
                      }
                    } catch { }
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "url('https://makkahlive.net/images/MakkahLiveCover.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "brightness(0.8)",
                    }}
                  />

                  {/* Play button */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 78,
                        height: 78,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        boxShadow: "0 8px 30px rgba(0,0,0,.25)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M8 5v14l11-7z" fill="black" />
                      </svg>
                    </div>

                    {/* LIVE chip (optional) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(255,0,0,0.9)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      Live
                    </div>
                  </div>
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
                    category_name: 'أخبار',
                    category_slug: 'news',
                    is_breaking: 1,
                    view_count: 1242,
                    publish_date: '2025-01-05',
                  },
                  {
                    id: 'channel-4',
                    slug: 'makkah-app-release',
                    title_ar: 'إطلاق تطبيق قناة مكة الجديد',
                    summary_ar: 'تطبيق جديد يتيح متابعة البث المباشر والمحتوى عند الطلب وإشعارات التنبيهات.',
                    image_url: 'https://yt3.googleusercontent.com/nK6NGlAkcQZKCRhS75Xq4UWUl9IhsedhL3vXwoG14wddcC0uw1D4DfyUclaZDr0wp4qLxBVs=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
                    category_name: 'أخبار',
                    category_slug: 'news',
                    is_breaking: 1,
                    view_count: 1422,
                    publish_date: '2025-01-06',
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
                      category_name: 'أخبار',
                      category_slug: 'news',
                      is_breaking: 0,
                      view_count: 1425,
                      publish_date: '2025-01-03',
                    },
                    {
                      id: 'channel-2',
                      slug: 'hajj-season-1446-start',
                      title_ar: 'خصائص البلد الحرام 08 هدى للعالمين | قناة مكة',
                      summary_ar: 'حلقة تتناول أبرز خصائص البلد الحرام ودوره كقيام للناس من منظور شرعي وروحاني.',
                      image_url: 'https://i.ytimg.com/vi/vDs_ab_J96I/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIF4oTjAP&rs=AOn4CLB8oAC6mzG2Z-Y7J6Dfa1Qgyu0vCA',
                      category_name: 'الحج والعمرة',
                      category_slug: 'hajj-umrah',
                      is_breaking: 1,
                      view_count: 456,
                      publish_date: '2025-01-04',
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
