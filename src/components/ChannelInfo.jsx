import React from "react";
import "../styles/ChannelInfo.css";

const ChannelInfo = () => {
  return (
    <div className="channelInfo-box">
      <h3 className="channelInfo-title"> ترددات قناة مكة</h3>

      <div className="channelInfo-grid">
        <div className="channelInfo-item">
          <span className="channelInfo-label">القمر</span>
          <span className="channelInfo-value">نايلسات</span>
        </div>

        <div className="channelInfo-item">
          <span className="channelInfo-label">التردد</span>
          <span className="channelInfo-value">12399</span>
        </div>

        <div className="channelInfo-item">
          <span className="channelInfo-label">الاستقطاب</span>
          <span className="channelInfo-value">رأسي</span>
        </div>

        <div className="channelInfo-item">
          <span className="channelInfo-label">الترميز</span>
          <span className="channelInfo-value">27500</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
