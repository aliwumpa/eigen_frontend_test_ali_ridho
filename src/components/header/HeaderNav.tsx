import React, { useState } from 'react';
import { BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './HeaderNav.css';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Top Headlines News', 'section__top-headlines', <BookOutlined />),

  getItem('Everything News', 'section__everything', <BookOutlined />),
];

const HeaderNav: React.FC = () => {
  const ClickNav: MenuProps['onClick'] = (e) => {
    const sectionId = e.key;

    const section = document.getElementById(sectionId);

    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 50,
        behavior: 'smooth',
      });
    }
  };

  const logoUrl = process.env.PUBLIC_URL + '/news_logo.png';

  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='news-app__header-nav-container'>
      <div className="news-app__header-nav-logo">
        <a href="/" aria-label='news logo anchor'>
          <img src={logoUrl} alt="news logo" width={200} height={150}/>
        </a>
      </div>
      <div 
        className={`news-app__header-nav-hamburger ${isOpen ? 'open' : ''}`} 
        onClick={toggleSlide}
      >
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
        <span className="fa fa-times"></span>
      </div>
      <Menu
        onClick={ClickNav}
        mode="inline"
        items={items}
        className={`news-app__header-nav-menu ${isOpen ? 'open' : ''}`}
      />
    </div>
  );
};

export default HeaderNav;