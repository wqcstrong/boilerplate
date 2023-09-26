import { Link } from 'react-router-dom';

export const InnerMenu = () => {
  return (
    <div>
      内部默认菜单，点击前往 <Link to="/hidden-menu">隐藏菜单</Link> 或者{' '}
      <Link to="/dassda">404</Link>
    </div>
  );
};
