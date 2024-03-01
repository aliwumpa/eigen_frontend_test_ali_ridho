import React from 'react';
import './HeaderBanner.css';

const HeaderBanner: React.FC = () => {
    const bannerUrl = process.env.PUBLIC_URL + '/news_banner.png';

    return (
        <div className='news-app__header-banner-container'>
            <img src={bannerUrl} alt="news banner" width={1600} height={1000}/>
            <div className="news-app__header-banner-quotes">
                <p>“Heaven does not create one person above or below another.”</p>
            </div>
        </div>
      );
};

export default HeaderBanner;