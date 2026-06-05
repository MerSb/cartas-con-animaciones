'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAudio } from '@/hooks/useAudio';
import { useAchievements } from '@/hooks/useAchievements';

interface Beso {
  id: number;
  x: number;
  y: number;
}

interface CorazonFlotante {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  tipo: number;
}

interface Props {
  onCerrar: () => void;
}

const PIXEL = { fontFamily: "'Press Start 2P', monospace" } as const;
const EMOJIS = ['💋', '❤️', '💕', '💖', '💗'];

export default function MiniJuegoBesos({ onCerrar }: Props) {
  const [besos, setBesos] = useState<Beso[]>([]);
  const [besosCount, setBesosCount] = useState(0);
  const { desbloquear } = useAchievements();
  const completado = besosCount >= 50;

  const { play: playKiss } = useAudio('/sounds/kisses.mp3');

  const [corazonesFlotantes] = useState<CorazonFlotante[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 92),
      top: Math.floor(Math.random() * 85),
      duration: 1.8 + Math.random() * 1.5,
      delay: Math.random() * 2,
      tipo: i % 5,
    }))
  );

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.4 },
      colors: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FF4081'],
    });
  }, []);

  const agregarBeso = useCallback(
    (e: React.MouseEvent) => {
      if (completado) return;
      playKiss();
      const nuevoBeso: Beso = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setBesos(prev => [...prev, nuevoBeso]);
      setBesosCount(prev => prev + 1);
      setTimeout(() => setBesos(prev => prev.filter(b => b.id !== nuevoBeso.id)), 1400);
    },
    [completado, playKiss]
  );

  useEffect(() => {
    if (besosCount === 1) desbloquear('PRIMER_BESO');
    if (besosCount === 10) triggerConfetti();
    if (besosCount === 50) {
      desbloquear('BESOS_ILIMITADOS');
      triggerConfetti();
    }
  }, [besosCount, desbloquear, triggerConfetti]);

  const porcentaje = Math.min((besosCount / 50) * 100, 100);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ cursor: completado ? 'default' : 'pointer' }}
      onClick={agregarBeso}
    >
      <div className="absolute inset-0 flex flex-col">
        {['#FFB6C1', '#FFAEC0', '#FFA6BB', '#FF9BB5', '#FF90AF', '#FF85A9', '#FF7AA3', '#FF6F9D'].map(
          (c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          )
        )}
      </div>

      <div
        className="fixed top-4 right-4 z-50 flex flex-col gap-2 p-4"
        style={{
          background: 'white',
          border: '4px solid #FFD1DC',
          boxShadow: '4px 4px 0px #FFD1DC',
        }}
      >
        <span style={{ ...PIXEL, fontSize: '11px', color: '#FF69B4' }}>
          💋 {besosCount} / 50
        </span>
        <div
          style={{
            width: 140,
            height: 12,
            background: '#FFE0EC',
            border: '2px solid #FF9AAB',
          }}
        >
          <motion.div
            style={{ height: '100%', background: '#FF69B4' }}
            animate={{ width: `${porcentaje}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence>
        {besos.map(beso => (
          <motion.div
            key={beso.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0, y: -100 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute pointer-events-none text-7xl"
            style={{ left: beso.x - 40, top: beso.y - 40 }}
          >
            💋
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {completado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 100 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 25%, #FF1493 50%, #FFD1DC 75%, #FF69B4 100%)',
              }}
            />

            {corazonesFlotantes.map(c => (
              <motion.div
                key={c.id}
                className="absolute text-5xl pointer-events-none"
                style={{ left: `${c.left}%`, top: `${c.top}%` }}
                animate={{ y: [0, -20, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: c.duration, repeat: Infinity, delay: c.delay }}
              >
                {EMOJIS[c.tipo]}
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="relative z-10 flex flex-col items-center gap-8 p-12 text-center"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '6px solid white',
                boxShadow: '0 0 40px rgba(255,20,147,0.5)',
                maxWidth: 480,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[96px] leading-none"
              >
                💋
              </motion.div>

              <h1
                style={{
                  ...PIXEL,
                  fontSize: '18px',
                  color: 'white',
                  textShadow: '3px 3px 0px #FF1493',
                  lineHeight: 2,
                }}
              >
                Você encheu a carta de amor!
              </h1>

              <p style={{ ...PIXEL, fontSize: '10px', color: 'white', opacity: 0.9 }}>
                50 beijos enviados com todo carinho 💕
              </p>

              <motion.button
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.92 }}
                onClick={e => {
                  e.stopPropagation();
                  onCerrar();
                }}
                style={{
                  ...PIXEL,
                  fontSize: '13px',
                  background: 'white',
                  color: '#FF69B4',
                  border: '6px solid #FF1493',
                  padding: '16px 36px',
                  cursor: 'pointer',
                  boxShadow: '6px 6px 0px #FF1493',
                }}
              >
                FECHAR JOGO
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}