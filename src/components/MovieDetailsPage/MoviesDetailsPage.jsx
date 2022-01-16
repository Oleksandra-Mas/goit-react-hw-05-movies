import { useParams, useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getMovieById } from '../../services/apiService';

const MovieItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0;
  max-width: 800px;
`;

const DetailsList = styled.ul`
  display: flex;
  font-size: 20px;
  line-height: 1.23;
  padding: 20px;
  justify-content: center;
  color: black;
  li + li {
    margin-left: 20px;
  }
  a:hover {
    color: blue;
  }
`;

const Button = styled.button`
  align-self: flex-start;
  border-radius: 0.5rem;
  height: 34px;
  border: 1px solid grey;
  background-color: grey;
  cursor: pointer;
  color: white;
  font-weight: 700;
  padding: 0.5rem;

  :hover {
    background-color: white;
    color: grey;
  }
`;

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
      <Button onClick={() => navigate(-1)}>go back</Button>
      {movie && (
        <MovieItem>
          <img width={200} src={movie.poster_path} alt="poster" />
          <h1>
            {movie.title}({movie.release_year})
          </h1>
          <p>{`User Score: ${movie.vote_average}`}</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.join(' ')}</p>
          <h3>Additional information</h3>
          <DetailsList>
            <li>
              <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
            </li>
          </DetailsList>
          <Outlet context={movieId} />
        </MovieItem>
      )}
    </>
  );
};
