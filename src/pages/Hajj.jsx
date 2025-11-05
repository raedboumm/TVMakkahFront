import React, { useEffect, useState } from "react";
import api from "../services/api";
import ArticleCard from "../components/ArticleCard";
import VideoCard from "../components/VideoCard";
import "../styles/hajj.css"; // ✅ New CSS file

const HajjPage = () => {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const articlesRes = await api.get("/articles?category=hajj-umrah&limit=6");
            if (articlesRes?.success) setArticles(articlesRes.data ?? []);
            else setArticles([]);

            const videosRes = await api.get("/videos?category=hajj-umrah&limit=4");
            if (videosRes?.success) setVideos(videosRes.data ?? []);
            else setVideos([]);
        } catch (err) {
            console.error("loadData error:", err);
            setArticles([]);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <i className="fas fa-spinner fa-spin text-4xl text-makkah-gold"></i>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* ✅ Hero Section */}
            <div className="hajj-hero hero-gradient text-white py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <i className="fas fa-kaaba text-6xl text-makkah-gold mb-4"></i>
                    <h1 className="text-4xl font-bold mb-4">الحج والعمرة</h1>
                    <p className="text-xl text-gray-300">
                        كل ما يتعلق بالحج والعمرة من أخبار وإرشادات ومناسك
                    </p>
                </div>
            </div>

            {/* ✅ Content Section */}
            <div className="container mx-auto px-4 pb-12">
                {/* Articles */}
                <h2 className="section-title flex items-center gap-2">
                    <div className="w-1 h-8 bg-makkah-gold"></div>
                    أخبار الحج والعمرة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Videos */}
                <h2 className="section-title flex items-center gap-2">
                    <div className="w-1 h-8 bg-makkah-gold"></div>
                    فيديوهات الحج والعمرة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HajjPage;
