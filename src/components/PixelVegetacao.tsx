'use client';

import { motion } from 'framer-motion';
import PixelArt from '@/components/PixelArt';

const ARVORE = [
  '....GG....',
  '...GGG....',
  '...GGG....',
  '..GGGGG...',
  '..GGGGG...',
  '.GGGGGGG..',
  '.GGGGGGG..',
  'GGGGGGGGG.',
  'GGGGGGGGG.',
  '....TT....',
  '....TT....',
  '....TT....',
  '....TT....',
  '....TT....',
];

const ARVORE_CORES: Record<string, string> = {
  G: '#2E7D32',
  T: '#8B5A2B',
};

const ARBUSTO = [
  '..VV..',
  '.VVVV.',
  'VVVVVV',
  'VVVVVV',
  '.VVVV.',
  '..VV..',
];

const ARBUSTO_CORES: Record<string, string> = {
  V: '#388E3C',
};

interface Props {
  tipo: 'arvore' | 'arbusto';
  x: number;
  y: number;
  delay?: number;
}

export default function PixelVegetacao({ tipo, x, y, delay = 0 }: Props) {
  const pixels = tipo === 'arvore' ? ARVORE : ARBUSTO;
  const cores = tipo === 'arvore' ? ARVORE_CORES : ARBUSTO_CORES;
  const size = tipo === 'arvore' ? 8 : 7;

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, bottom: `${y}px` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <PixelArt pixels={pixels} colors={cores} size={size} />
    </motion.div>
  );
}