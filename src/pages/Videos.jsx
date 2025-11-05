import React, { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import "../styles/videos.css";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const res = await api.get("/videos?limit=12");
    if (res.success) setVideos(res.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loader-page">
        <i className="fas fa-spinner fa-spin"></i>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="videos-page">
      <div className="page-container">
        <h1 className="page-title">
          <i className="fas fa-play-circle"></i> الفيديوهات
        </h1>

        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
