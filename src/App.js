import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import './App.css';
import { Cast } from './components/Cast/Cast';
import { HomePage } from './components/HomePage/HomePage';
import { MoviesDetailsPage } from './components/MovieDetailsPage/MoviesDetailsPage';
import { MoviesPage } from './components/MoviesPage/MoviesPage';
import { Reviews } from './components/Reviews/Reviews';

const Header = styled.div`
  font-size: 20px;
  line-height: 1.23;
  padding: 20px;
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
  return (
    <div className="App">
      <Header>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MoviesDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<HomePage />} />
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
