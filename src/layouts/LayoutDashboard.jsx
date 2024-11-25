import React from 'react';
import { Outlet } from 'react-router-dom';

function LayoutDashboard(props) {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default LayoutDashboard;