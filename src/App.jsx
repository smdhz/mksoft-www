import { useEffect, useRef, useState } from 'react';
import { copy, detectLang, rememberLang } from './i18n.js';

// 在路上的照片，按顺序加在这里即可
const ROAD_PHOTOS = ['/img/road-01.jpg'];

// 滚动进度 → 当前第几项
function useScrollIndex(n) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(0.9999, Math.max(0, -r.top / span));
      setIndex(Math.floor(p * n));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);
  return [ref, index];
}

const on = (cond, base = 'layer') => (cond ? `${base} on` : base);
const pad = (x) => String(x).padStart(2, '0');

export default function App() {
  const [lang, setLang] = useState(detectLang);
  const t = copy[lang];

  // 语言变化时同步网址、<html lang>、标题描述
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = 'Monkeysoft';
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description);
    if (location.pathname !== t.path) history.replaceState(null, '', t.path + location.hash);
  }, [lang, t]);

  const switchTo = (next) => (e) => {
    e.preventDefault();
    rememberLang(next);
    setLang(next);
  };

  const [roadRef, roadIdx] = useScrollIndex(ROAD_PHOTOS.length);
  const [lineRef, lineIdx] = useScrollIndex(t.services.length);

  return (
    <>
      <main className="route">
        <section className="hero" id="top">
          <div className="bg" aria-hidden="true"><img src="/img/road.jpg" alt="" /></div>
          <div className="wrap">
            <div className="stop">
              <h1 className="brand">Monkeysoft<span>.</span></h1>
              <p className="slogan">
                {t.slogan[0]}{t.slogan[1] && <span className="dim">{t.slogan[1]}</span>}{t.slogan[2]}
              </p>
              <p className="sub">{t.sub}<small>{t.subSmall}</small></p>
              <div className="status"><i aria-hidden="true"></i>MKSOFT.UK · ONLINE</div>
            </div>
          </div>
        </section>

        <section className="scrolly" id="road" ref={roadRef} style={{ '--n': ROAD_PHOTOS.length }}>
          <div className="stage">
            <div className="bgs" aria-hidden="true">
              {ROAD_PHOTOS.map((src, i) => (
                <div key={src} className={on(i === roadIdx)}><img src={src} alt="" /></div>
              ))}
            </div>
            <div className="wrap"><div className="copy">
              <div className="stop"><p className="eyebrow">On the road</p><h2>{t.road.title}</h2></div>
              <p className="lede">{t.road.lede}</p>
              <div className="caps">
                <div className="layer on">
                  <div className="count"><b>{pad(roadIdx + 1)}</b> / {pad(ROAD_PHOTOS.length)}</div>
                </div>
              </div>
              <div className="ticks" aria-hidden="true">
                {ROAD_PHOTOS.map((src, i) => <i key={src} className={i === roadIdx ? 'on' : ''}></i>)}
              </div>
            </div></div>
          </div>
        </section>

        <section className="scrolly" id="line" ref={lineRef} style={{ '--n': t.services.length }}>
          <div className="stage">
            <div className="bgs" aria-hidden="true">
              <div className="layer on"><img src="/img/line-wide.jpg" alt="" /></div>
            </div>
            <div className="wrap"><div className="copy">
              <div className="stop"><p className="eyebrow">On the line</p><h2>{t.line.title}</h2></div>
              <p className="lede">{t.line.lede}</p>
              <ul className="svc-index" aria-hidden="true">
                {t.services.map((s, i) => <li key={s.tag} className={i === lineIdx ? 'on' : ''}>{s.tag}</li>)}
              </ul>
              <div className="svc" aria-live="polite">
                {t.services.map((s, i) => (
                  <div key={s.tag} className={on(i === lineIdx)}><h3>{s.name}</h3><p>{s.text}</p></div>
                ))}
              </div>
            </div></div>
          </div>
        </section>

        <section className="coda">
          <div className="wrap">
            <div className="stop"><p>{t.coda[0]}<br />{t.coda[1]}</p></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© Monkeysoft · www.mksoft.uk</span>
          <nav className="langs" aria-label="Language">
            {['zh', 'ja'].map((l) => (
              <a key={l} href={copy[l].path} lang={copy[l].htmlLang}
                 aria-current={l === lang ? 'true' : undefined} onClick={switchTo(l)}>
                {copy[l].label}
              </a>
            ))}
          </nav>
          <a href="#top">{t.top}</a>
        </div>
      </footer>
    </>
  );
}
