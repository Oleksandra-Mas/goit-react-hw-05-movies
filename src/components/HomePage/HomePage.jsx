import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getTrending } from '../../services/apiService';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await getTrending();
      setMovies(results);
    };
    getMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => {
            return (
              <li key={id}>
                <NavLink to={`/movies/${id}`}>{title}</NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
