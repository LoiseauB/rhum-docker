import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { userType } from '../../types/user';
import {
  clearFavorites,
  setFavorites,
} from '../../store/features/favoriteSlice';
import { userFavorites } from '../../types/userFavorites';
import { clearUser } from '../../store/features/authSlice';
import useTitle from '../../hooks/useTitle';

const UserProfile = () => {
  useTitle('Mon compte');
  const { isAuthenticate } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isAuthenticate) {
      navigate('/login');
    }
  }, [isAuthenticate, navigate]);
  const [user, setUser] = useState<userType>();
  const [userFavorites, setUserFavorites] = useState<userFavorites[]>();
  const [deleteUser, setDeleteUser] = useState(false);
  useEffect(() => {
    if (isAuthenticate) {
      fetch(`${import.meta.env.VITE_API_HOST}/user`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          setUser(data.user);
          setUserFavorites(data.userFavorites);
          const favIds: number[] = [];
          for (const bottle of data.userFavorites) {
            favIds.push(bottle.id);
          }
          dispatch(setFavorites({ favorites: favIds }));
        })
        .catch(error => console.error(error));
    }
  }, [isAuthenticate]);

  useEffect(() => {
    if (isAuthenticate && deleteUser) {
      fetch(`${import.meta.env.VITE_API_HOST}/user`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(_data => {
          dispatch(clearFavorites());
          dispatch(clearUser());
        })
        .catch(error => console.error(error));
    }
  }, [isAuthenticate, deleteUser]);

  const handleDelete = () => {
    const confirmed = confirm(
      'Vous êtes sur le point de supprimer votre compte. Êtes-vous sûr ?',
    );
    if (confirmed) {
      setDeleteUser(true);
      return;
    }
    navigate(0);
  };

  return (
    <>
      <section className="my-4 border box-shadow p-3 flex justify-center items-center">
        {user?.avatar ? (
          <div className="avatar overflow-hidden mx-3 rounded-full box-shadow">
            <img
              src={`${import.meta.env.VITE_API_HOST.replace('/api', '')}/${user.avatar}`}
              alt={`${user.pseudo} avatar`}
              className="avatar-img"
            />
          </div>
        ) : (
          <div className="avatar overflow-hidden mx-3 rounded-full box-shadow">
            <img
              src={`${import.meta.env.VITE_API_HOST.replace('/api', '')}/uploads/default.png`}
              alt={`${user?.pseudo} avatar`}
              className="avatar-img"
            />
          </div>
        )}
        <div>
          <h1 className="text-title text-primary text-xl my-4">Mon profile</h1>
          <p>
            <b className="text-accent">pseudo:</b> {user?.pseudo}
          </p>
          <p>
            <b className="text-accent">email:</b> {user?.email}
          </p>
          <div className="m-t-2 flex gap-2">
            <Button asNavLink href="/profile/edit">
              Éditer
            </Button>
            <button onClick={() => handleDelete()} className="text-danger">
              supprimer mon compte
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-title text-primary text-xl my-4">Mes favoris</h2>
        {userFavorites && !!userFavorites.length && (
          <ul>
            {userFavorites.map(({ name, id }, index) => (
              <li key={'fav' + index}>
                <NavLink to={`/bottles/${id}`} className="text-nav">
                  • {name}
                </NavLink>
                <br />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default UserProfile;
