import { FormEvent, useEffect, useState } from 'react';
import useValidateFile from '../../hooks/useValidateFile';
import Button from '../../components/common/Button';
import { userType } from '../../types/user';
import { useNavigate } from 'react-router-dom';

const EditAdminModal = ({
  user,
  onClose,
}: {
  user: userType;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>();
  const [pseudo, setPseudo] = useState<string>(user.pseudo);
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
      formData.append('userId', user.id.toString());

      fetch(`${import.meta.env.VITE_API_HOST}/admin/users`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setIsSubmit(false);
            alert(data.error);
          } else {
            onClose();
            alert('Le user a été modifier avec succès')
            navigate(0);
          }
        })
        .catch(error => console.error('Erreur:', error));
      setIsSubmit(false);
    }
  }, [email, isSubmit, password, pseudo, user]);

  return (
    <section className="flex justify-center items-center size-full absolute bg-white-80">
      <div>
        <form
          onSubmit={e => handleSubmit(e)}
          className="p-3 border flex flex-col gap-2 bg-secondary">
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
            Avatar (jpeg ou png):
            <input
              type="file"
              accept=".jpg, .png"
              onChange={e => setAvatar(e.target.files!.item(0))}
              className="border p-1 bg-white"
            />
          </label>
          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-nav text-md">
              Annuler
            </button>
            <Button>Enregistrer</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditAdminModal;
