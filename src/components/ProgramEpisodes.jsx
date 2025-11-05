import React, { useState, useEffect, useMemo } from "react";
import "../styles//ProgramEpisodes.css";

const ProgramEpisodes = ({ title, episodes = [], pageSize = 4, autoIntervalMs = 5000 }) => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const SLIDE_MS = 450;

  const safeEpisodes = useMemo(() => (Array.isArray(episodes) ? episodes.filter(Boolean) : []), [episodes]);
  const len = safeEpisodes.length;

  const makeWindow = (start) => {
    const src = safeEpisodes;
    const l = src.length;
    if (l === 0) return [];
    if (l <= pageSize) return src;
    const items = [];
    for (let i = 0; i < pageSize; i++) items.push(src[(start + i) % l]);
    return items;
  };

  const currItems = useMemo(() => makeWindow(index), [index, pageSize, safeEpisodes]);

  useEffect(() => {
    setIndex((i) => (len === 0 ? 0 : Math.min(Math.max(0, i), len - 1)));
  }, [len]);

  useEffect(() => {
    // Auto-advance the window by 1 every interval
    if (len <= 1 || autoIntervalMs <= 0) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % len;
        setPrevIndex(i);
        setIsSliding(true);
        return next;
      });
    }, autoIntervalMs);
    return () => clearInterval(id);
  }, [len, autoIntervalMs]);

  useEffect(() => {
    if (!isSliding) return;
    const t = setTimeout(() => setIsSliding(false), SLIDE_MS);
    return () => clearTimeout(t);
  }, [isSliding]);

  return (
    <div className="episodes-wrapper">
      <h2 className="section-title">  <span className="title-bar"></span>{title}</h2>

      <div className="episodes-grid">
        {currItems.map((ep, i) => (
          <a
            key={i}
            className="episode-card"
            href={ep.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="episode-image">
              <img className="poster" src={ep.imagePoster || ep.image} alt={ep.program} loading="lazy" />
              <img className="wide" src={ep.imageWide || ep.image} alt={ep.program} loading="lazy" />
            </div>

            <div className="episode-hover">
              <h3 className="ep-program">{ep.program}</h3>
              <p className="ep-title">{ep.episode}</p>
              <p className="ep-time">{ep.time}</p>

              <div className="ep-actions">
                <button className="ep-btn primary">
                  <i className="fas fa-play"></i> مشاهدة
                </button>
              </div>
            </div>

          </a>
        ))}
      </div>

      <div
        className="episodes-pagination dots"
        style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: '1rem' }}
      >
        {Array.from({ length: len }, (_, i) => (
          <button
            key={i}
            aria-label={`العنصر ${i + 1}`}
            onClick={() => {
              if (i === index) return;
              setPrevIndex(index);
              setIsSliding(true);
              setIndex(i);
            }}
            style={{
              width: i === index ? 12 : 10,
              height: i === index ? 12 : 10,
              borderRadius: '50%',
              border: '0',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: i === index ? '#222' : '#c8c8c8',
              opacity: i === index ? 1 : 0.6,
              transition: 'opacity 0.2s ease, background-color 0.2s ease, width 0.2s ease, height 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramEpisodes;
