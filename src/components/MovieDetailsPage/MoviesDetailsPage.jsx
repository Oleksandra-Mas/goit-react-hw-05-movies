import { useParams, useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from '../../services/apiService';
export const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getMovieById(movieId)
      .then(setMovie)
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);

  return (
    <>
      <button onClick={() => navigate(-1)}>go back</button>
      {movie && (
        <>
          <img height={200} src={movie.poster_path} alt="poster" />
          <h1>
            {movie.title}({movie.release_year})
          </h1>
          <p>{`User Score: ${movie.vote_average}`}</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.join(' ')}</p>
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
          <Outlet context={movieId} />
        </>
      )}
    </>
  );
};
