'use client';

import PixelVegetacao from '@/components/PixelVegetacao';

function Sol() {
  const P = 8;
  const amarillo = '#FFD700';
  const claro = '#FFF5BA';
  const naranja = '#FFAA00';

  const cells: [number, number, string][] = [
    [4, 0, claro], [4, 1, amarillo],
    [4, 7, amarillo], [4, 8, claro],
    [0, 4, claro], [1, 4, amarillo],
    [7, 4, amarillo], [8, 4, claro],
    [1, 1, claro], [2, 2, naranja],
    [6, 1, claro], [7, 2, naranja],
    [1, 7, claro], [2, 6, naranja],
    [6, 7, claro], [7, 6, naranja],
    [3, 2, amarillo], [4, 2, amarillo], [5, 2, amarillo],
    [2, 3, amarillo], [3, 3, claro], [4, 3, claro], [5, 3, claro], [6, 3, amarillo],
    [2, 4, amarillo], [3, 4, claro], [4, 4, claro], [5, 4, claro], [6, 4, amarillo],
    [2, 5, amarillo], [3, 5, claro], [4, 5, claro], [5, 5, claro], [6, 5, amarillo],
    [3, 6, amarillo], [4, 6, amarillo], [5, 6, amarillo],
  ];

  return (
    <svg
      width={9 * P}
      height={9 * P}
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {cells.map(([x, y, color], i) => (
        <rect key={i} x={x * P} y={y * P} width={P} height={P} fill={color} />
      ))}
    </svg>
  );
}

function Nube({ left, top }: { left: number; top: number }) {
  const P = 8;
  const patron = [
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  ];

  return (
    <svg
      width={10 * P}
      height={5 * P}
      style={{ position: 'absolute', left, top, imageRendering: 'pixelated' }}
    >
      {patron.flatMap((row, ry) =>
        row.map((cell, rx) =>
          cell ? (
            <rect
              key={`${rx}-${ry}`}
              x={rx * P}
              y={ry * P}
              width={P}
              height={P}
              fill="white"
              fillOpacity={0.85}
            />
          ) : null
        )
      )}
    </svg>
  );
}

function Pasto() {
  const franjas = [
    { h: 8, color: '#2E7D32' },
    { h: 8, color: '#388E3C' },
    { h: 8, color: '#43A047' },
    { h: 8, color: '#4CAF50' },
    { h: 8, color: '#66BB6A' },
    { h: 8, color: '#81C784' },
    { h: 8, color: '#A5D6A7' },
    { h: 8, color: '#B5EAD7' },
    { h: 8, color: '#C8E6C9' },
    { h: 8, color: '#DCEDC8' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0" style={{ height: 80 }}>
      {franjas.map((f, i) => (
        <div key={i} style={{ height: f.h, background: f.color }} />
      ))}
    </div>
  );
}

function Cielo() {
  const bandas = [
    { h: 48, color: '#9BD4E0' },
    { h: 48, color: '#89CCE0' },
    { h: 48, color: '#7EC8E3' },
    { h: 48, color: '#87CEEB' },
    { h: 48, color: '#8DCFED' },
    { h: 48, color: '#93D0EE' },
    { h: 48, color: '#AEC6CF' },
    { h: 48, color: '#B8CED7' },
  ];

  return (
    <div className="absolute inset-0">
      {bandas.map((b, i) => (
        <div key={i} style={{ height: b.h, background: b.color }} />
      ))}
      <div className="absolute inset-0" style={{ background: '#AEC6CF', zIndex: -1 }} />
    </div>
  );
}

export default function PixelFondo() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Cielo />

      <div className="absolute" style={{ top: 32, right: 80 }}>
        <Sol />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <Nube left={80} top={50} />
        <Nube left={360} top={30} />
        <Nube left={640} top={65} />
        <Nube left={980} top={45} />
        <Nube left={1200} top={70} />
      </div>

      <div className="absolute bottom-0 left-0 right-0" style={{ height: 100 }}>
        <PixelVegetacao tipo="arvore" x={2} y={4} delay={0.1} />
        <PixelVegetacao tipo="arvore" x={12} y={2} delay={0.15} />
        <PixelVegetacao tipo="arvore" x={28} y={3} delay={0.2} />
        <PixelVegetacao tipo="arvore" x={48} y={1} delay={0.25} />
        <PixelVegetacao tipo="arvore" x={65} y={2} delay={0.3} />
        <PixelVegetacao tipo="arvore" x={82} y={0} delay={0.35} />
        <PixelVegetacao tipo="arvore" x={95} y={3} delay={0.4} />

        <PixelVegetacao tipo="arbusto" x={5} y={14} delay={0.45} />
        <PixelVegetacao tipo="arbusto" x={18} y={12} delay={0.5} />
        <PixelVegetacao tipo="arbusto" x={32} y={16} delay={0.55} />
        <PixelVegetacao tipo="arbusto" x={42} y={13} delay={0.6} />
        <PixelVegetacao tipo="arbusto" x={55} y={15} delay={0.65} />
        <PixelVegetacao tipo="arbusto" x={68} y={14} delay={0.7} />
        <PixelVegetacao tipo="arbusto" x={78} y={12} delay={0.75} />
        <PixelVegetacao tipo="arbusto" x={88} y={17} delay={0.8} />
        <PixelVegetacao tipo="arbusto" x={95} y={11} delay={0.85} />
      </div>

      <Pasto />
    </div>
  );
}
