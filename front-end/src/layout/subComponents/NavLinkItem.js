import React from 'react';
import { Link } from 'react-router-dom';

const NavLinkItem = ({to = '/', icon = '', text = ''}) => {
  return (
      <li className='nav-item'>
        <Link className='nav-link' to={`${to}`}>
          <span className={`oi ${icon}`} />
          &nbsp;{`${text}`}
        </Link>
      </li>
  );
};

export default NavLinkItem;
