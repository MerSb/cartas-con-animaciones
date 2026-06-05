'use client';

interface Props {
  pixels: string[];
  colors: Record<string, string>;
  size?: number;
}

export default function PixelArt({ pixels, colors, size = 8 }: Props) {
  const w = Math.max(...pixels.map(r => r.length)) * size;
  const h = pixels.length * size;
  return (
    <svg width={w} height={h} style={{ imageRendering: 'pixelated', display: 'block' }}>
      {pixels.flatMap((row, ry) =>
        [...row].flatMap((ch, rx) => {
          const color = colors[ch];
          if (!color) return [];
          return [
            <rect
              key={`${rx}-${ry}`}
              x={rx * size}
              y={ry * size}
              width={size}
              height={size}
              fill={color}
            />,
          ];
        })
      )}
    </svg>
  );
}