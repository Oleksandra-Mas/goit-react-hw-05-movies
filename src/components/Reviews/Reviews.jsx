import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviewsById } from '../../services/apiService';
export const Reviews = () => {
  const movieId = useOutletContext();
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    getMovieReviewsById(movieId)
      .then(reviews => {
        setReviews(reviews);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);
  return (
    <>
      {reviews?.length > 0 && (
        <ul>
          {reviews.map(({ author, content }) => (
            <li key={author}>
              <p>Author:{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!reviews || (reviews?.length === 0 && <p>No reviews found</p>)}
    </>
  );
};
