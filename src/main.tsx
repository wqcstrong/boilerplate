import { createRoot } from 'react-dom/client';
import '@/assets/style/initial.css';
import { App } from './App';

function main() {
  const root = document.querySelector('#root');
  if (!root) {
    throw new Error('没有找到根节点');
  }

  createRoot(root).render(<App />);
}

if (document.readyState === 'complete') {
  main();
} else {
  window.addEventListener('load', main);
}
