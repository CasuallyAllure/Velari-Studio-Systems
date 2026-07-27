import { useEffect, useRef, useState } from 'react';

const DESKTOP_VIDEO = '/assets/services-orbit/video/orbit-carousel-scroll-1080.mp4';
const MOBILE_VIDEO = '/assets/services-orbit/video/orbit-carousel-scroll-mobile.mp4';
const POSTER = '/assets/services-orbit/video/orbit-carousel-poster.jpg';

const chapters = [
  'Brand systems',
  'Websites',
  'Photography + creative',
  'Portals + ordering',
  'AI intake + reception',
  'Automation + integrations',
];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function WhatWeBuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pendingTimeRef = useRef<number | null>(null);
  const [videoSource, setVideoSource] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const chapterIndex = Math.min(
    chapters.length - 1,
    Math.floor(progress * chapters.length),
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 820px), (pointer: coarse)');
    const controller = new AbortController();
    let objectUrl = '';

    const loadVideo = async () => {
      const file = mobileQuery.matches ? MOBILE_VIDEO : DESKTOP_VIDEO;

      try {
        const response = await fetch(file, { signal: controller.signal });
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        objectUrl = URL.createObjectURL(await response.blob());
        setVideoSource(objectUrl);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setVideoSource(file);
      }
    };

    void loadVideo();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !videoSource) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let duration = 12;
    let latestProgress = 0;

    const timeForProgress = (nextProgress: number) => {
      // Animos exports this sequence as a loop. Traversing it backward gives the
      // intentional service order and lets the section finish on Automation.
      const startTime = Math.min(11.9, Math.max(0, duration - 0.1));
      const endTime = Math.min(2.05, Math.max(0, duration - 0.1));
      return startTime + (endTime - startTime) * nextProgress;
    };

    const seekToProgress = (nextProgress: number) => {
      const targetTime = timeForProgress(nextProgress);

      if (video.seeking) {
        pendingTimeRef.current = targetTime;
        return;
      }

      if (Math.abs(video.currentTime - targetTime) > 0.025) {
        video.currentTime = targetTime;
      }
    };

    const render = () => {
      animationFrameRef.current = null;
      setProgress((previous) =>
        Math.abs(previous - latestProgress) > 0.002 ? latestProgress : previous,
      );
      seekToProgress(latestProgress);
    };

    const measure = () => {
      if (reducedMotion.matches) {
        latestProgress = 0;
      } else {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, section.offsetHeight - window.innerHeight);
        latestProgress = clamp(-rect.top / travel);
      }

      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(render);
      }
    };

    const handleMetadata = () => {
      if (Number.isFinite(video.duration)) duration = video.duration;
      seekToProgress(latestProgress);
    };

    const handleSeeked = () => {
      const pendingTime = pendingTimeRef.current;
      if (pendingTime === null) return;
      pendingTimeRef.current = null;

      if (Math.abs(video.currentTime - pendingTime) > 0.025) {
        video.currentTime = pendingTime;
      }
    };

    const primeVideo = () => {
      const playAttempt = video.play();
      if (playAttempt) {
        void playAttempt
          .then(() => video.pause())
          .catch(() => undefined);
      }
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('pointerdown', primeVideo, { once: true, passive: true });
    window.addEventListener('touchstart', primeVideo, { once: true, passive: true });
    measure();

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointerdown', primeVideo);
      window.removeEventListener('touchstart', primeVideo);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [videoSource]);

  const jumpToChapter = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const chapterProgress = index / (chapters.length - 1);

    window.scrollTo({
      top: sectionTop + travel * chapterProgress,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="what-we-build"
      className="services-orbit"
      aria-labelledby="services-orbit-title"
    >
      <h2 id="services-orbit-title" className="services-orbit__sr-only">
        What Velari builds
      </h2>

      <div className="services-orbit__sticky">
        <div className="services-orbit__backdrop" aria-hidden="true" />
        <div className="services-orbit__vignette" aria-hidden="true" />

        <div className="services-orbit__topline">
          <p>Velari · Full-service digital studio</p>
          <p>
            <span>{String(chapterIndex + 1).padStart(2, '0')}</span>
            {' / '}
            {String(chapters.length).padStart(2, '0')}
          </p>
        </div>

        <div className={`services-orbit__stage${isReady ? ' is-ready' : ''}`}>
          <img src={POSTER} alt="" className="services-orbit__poster" />
          {videoSource && (
            <video
              ref={videoRef}
              className="services-orbit__video"
              src={videoSource}
              poster={POSTER}
              preload="auto"
              muted
              playsInline
              aria-label="A rotating showcase of Velari brand, website, photography, portal, AI reception, and automation services"
              onLoadedData={() => setIsReady(true)}
            />
          )}
        </div>

        <div className="services-orbit__navigation">
          <p className="services-orbit__active-title" aria-live="polite">
            {chapters[chapterIndex]}
          </p>

          <div
            className="services-orbit__progress"
            role="progressbar"
            aria-label="Service showcase progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>

          <ol>
            {chapters.map((chapter, index) => (
              <li key={chapter}>
                <button
                  type="button"
                  className={index === chapterIndex ? 'is-active' : ''}
                  onClick={() => jumpToChapter(index)}
                  aria-label={`View ${chapter}`}
                  aria-current={index === chapterIndex ? 'step' : undefined}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{chapter}</small>
                </button>
              </li>
            ))}
          </ol>

          <p className="services-orbit__cue">
            {progress > 0.94 ? 'Continue to packages' : 'Scroll to explore'}
            <span aria-hidden="true">↓</span>
          </p>
        </div>
      </div>
    </section>
  );
}
