import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getMovieCreditsById } from '../../services/apiService';

const Character = styled.span`
  font-weight: 700;
  margin-right: 0.5rem;
`;

const Name = styled.p`
  font-weight: 700;
  font-style: italic;
  font-size: 20px;
`;

export const Cast = () => {
  const movieId = useOutletContext();
  const [cast, setCast] = useState(null);
  useEffect(() => {
    getMovieCreditsById(movieId)
      .then(cast => {
        setCast(cast);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);
  return (
    <>
      {cast?.length > 0 && (
        <ul>
          {cast.map(({ name, character, path }) => (
            <li key={name}>
              <img height={200} src={path} alt="poster" />
              <Name>{name}</Name>
              <p>
                <Character>Character:</Character>
                {character}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!cast && <p>No actors found</p>}
    </>
  );
};
