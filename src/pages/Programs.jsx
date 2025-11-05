// ✅ src/pages/ProgramsPage.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/programs.css"; // <-- مهم جداً

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);
    const res = await api.get("/programs");
    if (res.success) setPrograms(res.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <i className="fas fa-spinner fa-spin text-4xl text-makkah-gold"></i>
      </div>
    );
  }

  return (
    <div className="programs-wrapper">
      <div className="container mx-auto px-4 py-12">
        {/* العنوان الرئيسي */}
        <h1 className="programs-title flex items-center gap-3">
          <i className="fas fa-tv"></i>
          برامج قناة مكة
        </h1>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <img
                src={program.image_url}
                alt={program.name_ar}
                className="program-image"
              />

              <div className="program-content">
                <h3 className="program-name">{program.name_ar}</h3>
                <p className="program-description">{program.description_ar}</p>

                <div className="program-meta">
                  <div className="meta-item">
                    <i className="fas fa-clock"></i>
                    <span>{program.schedule_time}</span>
                  </div>

                  {program.presenter_ar && (
                    <div className="meta-item">
                      <i className="fas fa-user"></i>
                      <span>{program.presenter_ar}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
