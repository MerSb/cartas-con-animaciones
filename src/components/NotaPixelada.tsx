'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PixelArt from '@/components/PixelArt';

interface Props {
  mensajeFijo: string;
  onCerrar: () => void;
  onVolver: () => void;
}

const PIXEL = { fontFamily: "'Press Start 2P', monospace" } as const;

const SELLO = [
  '.SSSSSS.',
  'SSSSSSSS',
  'SH.HH.SS',
  'SHHHHSSS',
  'S.HHH.SS',
  'S..H..SS',
  'SSSSSSSS',
  '.SSSSSS.',
];

const SELLO_C: Record<string, string> = {
  S: '#FF9AAB',
  H: '#FF1493',
};

export default function NotaPixelada({ mensajeFijo, onCerrar, onVolver }: Props) {
  const [saliendo, setSaliendo] = useState(false);

  const handleCerrar = () => {
    setSaliendo(true);
    setTimeout(onCerrar, 500);
  };

  const handleVolver = () => {
    setSaliendo(true);
    setTimeout(onVolver, 500);
  };

  return (
    <motion.div
      className="relative flex flex-col gap-6 p-8"
      style={{
        width: 520,
        maxWidth: '95vw',
        background: '#FFF5BA',
        border: '8px solid #FFDAB9',
        boxShadow: '8px 8px 0px #FFDAB9',
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: saliendo ? 0 : 1, rotate: saliendo ? 180 : 0 }}
      transition={{ type: 'spring', duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-5 h-5" style={{ background: '#FFDAB9' }} />
      <div className="absolute top-0 right-0 w-5 h-5" style={{ background: '#FFDAB9' }} />
      <div className="absolute bottom-0 left-0 w-5 h-5" style={{ background: '#FFDAB9' }} />
      <div className="absolute bottom-0 right-0 w-5 h-5" style={{ background: '#FFDAB9' }} />

      <h2
        className="text-center"
        style={{ ...PIXEL, fontSize: '13px', color: '#c06080', letterSpacing: 1 }}
      >
        ~ Para você ~
      </h2>

      <div
        className="relative p-5 overflow-y-auto"
        style={{
          background: 'white',
          border: '3px solid #FFDAB9',
          minHeight: 200,
          maxHeight: 260,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{ top: 24 + i * 28, height: 1, background: '#FFE5CC', opacity: 0.7 }}
          />
        ))}
        <p
          className="relative z-10 whitespace-pre-line leading-loose"
          style={{ ...PIXEL, fontSize: '10px', color: '#555', lineHeight: 2.5 }}
        >
          {mensajeFijo}
        </p>
      </div>

      <div className="flex justify-center">
        <PixelArt pixels={SELLO} colors={SELLO_C} size={5} />
      </div>

      <div className="flex justify-between items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleVolver}
          style={{
            ...PIXEL,
            fontSize: '9px',
            background: '#AEC6CF',
            color: 'white',
            border: '4px solid #7BA7B5',
            padding: '10px 16px',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px #7BA7B5',
          }}
        >
          ← Voltar
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleCerrar}
          style={{
            ...PIXEL,
            fontSize: '9px',
            background: '#FFD1DC',
            color: 'white',
            border: '4px solid #FF9AAB',
            padding: '10px 16px',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px #FF9AAB',
          }}
        >
          Fechar carta 💕
        </motion.button>
      </div>
    </motion.div>
  );
}
