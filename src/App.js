import { Routes, Route, NavLink, useMatch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import './App.css';
const HomePage = lazy(() => import('./components/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('./components/MoviesPage/MoviesPage'));
const MoviesDetailsPage = lazy(() =>
  import('./components/MovieDetailsPage/MoviesDetailsPage'),
);
const Cast = lazy(() => import('./components/Cast/Cast'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));

const Header = styled.div`
  font-size: 20px;
  line-height: 1.23;
  padding: 0 20px 20px;
  text-align: center;
  color: black;
  a + a {
    margin-left: 20px;
  }
  a:hover {
    color: blue;
  }
`;

function App() {
  const idMatch = useMatch('/movies/:movieId');
  const castMatch = useMatch('/movies/:movieId/cast');
  const reviewMatch = useMatch('/movies/:movieId/reviews');
  return (
    <div className="App">
      <Header>
        <NavLink end to="/">
          Home
        </NavLink>
        <NavLink
          end
          className={(idMatch || castMatch || reviewMatch) && 'active'}
          to="/movies"
        >
          Movies
        </NavLink>
      </Header>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="movies"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MoviesPage />
            </Suspense>
          }
        />
        <Route
          path="movies/:movieId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MoviesDetailsPage />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
