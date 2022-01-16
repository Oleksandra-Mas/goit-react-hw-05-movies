import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getMovieReviewsById } from '../../services/apiService';

const ReviewItem = styled.li`
  margin-bottom: 50px;
`;

const Author = styled.span`
  font-weight: 700;
  margin-right: 0.5rem;
`;

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
            <ReviewItem key={author}>
              <p>
                <Author>Author:</Author>
                {author}
              </p>
              <p>{content}</p>
            </ReviewItem>
          ))}
        </ul>
      )}
      {!reviews || (reviews?.length === 0 && <p>No reviews found</p>)}
    </>
  );
};
