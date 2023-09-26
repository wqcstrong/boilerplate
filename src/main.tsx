import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@/assets/style/initial.css';
import '@/initial/dayjs';

function main() {
  const root = document.querySelector('#root');
  if (!root) {
    throw new Error('根元素不存在');
  }

  createRoot(root).render(<App />);
}

if (document.readyState === 'complete') {
  main();
} else {
  window.addEventListener('load', main);
}
