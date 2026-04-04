import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-multiply"
      style={{
        // A minimal 3x3 noise PNG tiled to create grain without SVG feTurbulence cost
        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAABxJREFUGFdjZmBgYGBjYGD4/58BCH/////A8OAAAMRDAeG3YyQYAAAAAElFTkSuQmCC")`,
        backgroundRepeat: 'repeat',
        backgroundPosition: '0 0',
        backgroundSize: '24px 24px',
        imageRendering: 'pixelated'
      }}
    />
  );
};
