import React, { useEffect, useState } from "react";
import "../styles/trending.css";


const TrendingArticles = ({ limit = 4, period = "week" }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static trending videos data
  const staticTrendingVideos = [
    {
      id: 1,
      title_ar: "صلاة التراويح من المسجد الحرام",
      view_count: 1250
    },
    {
      id: 2,
      title_ar: "خطبة الجمعة من مكة المكرمة",
      view_count: 9800
    },
    {
      id: 3,
      title_ar: "تلاوة خاشعة للشيخ السديس",
      view_count: 8700
    },
    {
      id: 4,
      title_ar: "برنامج في رحاب الحرم",
      view_count: 7600
    },
    {
      id: 5,
      title_ar: "مناسك الحج والعمرة",
      view_count: 6500
    },
    {
      id: 6,
      title_ar: "أذان الفجر من الحرم المكي",
      view_count: 5400
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setItems(staticTrendingVideos.slice(0, limit));
      setLoading(false);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, period]);

  return (
    <div className="trending-box">
      <h3 className="trending-title">
        <i className="fa-solid fa-fire"></i> الأكثر مشاهدة
      </h3>

      {loading ? (
        <div className="trending-loading">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <span>جاري التحميل...</span>
        </div>
      ) : (
        <div className="trending-list">
          {items.map((video, idx) => (
            <div key={video.id ?? idx} className="trending-item">
              <span className="rank">{idx + 1}</span>
              <div className="info">
                <div className="title" title={video.title_ar}>{video.title_ar}</div>
                <div className="meta">
                  <i className="fa-regular fa-eye"></i>
                  <span>{video.view_count ?? 0}</span>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && !loading && (
            <div className="trending-empty">لا توجد عناصر حالياً.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingArticles;
