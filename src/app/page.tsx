'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PerroKawaii from '@/components/PerroKawaii';
import CartaAvanzada from '@/components/CartaAvanzada';
import NotaPixelada from '@/components/NotaPixelada';
import MiniJuegoBesos from '@/components/MiniJuegoBesos';
import CascaraHuevo from '@/components/CascaraHuevo';
import DialogoJuego from '@/components/DialogoJuego';
import PixelFondo from '@/components/PixelFondo';
import PixelArt from '@/components/PixelArt';
import { useAchievements } from '@/hooks/useAchievements';
import { useAudio } from '@/hooks/useAudio';

const INTRO_DOG_C: Record<string, string> = {
  B: '#C4923B', D: '#5C3A00', E: '#1A1A00', P: '#FF9AAB', W: '#FFFFFF',
};
const INTRO_DOG = [
  '.DPD..DPD.', '.DDDDDDDD.', 'DBBBBBBBBD',
  'DBEWBBEWBD', 'DBBBBBBBBD', 'DBBBEEBBBD',
  'DBBBPPBBBD', 'DBBBBBBBBD', '.DDDDDDDD.',
  '..DBBBBBD.', '..DBBBBBD.', '.DBD..DBD.', '.DD....DD.',
];

const INTRO_ENV_C: Record<string, string> = {
  C: '#FFF5BA', D: '#7B4F0A', S: '#FF9AAB', H: '#FF1493',
};

const INTRO_ENV: string[] = (() => {
  const W = 12, H = 9;
  return Array.from({ length: H }, (_, r) =>
    Array.from({ length: W }, (_, c) => {
      if (r === 0 || r === H - 1 || c === 0 || c === W - 1) return 'D';
      if (r <= 4 && (c === r || c === W - 1 - r)) return 'D';
      if (r === 6 && (c === 5 || c === 6)) return 'S';
      if (r === 7 && c === 6) return 'H';
      return 'C';
    }).join('')
  );
})();

type Secuencia = 'inicio' | 'abriendo' | 'nota' | 'dialogo' | 'besos';

type Huevo = {
  x: number;
  y: number;
  tipo: 'cascara' | 'yema';
  delay: number;
  duration: number;
};

function generarHuevos(): Huevo[] {
  return Array.from({ length: 24 }, () => ({
    x: Math.random() * 92,
    y: 40 + Math.random() * 20,
    tipo: Math.random() > 0.5 ? ('cascara' as const) : ('yema' as const),
    delay: Math.random(),
    duration: 2 + Math.random() * 1.5,
  }));
}

const MENSAJE_CARTA = `Oi, Mate🧉! Espero que gostes desse presentinho. Quero que saibas que há alguém por aí que te considera importante e dedicou um tempo para fazer algo especial para ti. Espero que tenhas um ótimo dia e uma vida maravilhosa. Muitos beijos — Tua Mel 💕`;

const PIXEL = { fontFamily: "'Press Start 2P', monospace" } as const;

export default function Home() {
  const [secuencia, setSecuencia] = useState<Secuencia>('inicio');
  const [cartaAbierta, setCartaAbierta] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [huevos, setHuevos] = useState<Huevo[]>([]);
  const [musicaActiva, setMusicaActiva] = useState(true);

  const { desbloquear, isDesbloqueado } = useAchievements();
  const { play: playMusica, stop: stopMusica } = useAudio('/sounds/song.mp3');

  useEffect(() => {
    if (musicaActiva) {
      playMusica();
    } else {
      stopMusica();
    }
    return () => stopMusica();
  }, [musicaActiva, playMusica, stopMusica]);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setHuevos(generarHuevos());
  }, []);

  const resetearAlInicio = () => {
    setSecuencia('inicio');
    setCartaAbierta(false);
    setPetCount(0);
  };

  const handleAbrirCarta = () => {
    setSecuencia('abriendo');
    setTimeout(() => {
      setCartaAbierta(true);
      setSecuencia('nota');
    }, 1000);
  };

  const handleCerrarNota = () => {
    setSecuencia('dialogo');
  };

  const handleSiJuego = () => {
    setSecuencia('besos');
  };

  const handleNoJuego = () => {
    resetearAlInicio();
  };

  const handleCerrarJuego = () => {
    resetearAlInicio();
  };

  const handleVolverAlInicio = () => {
    resetearAlInicio();
  };

  const handlePet = () => {
    const next = petCount + 1;
    setPetCount(next);
    if (next === 10 && !isDesbloqueado('CARICIAS_MAGICAS')) {
      desbloquear('CARICIAS_MAGICAS');
    }
  };

  const toggleMusica = () => {
    setMusicaActiva(!musicaActiva);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <PixelFondo />

      <button
        onClick={toggleMusica}
        className="fixed top-4 left-4 z-30 bg-white/80 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '16px',
          border: '2px solid #FFD1DC',
        }}
      >
        {musicaActiva ? '🔊' : '🔇'}
      </button>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
            style={{ background: '#FFD1DC' }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex gap-4"
            >
              <PixelArt pixels={INTRO_DOG} colors={INTRO_DOG_C} size={7} />
              <PixelArt pixels={INTRO_ENV} colors={INTRO_ENV_C} size={7} />
            </motion.div>
            <p style={{ ...PIXEL, fontSize: '11px', color: '#c06080' }}>
              Carta Kawaii do Cachorrinho
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {huevos.length > 0 && (
        <div className="absolute left-0 right-0 bottom-0 pointer-events-none z-10" style={{ height: '28%' }}>
          {huevos.map((h, i) => (
            <CascaraHuevo
              key={i}
              x={h.x}
              y={h.y}
              tipo={h.tipo}
              delay={h.delay}
              duration={h.duration}
            />
          ))}
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen pb-24 pt-8 px-4">
        <AnimatePresence mode="wait">
          {secuencia === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <PerroKawaii variant="sosteniendo" onPet={handlePet} />
              <CartaAvanzada onClick={handleAbrirCarta} estaCerrada={true} />
              <p style={{ ...PIXEL, fontSize: '9px', color: '#7BA7B5', marginTop: 16 }}>
                🐾 Carícias: {petCount}/10 🐾
              </p>
            </motion.div>
          )}

          {secuencia === 'abriendo' && (
            <motion.div
              key="abriendo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
              <PerroKawaii variant="ladrando" onPet={handlePet} />
              <CartaAvanzada onClick={() => {}} estaCerrada={false} abriendo={true} />
            </motion.div>
          )}

          {secuencia === 'nota' && cartaAbierta && (
            <motion.div
              key="nota"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <NotaPixelada
                mensajeFijo={MENSAJE_CARTA}
                onCerrar={handleCerrarNota}
                onVolver={handleVolverAlInicio}
              />
              <div className="fixed bottom-24 left-0 right-0 pointer-events-none">
                <PerroKawaii variant="corriendo" onPet={handlePet} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogoJuego
          visible={secuencia === 'dialogo'}
          onSi={handleSiJuego}
          onNo={handleNoJuego}
        />

        {secuencia === 'besos' && <MiniJuegoBesos onCerrar={handleCerrarJuego} />}
      </div>
    </main>
  );
}