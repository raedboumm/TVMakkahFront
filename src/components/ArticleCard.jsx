import React from "react";
import "../styles/articleCard.css";
import logo from "../assets/smallIcon.png"; // keep this path as you have it


const ArticleCard = ({ article, featured = false, index, mostViewed = [] }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("ar-SA");
    };

    /* ---------------------------------------
      ✅ IF SECOND CARD → SHOW MOST VIEWED BOX
    ----------------------------------------*/
    // Re-render when the videos cache updates so descriptions appear once available
    const [__videosCacheVersion, setVideosCacheVersion] = React.useState(0);
    React.useEffect(() => {
        const onUpdate = () => setVideosCacheVersion((v) => v + 1);
        if (typeof window !== 'undefined') window.addEventListener('videosCacheUpdated', onUpdate);
        return () => { if (typeof window !== 'undefined') window.removeEventListener('videosCacheUpdated', onUpdate); };
    }, []);

    if (index === 1) {
        return (
            <div className="most-viewed">
                <h3>   <span className="prayer-logoWrap">
                    <img style={{ width: "70px", height: "70px", filter:"brightness(0)" }} src={logo} alt="makkah logo" />
                </span> الأكثر مشاهدة</h3>

                {mostViewed.length === 0 && (
                    <p className="text-gray-500 text-sm">لا توجد بيانات الآن...</p>
                )}

                {mostViewed.map((item, i) => {
                    const fromCache = (typeof window !== 'undefined' && window.__VIDEOS_BY_ID__) ?
                        (window.__VIDEOS_BY_ID__[item?.id]?.description_ar || window.__VIDEOS_BY_ID__[item?.slug]?.description_ar) : '';
                    const desc = item?.description_ar || item?.summary_ar || fromCache || '—';
                    return (
                        <div key={item.id} className="most-viewed-item">
                            <span className="rank">{i + 1}</span>

                            <div className="text">
                                <p className="title">{item.title_ar}</p>
                                <p
                                    className="desc"
                                    style={{
                                        margin: '2px 0 6px',
                                        color: 'var(--text-muted, #6b7280)',
                                        fontSize: '0.875rem',
                                        lineHeight: 1.35,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {desc}
                                </p>
                                <span className="views">
                                    <i className="far fa-eye"></i> {item.view_count}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }

    /* ---------------------------------------
      ✅ Featured Card
    ----------------------------------------*/
    if (featured) {
        return (
            <div className="relative overflow-hidden rounded-lg shadow-lg card-hover cursor-pointer bg-white self-start">
                <div className="relative h-96">
                    <img src={article.image_url} alt={article.title_ar} className="w-full h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                    {article.is_breaking && (
                        <div className="absolute top-4 right-4">
                            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold breaking-badge">
                                <i className="fas fa-bolt mr-1"></i> عاجل
                            </span>
                        </div>
                    )}

                    <div className="absolute bottom-0 right-0 p-6 z-20 max-w-2xl text-right w-full">
                        {article.category_name && (
                            <span className="inline-block bg-makkah-gold text-makkah-dark px-3 py-1 rounded-full text-sm font-bold mb-3">
                                {article.category_name}
                            </span>
                        )}
                        <h2 className="text-white text-2xl font-bold mb-2">{article.title_ar}</h2>
                        <p className="text-gray-200 mb-3 line-clamp-2">{article.summary_ar}</p>
                        <div className="flex items-center gap-4 text-gray-300 text-sm">
                            <span><i className="far fa-clock mr-1"></i> {formatDate(article.publish_date)}</span>
                            <span><i className="far fa-eye mr-1"></i> {article.view_count} مشاهدة</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ---------------------------------------
      ✅ NORMAL Article Card
    ----------------------------------------*/
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover cursor-pointer">
            <div className="relative">
                <img src={article.image_url} alt={article.title_ar} className="w-full h-48 object-cover" />
                {article.is_breaking && (
                    <div className="absolute top-2 right-2">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold breaking-small">
                            عاجل
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4">
                {article.category_name && (
                    <span className="inline-block bg-makkah-gold text-makkah-dark px-2 py-1 rounded text-xs font-bold mb-2">
                        {article.category_name}
                    </span>
                )}

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{article.title_ar}</h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.summary_ar}</p>

                <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span><i className="far fa-clock mr-1"></i> {formatDate(article.publish_date)}</span>
                    <span><i className="far fa-eye mr-1"></i> {article.view_count}</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
