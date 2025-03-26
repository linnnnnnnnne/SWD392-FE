import ScrollToTop from '@/hooks/scroll-to-top';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const SystemLayout = lazy(() => import('@/components/layout/layout'));
// const HomePage = lazy(() => import('@/pages/Store/index'));
const Home = lazy(() => import('@/pages/home/home'));
const SuccessPage = lazy(() => import('@/pages/home/SuccessPage'));
const Product = lazy(() => import('@/pages/Product/pageProduct'));
const ProductDetail = lazy(() => import('@/pages/Product/ProductDetail'));
const StorePage = lazy(() => import('@/pages/Store/index'));
const StoreDetailPage = lazy(() => import('@/pages/StoreDetail/index'));
const PetService = lazy(() => import('@/pages/PetService/index'));
const BookingPage = lazy(() => import('@/pages/BookingPage/index'));
const SigninPage = lazy(() => import('@/pages/auth/signin/index'));
const SignUpPage = lazy(() => import('@/pages/auth/signup/index'));
const Booking = lazy(() => import('@/pages/StoreOwner/Booking'));
const Item = lazy(() => import('@/pages/StoreOwner/Item'));

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
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/success',
          element: <SuccessPage />
        },
        {
          path: '/product',
          element: <Product />
        },
        {
          path: '/product-detail/:id',
          element: <ProductDetail />
        },

        {
          path: '/store',
          element: <StorePage />
        },

        {
          path: '/StoreOwner/Booking',
          element: <Booking />
        },

        {
          path: '/StoreOwner/Item',
          element: <Item />
        },

        {
          path: '/branch/:id',
          element: <StoreDetailPage />
        },
        {
          path: '/services/:id',
          element: <PetService />
        },
        {
          path: '/booking/:serviceId',
          element: <BookingPage />
        },
        {
          path: '/login',
          element: <SigninPage />
        },
        {
          path: '/signup',
          element: <SignUpPage />
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
