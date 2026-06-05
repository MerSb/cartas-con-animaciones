'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAudio } from '@/hooks/useAudio';
import PixelArt from '@/components/PixelArt';

type Variante = 'sosteniendo' | 'ladrando' | 'corriendo' | 'acariciado';

interface Props {
  variant: Variante;
  onPet?: () => void;
}

const C: Record<string, string> = {
  B: '#C4923B', D: '#5C3A00', E: '#1A1A00', P: '#FF9AAB', W: '#FFFFFF', T: '#E8B06A',
};

const IDLE = [
  '.DPD..DPD.', '.DDDDDDDD.', 'DBBBBBBBBD',
  'DBEWBBEWBD', 'DBBBBBBBBD', 'DBBBEEBBBD',
  'DBBBPPBBBD', 'DBBBBBBBBD', '.DDDDDDDD.',
  '..DBBBBBD.', '..DBBBBBD.', '.DBD..DBD.', '.DD....DD.',
];

const BARK = [
  '.DPD..DPD.', '.DDDDDDDD.', 'DBBBBBBBBD',
  'DBEWBBEWBD', 'DBBBBBBBBD', 'DBBBEEBBBD',
  'DBBPPPPPBD', 'DBBBBBBBBD', '.DDDDDDDD.',
  '..DBBBBBD.', '..DBBBBBD.', '.DBD..DBD.', '.DD....DD.',
];

const RUN = [
  '.DPD..DPD.', '.DDDDDDDD.', 'DBBBBBBBBD',
  'DBEWBBEWBD', 'DBBBBBBBBD', 'DBBBEEBBBD',
  'DBBBPPBBBD', 'DBBBBBBBBD', '.DDDDDDDD.',
  '.DBBBBBBBD', 'DBBD...DBD', '.DD.....DD', '..........',
];

const HEART_C: Record<string, string> = {
  H: '#FF69B4', D: '#FF1493',
};

const HEART = [
  '.HH.HH.', 'HHHHHHH', 'HHHHHHH',
  '.HHHHH.', '..HHH..', '...H...',
];

const P = 12;
const W = 10 * P;
const H = 13 * P;

export default function PerroKawaii({ variant, onPet }: Props) {
  const [showHearts, setShowHearts] = useState(false);
  const { play: playHappy } = useAudio('/sounds/happybark.mp3');

  const handlePet = () => {
    if (variant === 'corriendo') return;
    setShowHearts(true);
    playHappy();
    onPet?.();
    setTimeout(() => setShowHearts(false), 1200);
  };

  const pixels = variant === 'ladrando' ? BARK : variant === 'corriendo' ? RUN : IDLE;

  const animProps =
    variant === 'sosteniendo'
      ? { animate: { y: [0, -10, 0] }, transition: { repeat: Infinity, duration: 2 } }
      : variant === 'ladrando'
      ? { animate: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }, transition: { duration: 0.5 } }
      : variant === 'acariciado'
      ? { animate: { scale: [1, 1.05, 1] }, transition: { repeat: Infinity, duration: 1.5 } }
      : {
          animate: { x: [0, 120, 240, 360, 480, 600], y: [0, -16, 0, -12, 0] },
          transition: { repeat: Infinity, duration: 3, ease: 'linear' as const },
        };

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ width: W, height: H }}
      {...animProps}
      onClick={handlePet}
    >
      <PixelArt pixels={pixels} colors={C} size={P} />

      <AnimatePresence>
        {showHearts &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, x: 0, scale: 0, opacity: 1 }}
              animate={{ y: -60 - i * 12, x: (i - 2) * 22, scale: 1.4, opacity: 0 }}
              transition={{ duration: 1.1 }}
              className="absolute pointer-events-none"
              style={{ left: '50%', top: '30%' }}
            >
              <PixelArt pixels={HEART} colors={HEART_C} size={4} />
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  );
}