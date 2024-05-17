import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; 


// CSSファイルのインポート（Tailwind CSS や独自のスタイル）
import './styles/tailwind.css';
import './styles/main.css';

const container  = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Container is null');
}
