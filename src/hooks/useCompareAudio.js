import { useCallback, useEffect, useRef, useState } from 'react';

const FADE_IN = 0.3;
const FADE_OUT = 0.2;

/**
 * 한 음원을 Web Audio로 재생하면서, 고른 기기에 맞춰 저음을 깎는 고역 통과 필터를 건다.
 * - 자동 재생 없음: play()는 사용자 클릭에서만 호출
 * - 0.3초 페이드인 / 0.2초 페이드아웃
 */
export default function useCompareAudio(src) {
  const audioRef = useRef(null);
  const graphRef = useRef(null);
  const fadeTimer = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      clearTimeout(fadeTimer.current);
      audio.pause();
      graphRef.current?.ctx.close();
      graphRef.current = null;
      audioRef.current = null;
    };
  }, [src]);

  // 재생 중 진행 위치 갱신
  useEffect(() => {
    if (!playing) return undefined;
    let raf = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio && audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const ensureGraph = () => {
    if (graphRef.current) return graphRef.current;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const source = ctx.createMediaElementSource(audioRef.current);
    // 12dB/oct 필터 두 개를 이어 24dB/oct로 저음을 확실히 깎음
    const hp1 = ctx.createBiquadFilter();
    const hp2 = ctx.createBiquadFilter();
    hp1.type = hp2.type = 'highpass';
    hp1.Q.value = hp2.Q.value = 0.707;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    source.connect(hp1).connect(hp2).connect(gain).connect(ctx.destination);
    graphRef.current = { ctx, filters: [hp1, hp2], gain };
    return graphRef.current;
  };

  const play = useCallback(async (cutoff) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearTimeout(fadeTimer.current);
    const { ctx, filters, gain } = ensureGraph();
    if (ctx.state === 'suspended') await ctx.resume();
    const now = ctx.currentTime;
    filters.forEach((f) => f.frequency.setValueAtTime(cutoff, now));
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(1, now + FADE_IN);
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    const graph = graphRef.current;
    setPlaying(false);
    if (!audio || audio.paused) return;
    if (!graph) {
      audio.pause();
      return;
    }
    const now = graph.ctx.currentTime;
    graph.gain.gain.cancelScheduledValues(now);
    graph.gain.gain.setValueAtTime(graph.gain.gain.value, now);
    graph.gain.gain.linearRampToValueAtTime(0, now + FADE_OUT);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => audio.pause(), FADE_OUT * 1000);
  }, []);

  return { playing, progress, play, stop };
}
