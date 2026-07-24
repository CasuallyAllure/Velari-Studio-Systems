import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const HERO_ASSETS = {
  desktop: {
    video: '/assets/scrollworld/sf-bay-bridge-desktop-hq.mp4',
    poster: '/assets/scrollworld/sf-bay-bridge-desktop-hq-poster.jpg',
  },
  mobile: {
    video: '/assets/scrollworld/sf-bay-bridge-mobile-hq.mp4',
    poster: '/assets/scrollworld/sf-bay-bridge-mobile-hq-poster.jpg',
  },
} as const;

const beats = [
  {
    start: 0,
    end: 0.23,
    eyebrow: 'Velari Systems · San Francisco',
    title: 'We build websites',
    em: 'that feel unmistakably yours.',
    bodyLabel: 'Website design & development',
    body: 'Beautiful design, thoughtful motion, and a clear path for people to reach you—built around the character of your business.',
    align: 'right',
  },
  {
    start: 0.23,
    end: 0.45,
    eyebrow: 'Brand identity · from the ground up',
    title: 'Build more than',
    em: 'a logo.',
    bodyLabel: 'Complete brand identity',
    body: 'We can shape the whole brand—identity, logo system, color, typography, voice, and the guidelines that keep every touchpoint unmistakably yours.',
    align: 'left',
  },
  {
    start: 0.45,
    end: 0.66,
    eyebrow: 'Original photography · creative direction',
    title: 'Attention becomes',
    em: 'momentum.',
    bodyLabel: 'Photography & creative',
    body: 'From products and spaces to team portraits and campaign imagery, we create an original visual library for the business—not another page built from stock.',
    align: 'right',
  },
  {
    start: 0.66,
    end: 1.01,
    eyebrow: 'Website · intake · integrations',
    title: 'Build the site',
    em: 'people remember.',
    bodyLabel: 'Digital systems',
    body: 'Start with a beautiful landing page, then add the forms, ordering, payments, AI, automation, and integrations that make the business easier to reach and run.',
    align: 'left',
  },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgress = useRef(0);
  const pendingSeek = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [heroAsset, setHeroAsset] = useState(() =>
    window.matchMedia('(max-width: 767px)').matches ? HERO_ASSETS.mobile : HERO_ASSETS.desktop,
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const selectAsset = () => setHeroAsset(media.matches ? HERO_ASSETS.mobile : HERO_ASSETS.desktop);
    selectAsset();
    media.addEventListener('change', selectAsset);
    return () => media.removeEventListener('change', selectAsset);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const controller = new AbortController();
    let objectUrl: string | undefined;

    const loadSeekableVideo = async () => {
      setReady(false);
      setVideoSrc(undefined);

      try {
        const response = await fetch(heroAsset.video, { signal: controller.signal });
        if (!response.ok) throw new Error(`Hero video request failed: ${response.status}`);

        objectUrl = URL.createObjectURL(await response.blob());
        setVideoSrc(objectUrl);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn('Falling back to the hosted hero video.', error);
          setVideoSrc(heroAsset.video);
        }
      }
    };

    void loadSeekableVideo();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [heroAsset.video, reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || reducedMotion) return;

    const seekTo = (time: number) => {
      if (video.seeking) {
        pendingSeek.current = time;
        return;
      }

      if (Math.abs(video.currentTime - time) > 0.025) {
        video.currentTime = time;
      }
    };

    const sync = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      targetProgress.current = clamp(-rect.top / scrollable);
      setProgress((previous) =>
        Math.abs(previous - targetProgress.current) > 0.001 ? targetProgress.current : previous,
      );

      if (Number.isFinite(video.duration) && video.duration > 0) {
        const targetTime = targetProgress.current * Math.max(0, video.duration - 0.04);
        seekTo(targetTime);
      }
    };

    let animationFrame = 0;
    const requestSync = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        sync();
      });
    };

    const onMetadata = () => {
      requestSync();
    };

    const onSeeked = () => {
      const nextTime = pendingSeek.current;
      pendingSeek.current = null;
      if (nextTime !== null) seekTo(nextTime);
    };

    const primeForIOS = () => {
      const playAttempt = video.play();
      if (playAttempt) {
        void playAttempt.then(() => {
          video.pause();
          requestSync();
        }).catch(() => undefined);
      }
    };

    let lastViewportWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastViewportWidth) return;
      lastViewportWidth = window.innerWidth;
      requestSync();
    };

    const onLoadedData = () => {
      setReady(true);
      requestSync();
    };

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('seeked', onSeeked);
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('touchstart', primeForIOS, { passive: true, once: true });
    if (video.readyState >= 2) onLoadedData();
    else if (video.readyState >= 1) onMetadata();
    else requestSync();

    return () => {
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('touchstart', primeForIOS);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion, videoSrc]);

  const activeBeat = reducedMotion
    ? beats.length - 1
    : beats.findIndex((beat) => progress >= beat.start && progress < beat.end);

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fogStyle = {
    '--fog-density': `${0.4 + Math.sin(progress * Math.PI) * 0.2}`,
    '--fog-far-x': `${-5 + progress * 11}%`,
    '--fog-mid-x': `${10 - progress * 24}%`,
    '--fog-near-x': `${-14 + progress * 34}%`,
    '--fog-near-y': `${1 + progress * 5}%`,
    '--fog-near-scale': `${1.02 + progress * 0.2}`,
  } as CSSProperties;

  return (
    <section ref={sectionRef} id="hero" className="scrollworld" aria-label="Velari cinematic introduction">
      <div className="scrollworld__sticky">
        <div className="scrollworld__media" aria-hidden="true">
          <video
            ref={videoRef}
            className={`scrollworld__video ${ready ? 'is-ready' : ''}`}
            src={videoSrc}
            poster={heroAsset.poster}
            muted
            playsInline
            preload="auto"
          />
          <div className="scrollworld__fog" style={fogStyle}>
            <i className="scrollworld__fog-layer scrollworld__fog-layer--far" />
            <i className="scrollworld__fog-layer scrollworld__fog-layer--mid" />
            <i className="scrollworld__fog-layer scrollworld__fog-layer--near" />
          </div>
          <div className="scrollworld__vignette" />
          <div className="scrollworld__grain" />
        </div>

        <div className="scrollworld__copy" aria-live="polite">
          {beats.map((beat, index) => (
            <div
              key={beat.title}
              className={`scrollworld__beat scrollworld__beat--${beat.align} ${activeBeat === index ? 'is-active' : ''}`}
              aria-hidden={activeBeat !== index}
            >
              <p className="scrollworld__eyebrow">{beat.eyebrow}</p>
              <h1>
                {beat.title}
                <em>{beat.em}</em>
              </h1>
              <p className="scrollworld__body">
                <span className="scrollworld__body-label">{beat.bodyLabel}</span>
                {beat.body}
              </p>
              {index === beats.length - 1 && (
                <button type="button" className="scrollworld__cta" onClick={scrollToPackages}>
                  Build my estimate <ArrowUpRight aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="scrollworld__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>

        {progress < 0.07 && (
          <div className="scrollworld__hint" aria-hidden="true">
            <ArrowDown /> Scroll to enter
          </div>
        )}
      </div>
    </section>
  );
}
