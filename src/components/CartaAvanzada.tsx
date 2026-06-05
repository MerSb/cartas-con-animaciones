'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAudio } from '@/hooks/useAudio';

interface Props {
  onClick: () => void;
  estaCerrada: boolean;
  abriendo?: boolean;
}

const P = 10;
const CW = 24;
const CH = 18;

const SVG_W = CW * P;
const SVG_H = CH * P;

const BORDER = '#7B4F0A';
const CREAM = '#FFF5BA';
const LINING = '#FFE5CC';
const SEAL_BG = '#FF9AAB';
const HEART_PX = '#FF1493';

const HEART_PATTERN = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
];

type Cell = { x: number; y: number; fill: string };

function buildEnvelope(cerrada: boolean): Cell[] {
  const cells: Cell[] = [];

  for (let r = 0; r < CH; r++) {
    for (let c = 0; c < CW; c++) {
      if (r === 0 || r === CH - 1 || c === 0 || c === CW - 1) {
        cells.push({ x: c * P, y: r * P, fill: BORDER });
        continue;
      }

      if (cerrada && r >= 1 && r <= 11 && (c === r || c === CW - 1 - r)) {
        cells.push({ x: c * P, y: r * P, fill: BORDER });
        continue;
      }

      if (!cerrada && r <= 4) {
        cells.push({ x: c * P, y: r * P, fill: LINING });
        continue;
      }

      cells.push({ x: c * P, y: r * P, fill: CREAM });
    }
  }

  if (cerrada) {
    const ovalCells: [number, number][] = [
      [9,12],[10,12],[11,12],[12,12],[13,12],[14,12],
      [8,13],[9,13],[10,13],[11,13],[12,13],[13,13],[14,13],[15,13],
      [8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[14,14],[15,14],
      [8,15],[9,15],[10,15],[11,15],[12,15],[13,15],[14,15],[15,15],
      [8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],[15,16],
      [9,17],[10,17],[11,17],[12,17],[13,17],[14,17],
    ];
    ovalCells.forEach(([col, row]) => {
      if (row < CH - 1) cells.push({ x: col * P, y: row * P, fill: SEAL_BG });
    });

    HEART_PATTERN.forEach((row, ry) => {
      row.forEach((on, rx) => {
        if (on) cells.push({ x: (9 + rx) * P, y: (13 + ry) * P, fill: HEART_PX });
      });
    });
  }

  return cells;
}

function EnvelopeSVG({ cerrada }: { cerrada: boolean }) {
  const cells = buildEnvelope(cerrada);
  return (
    <svg
      width={SVG_W}
      height={SVG_H}
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {cells.map(({ x, y, fill }, i) => (
        <rect key={i} x={x} y={y} width={P} height={P} fill={fill} />
      ))}
    </svg>
  );
}

export default function CartaAvanzada({ onClick, estaCerrada, abriendo }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { play: playLetter } = useAudio('/sounds/letter.mp3');

  const handleClick = () => {
    if (estaCerrada) {
      playLetter();
      onClick();
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ width: SVG_W, height: SVG_H }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      animate={{ y: isHovered && estaCerrada ? -6 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotateX: abriendo ? -180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: 'top' }}
      >
        <EnvelopeSVG cerrada={estaCerrada} />
      </motion.div>

      {estaCerrada && (
        <motion.p
          className="absolute -bottom-8 left-0 right-0 text-center"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '8px',
            color: '#c06080',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Clique para abrir!
        </motion.p>
      )}
    </motion.div>
  );
}
