import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { dashboardRoutes, homeRoutes } from './index';
import PrivateRoute from './PrivateRoute';
import ScrollToTop from '../helpers/ScrollToTop';
import NotFound from '../pages/Error/NotFound';
import LayoutDashboard from '../layouts/LayoutDashboard';
import LayoutHome from '../layouts/LayoutHome';

function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<LayoutHome />}>
                    {homeRoutes.map((route, index) => {
                        if (route.private) {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<PrivateRoute element={route.component} />}
                                />
                            );
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.component}
                            />
                        );
                    })}
                </Route>
                <Route path="/dashboard" element={<LayoutDashboard />}>
                    {dashboardRoutes.map((route, index) => {
                        if (route.private) {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<PrivateRoute element={route.component} />}
                                />
                            );
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.component}
                            />
                        );
                    })}
                </Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;