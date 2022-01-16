import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { searchMovie } from '../../services/apiService';

const MoviesList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 20px auto 0;
  max-width: 300px;
`;

const Input = styled.input`
  border-radius: 0 0.5rem 0.5rem 0;
  height: 30px;
  border: 1px solid grey;
  outline: none;
  :hover {
    border: 1px solid blue;
  }
`;

const Button = styled.button`
  border-radius: 0.5rem 0 0 0.5rem;
  height: 34px;
  border: 1px solid grey;
  background-color: grey;
  cursor: pointer;
  color: white;
  font-weight: 500;
  :hover {
    background-color: white;
    color: grey;
  }
`;

export const MoviesPage = () => {
  const [filter, setFilter] = useState('');
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = new URLSearchParams(search)?.get('query');

  const handleInputChange = event => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (filter.trim() === '') {
      return toast.error('Empty input');
    }
    searchMovie(filter)
      .then(movies => {
        setMovies(movies);
        navigate(`/movies?query=${filter}`);
      })
      .catch(err => {
        console.log(err);
      });
    setFilter('');
  };

  useEffect(() => {
    if (filter || filter === query) {
      return;
    }
    if (!query) {
      setMovies(null);
      return;
    }
    searchMovie(query)
      .then(movies => {
        setMovies(movies);
      })
      .catch(err => {
        console.log(err);
      });
    setFilter('');
  }, [query, filter]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Button type="submit">Search</Button>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleInputChange}
        />
      </form>
      {movies?.length > 0 && (
        <MoviesList>
          {movies.map(({ title, id }) => (
            <li key={id}>
              <NavLink to={`/movies/${id}`}>{title}</NavLink>
            </li>
          ))}
        </MoviesList>
      )}
      {!movies || (movies?.length === 0 && <p>No movies found</p>)}
    </>
  );
};
