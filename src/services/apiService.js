import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd5fb52a706c708d7b8e3adfd2b759d68';

const IMG_PLACEHOLDER = 'https://critics.io/img/movies/poster-placeholder.png';

export const getTrending = async () => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const searchMovie = async query => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1&include_adult=false`;
  const result = await axios.get(url);
  return result.data.results;
};

export const getMovieById = async id => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const { data } = await axios.get(url);
  const result = fixMovie(data);
  result.genres = result.genres.map(genre => genre.name);
  return result;
};

export const getMovieCreditsById = async id => {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
  const {
    data: { cast },
  } = await axios.get(url);
  return cast.map(fixCast);
};

export const getMovieReviewsById = async id => {
  const url = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`;
  const {
    data: { results },
  } = await axios.get(url);
  const reviews = results.map(({ author, content }) => {
    return { author, content };
  });
  return reviews;
};

const fixMovie = movie => {
  let result = Object.assign({}, movie);
  if (result.poster_path)
    result.poster_path = 'https://image.tmdb.org/t/p/w500' + result.poster_path;
  else result.poster_path = IMG_PLACEHOLDER;
  result.release_year = !result.release_date
    ? 'Unknown'
    : result.release_date.slice(0, 4);
  result.vote_average = `${result.vote_average * 10}%`;
  return result;
};

const fixCast = ({ original_name, profile_path, character }) => {
  const newActor = { name: original_name, character };
  newActor.path = profile_path
    ? 'https://image.tmdb.org/t/p/w500' + profile_path
    : IMG_PLACEHOLDER;
  return newActor;
};
