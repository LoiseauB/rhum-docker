import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import { setUser } from '../../store/features/authSlice';
import { useAppSelector } from '../../store/hook';
import useTitle from '../../hooks/useTitle';

const Login = () => {
  useTitle('Se connecter');
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticate } = useAppSelector(state => state.auth);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSubmit && email && pwd) {
      fetch(`${import.meta.env.VITE_API_HOST}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: pwd,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.userId) {
            dispatch(
              setUser({
                id: data.userId,
                role: data.role,
                pseudo: data.pseudo,
                email: data.email,
              }),
            );
          }
          if (data.error) {
            setIsSubmit(false);
            return alert('Mauvais email/mot de passe');
          }
        })
        .catch(error => console.error('Erreur:', error));
      setIsSubmit(false);
    }
  }, [dispatch, email, isSubmit, navigate, pwd]);

  useEffect(() => {
    if (isAuthenticate) {
      navigate('/profile');
    }
  }, [isAuthenticate]);

  return (
    <section className="flex justify-center items-center size-full p-10">
      <div>
        <form
          onSubmit={e => handleSubmit(e)}
          className="p-3 border flex flex-col gap-2 bg-secondary-50">
          <h2 className="text-xl">Se connecter</h2>
          <label className="flex flex-col">
            Adresse email:
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="border p-1 text-lg bg-white"
              required
            />
          </label>
          <label className="flex flex-col">
            Mot de passe:
            <input
              type="password"
              onChange={e => setPwd(e.target.value)}
              value={pwd}
              className="border p-1 text-lg bg-white"
              required
            />
          </label>
          <div className="flex justify-end">
            <Button>Se connecter</Button>
          </div>
        </form>
        <p className="m-t-4">
          Vous n'avez pas de compte :{' '}
          <NavLink to={'/register'} className="text-nav text-md text-primary">
            s'inscrire
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Login;
