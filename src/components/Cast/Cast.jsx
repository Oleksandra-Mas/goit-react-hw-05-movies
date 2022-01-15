import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getMovieById,
  getMovieCreditsById,
  getMovieReviewsById,
} from '../../services/apiService';
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
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
      {!cast && <p>No actors found</p>}
    </>
  );
};
