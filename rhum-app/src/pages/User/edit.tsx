import { FormEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clearUser, setUser } from '../../store/features/authSlice';
import { clearFavorites } from '../../store/features/favoriteSlice';
import useTitle from '../../hooks/useTitle';
import useValidateFile from '../../hooks/useValidateFile';

const EditUserForm = () => {
  useTitle('Modifier son compte');
  const { email: userEmail, pseudo: userPseudo } = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>(userEmail!);
  const [password, setPassword] = useState<string>();
  const [pseudo, setPseudo] = useState<string>(userPseudo!);
  const [confirmPwd, setConfirmPwd] = useState<string>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPwd) {
      return alert('Erreur dans la confirmation du mot de passe');
    }
    if (useValidateFile(avatar)) {
      setIsSubmit(true);
    }
  };
  useEffect(() => {
    if (isSubmit) {
      const formData = new FormData();
      formData.append('email', email);
      password && formData.append('password', password);
      formData.append('pseudo', pseudo);
      avatar && formData.append('avatar', avatar);

      fetch(`${import.meta.env.VITE_API_HOST}/user`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.id && !password) {
            dispatch(setUser({ ...data }));
            navigate('/profile');
          }
          if ((data.id && password) || email !== userEmail) {
            fetch(`${import.meta.env.VITE_API_HOST}/auth/logout`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(() => {
              dispatch(clearUser());
              dispatch(clearFavorites());
              navigate('/login');
            });
          }
          if (data.error) {
            setIsSubmit(false);
            alert(data.error);
          }
        })
        .catch(error => console.error('Erreur:', error));
      setIsSubmit(false);
    }
  }, [email, isSubmit, navigate, password, pseudo]);

  return (
    <section className="flex justify-center items-center size-full p-10">
      <div>
        <form
          onSubmit={e => handleSubmit(e)}
          className="p-3 border flex flex-col gap-2 bg-secondary-50">
          <h2 className="text-xl">Modifier son profil</h2>
          <label className="flex flex-col">
            Pseudo:
            <input
              type="text"
              onChange={e => setPseudo(e.target.value)}
              value={pseudo}
              className="border p-1 text-lg bg-white"
            />
          </label>
          <label className="flex flex-col">
            Adresse email:
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="border p-1 text-lg bg-white"
            />
          </label>
          <label className="flex flex-col">
            Mot de passe:
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="border p-1 text-lg bg-white"
            />
          </label>
          <label className="flex flex-col">
            <div className="flex gap-2">
              <span>Confirmez le mot de passe:</span>
              {confirmPwd && (
                <>
                  {confirmPwd !== password ? <span>❌</span> : <span>✅</span>}
                </>
              )}
            </div>
            <input
              type="password"
              onChange={e => setConfirmPwd(e.target.value)}
              value={confirmPwd}
              className="border p-1 text-lg bg-white"
            />
          </label>
          <label className="flex flex-col">
            Avatar :<p className="text-sm">{'(jpeg ou png, < 3 Mb)'}</p>
            <input
              type="file"
              accept=".jpg, .png"
              onChange={e => setAvatar(e.target.files!.item(0))}
              className="border p-1 bg-white"
            />
          </label>
          <div className="flex justify-end items-center gap-2">
            <NavLink to={'/profile'} className="text-nav text-md">
              Annuler
            </NavLink>
            <Button>Enregistrer</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUserForm;
