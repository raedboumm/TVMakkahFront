import React from "react";
import "../styles/live.css";

const LivePage = () => {
    return (
        <div className="live-page">
            <div className="live-container">
                <div className="live-box">
                    {/* ✅ Header Bar */}
                    <div className="live-header">
                        <div className="live-title">
                            <span className="live-dot"></span>
                            <h1>البث المباشر - قناة مكة</h1>
                        </div>
                        <span className="live-badge">مباشر</span>
                    </div>

                    {/* ✅ Video Embed */}
                    <div className="video-wrapper">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/kngG3NR42Xw"
                            title="Makkah Live Stream"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>



                    </div>

                    {/* ✅ Description */}
                    <div className="live-content">
                        <h2>البث المباشر من المسجد الحرام</h2>
                        <p>
                            شاهد البث المباشر على مدار الساعة من المسجد الحرام في مكة المكرمة.
                            متابعة الصلوات الخمس والشعائر الدينية مباشرة.
                        </p>

                        <div className="live-info">
                            <div className="info-item">
                                <i className="fas fa-users"></i>
                                <span>12,453 مشاهد حالياً</span>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-clock"></i>
                                <span>بث مباشر 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LivePage;
