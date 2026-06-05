'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PixelArt from '@/components/PixelArt';

interface Props {
  visible: boolean;
  onSi: () => void;
  onNo: () => void;
}

const PIXEL = { fontFamily: "'Press Start 2P', monospace" } as const;

const CORACAO = [
  '.HH.HH.',
  'HHHHHHH',
  'HHHHHHH',
  '.HHHHH.',
  '..HHH..',
  '...H...',
];

const CORACAO_CORES: Record<string, string> = {
  H: '#FF69B4',
};

export default function DialogoJuego({ visible, onSi, onNo }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative flex flex-col items-center gap-8 p-10"
            style={{
              background: '#FFF5BA',
              border: '6px solid #FFD1DC',
              boxShadow: '8px 8px 0px #FFD1DC',
              maxWidth: 420,
              width: '90vw',
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <PixelArt pixels={CORACAO} colors={CORACAO_CORES} size={6} />
            </motion.div>

            <p
              className="text-center leading-relaxed"
              style={{ ...PIXEL, fontSize: '12px', color: '#c06080', lineHeight: 2 }}
            >
              Quer brincar do jogo dos beijos?
            </p>

            <div className="flex gap-6">
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.93 }}
                onClick={onSi}
                style={{
                  ...PIXEL,
                  fontSize: '13px',
                  background: '#FFD1DC',
                  color: 'white',
                  border: '4px solid #FF9AAB',
                  padding: '12px 28px',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px #FF9AAB',
                }}
              >
                SIM 💋
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.93 }}
                onClick={onNo}
                style={{
                  ...PIXEL,
                  fontSize: '13px',
                  background: '#AEC6CF',
                  color: 'white',
                  border: '4px solid #7BA7B5',
                  padding: '12px 28px',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px #7BA7B5',
                }}
              >
                NÃO 🐾
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}