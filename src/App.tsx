import { useRoutes } from 'react-router-dom';
import Hero from './routes/hero';
import Article from '@/routes/article';

import './App.css';

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Hero />
    },
    {
      path: 'article/:id',
      element: <Article />
    }
  ]);

  return <div className='App'>{element}</div>;
}

export default App;
