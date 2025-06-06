import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useEffect, useState } from 'react';
import { Heart } from '@phosphor-icons/react';
import {
  deleteFavorite,
  setOneFavorite,
} from '../../store/features/favoriteSlice';

const LikeButton = ({ bottleId }: { bottleId: number }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticate } = useAppSelector(state => state.auth);
  const { favorites } = useAppSelector(state => state.favorites);
  const isFav = favorites.includes(bottleId);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (isClicked && isAuthenticate) {
      if (isFav) {
        fetch(`${import.meta.env.VITE_API_HOST}/favorite`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bottleId }),
        })
          .then(response => response.json())
          .then(_data => {
            dispatch(deleteFavorite({ toDelete: bottleId }));
            setIsClicked(false);
          })
          .catch(error => console.error(error));
        return;
      }
      fetch(`${import.meta.env.VITE_API_HOST}/favorite`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bottleId }),
      })
        .then(response => response.json())
        .then(_data => {
          dispatch(setOneFavorite({ newFav: bottleId }));
          setIsClicked(false);
        })
        .catch(error => console.error(error));
    }
  }, [isClicked]);
  return (
    <button
      onClick={() =>
        isAuthenticate ? setIsClicked(true) : navigate('/login')
      }>
      <Heart
        size={25}
        weight={isFav ? 'fill' : 'regular'}
        className="favorite"
      />
    </button>
  );
};

export default LikeButton;
