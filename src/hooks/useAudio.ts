import { Howl } from 'howler';
import { useRef, useCallback } from 'react';

export function useAudio(src: string) {
  const soundRef = useRef<Howl | null>(null);

  const play = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [src],
        volume: 0.6,
        html5: true,
      });
    }
    soundRef.current.play();
  }, [src]);

  const stop = useCallback(() => {
    soundRef.current?.stop();
  }, []);

  return { play, stop };
}