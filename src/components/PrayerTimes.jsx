import React from "react";
import "../styles/prayerTimes.css";
import logo from "../assets/smallIcon.png"; // keep this path as you have it


const PrayerTimes = () => {
  const times = [
    { name: "الفجر", time: "05:15" },
    { name: "الشروق", time: "06:30" },
    { name: "الظهر", time: "12:15" },
    { name: "العصر", time: "15:45" },
    { name: "المغرب", time: "18:30" },
    { name: "العشاء", time: "20:00" },
  ];

  return (
    <div className="prayer-box">
      <h3 className="prayer-title">
        <span className="prayer-logoWrap">
          <img style={{ width: "70px", height: "70px" }} src={logo} alt="makkah logo" />
        </span>
        مواقيت الصلاة بمكة المكرمة
      </h3>
      <table className="prayer-table">
        <tbody>
          {times.map((row, index) => (
            <tr key={index}>
              <td className="prayer-name">{row.name}</td>
              <td className="prayer-time">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimes;
