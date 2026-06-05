'use client';

import { motion } from 'framer-motion';
import PixelArt from '@/components/PixelArt';

interface Props {
  x: number;
  y: number;
  tipo: 'cascara' | 'yema';
  delay: number;
  duration: number;
}

const CASCARA = [
  '.DDDDD.',
  'DWWWWWD',
  'DWWWWWD',
  'DWWWWWD',
  'DWWWWWD',
  'DWWWWWD',
  '.DDDDD.',
];

const HUEVO_YEMA = [
  '.DDDDD.',
  'DWWWWWD',
  'DWOOWWD',
  'DWOOWWD',
  'DWOOWWD',
  'DWWWWWD',
  '.DDDDD.',
];

const CORES: Record<string, string> = {
  D: '#D2B48C',
  W: '#FFF8DC',
  O: '#FFA500',
};

export default function CascaraHuevo({ x, y, tipo, delay, duration }: Props) {
  const pixels = tipo === 'cascara' ? CASCARA : HUEVO_YEMA;
  const size = 6;

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        delay,
      }}
    >
      <PixelArt pixels={pixels} colors={CORES} size={size} />
    </motion.div>
  );
}