import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderHome from '../components/Header/HeaderHome';
import FooterHome from '../components/Footer/FooterHome';

function LayoutHome(props) {
    return (
        <>
            <HeaderHome />
            <main className='flex flex-col gap-6'>
                <Outlet />
            </main>
            <FooterHome />
        </>
    );
}

export default LayoutHome;