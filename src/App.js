import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Cast } from './components/Cast/Cast';
import { HomePage } from './components/HomePage/HomePage';
import { MoviesDetailsPage } from './components/MovieDetailsPage/MoviesDetailsPage';
import { MoviesPage } from './components/MoviesPage/MoviesPage';
import { Reviews } from './components/Reviews/Reviews';

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MoviesDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
