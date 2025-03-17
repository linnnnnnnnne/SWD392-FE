import ScrollToTop from '@/hooks/scroll-to-top';
import NotFound from '@/pages/not-found';
import path from 'path';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const SystemLayout = lazy(() => import('@/components/layout/layout'));
// const HomePage = lazy(() => import('@/pages/Store/index'));
const Home = lazy(() => import('@/pages/home/home'));
const Product = lazy(() => import('@/pages/Product/pageProduct'));

const StorePage = lazy(() => import('@/pages/Store/index'));
const StoreDetailPage = lazy(() => import('@/pages/StoreDetail/index'));
const PetService = lazy(() => import('@/pages/PetService/index'));
const BookingPage = lazy(() => import('@/pages/BookingPage/index'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const systemRoute = [
    {
      path: '/',
      element: (
        <SystemLayout>
          <Suspense>
            <ScrollToTop />
            <Outlet />
          </Suspense>
        </SystemLayout>
      ),
      children: [
        // {
        //   element: <>Home Page</>,
        //   index: true
        // },
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/product',
          element: <Product />
        },
        {
          path: '/store',
          element: <StorePage />
        },
        {
          path: '/store/:id',
          element: <StoreDetailPage />
        },
        {
          path: '/store/:id/:serviceId',
          element: <PetService />
        },
        {
          path: '/booking',
          element: <BookingPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...systemRoute, ...publicRoutes]);

  return routes;
}
