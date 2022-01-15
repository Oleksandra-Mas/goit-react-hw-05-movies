import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { searchMovie } from '../../services/apiService';
export const MoviesPage = () => {
  const [filter, setFilter] = useState('');
  const [movies, setMovies] = useState('');
  const handleInputChange = event => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (filter.trim() === '') {
      return alert('Empty input');
    }
    searchMovie(filter)
      .then(movies => {
        setMovies(movies);
      })
      .catch(err => {
        console.log(err);
      });
    setFilter('');
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Search</button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleInputChange}
        />
      </form>
      {movies?.length > 0 && (
        <ul>
          {movies.map(({ title, id }) => (
            <li key={id}>
              <NavLink to={`/movies/${id}`}>{title}</NavLink>
            </li>
          ))}
        </ul>
      )}
      {!movies || (movies?.length === 0 && <p>No movies found</p>)}
    </>
  );
};
