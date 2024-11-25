import React from 'react';
import TheExistRoom from '../../components/Section/TheExistRoom';
import Supplement from '../../components/Section/Supplement';
import TipsToStay from '../../components/Section/TipsToStay';
import BannerHomeSilder from '../../components/Section/BannerHomeSilder';
import AboutUs from '../../components/Section/AboutUs';

function HomePage(props) {
    return (
        <div className='px-12'>
            <BannerHomeSilder />
            <TheExistRoom />
            <Supplement />
            <TipsToStay />
            <AboutUs />
        </div>
    );
}

export default HomePage;