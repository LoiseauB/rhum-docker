import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import Button from '../common/Button';
import { clearUser } from '../../store/features/authSlice';
import { clearFavorites } from '../../store/features/favoriteSlice';

const Header = () => {
  const { isAuthenticate, role } = useAppSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticate && isLogout) {
      fetch(`${import.meta.env.VITE_API_HOST}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        dispatch(clearUser());
        dispatch(clearFavorites());
        setIsLogout(false);
        navigate('/');
      });
    }
  }, [isAuthenticate, isLogout]);
  return (
    <header className="flex justify-between items-center bg-white">
      <div className="flex items-center res-navlink">
        <span className="text-title text-2xl text-primary">RHUM.</span>
        <nav>
          <div className="gap-2 visible-desktop-flex ">
            <NavLink to="/" className="text-nav">
              Accueil
            </NavLink>
            <NavLink to="/bottles" className="text-nav">
              Les bouteilles
            </NavLink>
          </div>
          <div className="visible-mobile-flex justify-evenly items-center w-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center text-nav">
              Pages {isOpen ? <CaretUp /> : <CaretDown />}
            </button>
            <div
              className={classNames(
                { 'visible-none': !isOpen },
                'absolute -bottom-5 bg-white box-shadow border',
              )}>
              <nav
                onClick={() => setIsOpen(false)}
                className="flex flex-col px-4 py-1">
                <NavLink to="/" className="text-nav">
                  Accueil
                </NavLink>
                <br />
                <NavLink to="/bottles" className="text-nav">
                  Les bouteilles
                </NavLink>
                <br />
                {isAuthenticate ? (
                  <button onClick={() => setIsLogout(true)}>
                    Se déconnecter
                  </button>
                ) : (
                  <NavLink to="/login" className="text-nav">
                    Se connecter
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        </nav>
        <div className="visible-mobile-block">
          {isAuthenticate ? (
            <>
              <Button asNavLink href="/profile">
                Mon Profile
              </Button>
            </>
          ) : (
            <Button asNavLink href="/register">
              S'inscrire
            </Button>
          )}
        </div>
      </div>
      <nav className="visible-desktop-flex gap-2 items-center">
        {isAuthenticate ? (
          <>
            {role === 'ADMIN' && (
              <Button asNavLink href="/admin">
                Espace administration
              </Button>
            )}
            <Button asNavLink href="/profile">
              Mon Profile
            </Button>
            <button onClick={() => setIsLogout(true)}>Se déconnecter</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="text-nav text-md">
              Se connecter
            </NavLink>
            <Button asNavLink href="/register">
              S'inscrire
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
