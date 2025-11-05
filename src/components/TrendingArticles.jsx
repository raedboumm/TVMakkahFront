import React, { useEffect, useState } from "react";
import "../styles/trending.css";
import api from "../services/api";


const TrendingArticles = ({ limit = 4, period = "week" }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      // fetch top videos by view count
      const res = await api.get(`/videos/trending/most-viewed?limit=${limit}`);
      if (res.success) setItems(res.data || []);
    } catch (e) {
      console.error("Trending fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
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
