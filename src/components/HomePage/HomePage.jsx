import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { getTrending } from '../../services/apiService';

const TrendingSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 300px;
`;

const TrendingHeader = styled.h1`
  align-self: center;
`;

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await getTrending();
      setMovies(results);
    };
    getMovies();
  }, []);

  return (
    <TrendingSection>
      <TrendingHeader>Trending today</TrendingHeader>
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
    </TrendingSection>
  );
}
