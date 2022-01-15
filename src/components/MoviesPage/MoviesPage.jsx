import { useLocation } from 'react-router-dom';
export const MoviesPage = () => {
  let { pathname } = useLocation();
  //   console.log(`${window.location.origin}${pathname}/`);
  return <p>MoviesPage</p>;
};
