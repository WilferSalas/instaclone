// @scripts
import EditUserProfilePage from '../pages/edit-user-profile-page';
import HomePage from '../pages/home-page';
import Layout from '../layouts';
import NotFoundPage from '../pages/not-found-page';
import UserPage from '../pages/user-page';

const routes = [
    {
        component: EditUserProfilePage,
        exact: true,
        layout: Layout,
        path: '/edit-user'
    },
    {
        component: HomePage,
        exact: true,
        layout: Layout,
        path: '/'
    },
    {
        component: UserPage,
        exact: true,
        layout: Layout,
        path: '/:username'
    },
    {
        component: NotFoundPage,
        layout: Layout
    }
];

export default routes;