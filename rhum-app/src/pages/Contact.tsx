import { FormEvent, useEffect, useState } from 'react';
import Button from '../components/common/Button';
import useTitle from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  useTitle('Contact');
  const [fromEmail, setFromEmail] = useState<string>();
  const [fromName, setFromName] = useState<string>();
  const [subject, setSubject] = useState<string>();
  const [emailMessage, setEmailMessage] = useState<string>();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (fromEmail && fromName && subject && emailMessage) {
      return setIsSubmit(true);
    }
    alert('Tous les champs doivent être renseignés');
  };

  useEffect(() => {
    if (isSubmit) {
      fetch(`${import.meta.env.VITE_API_HOST}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromEmail,
          fromName,
          subject,
          emailMessage,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.Messages[0].Status === 'success') {
            alert('Message envoyé');
            navigate(0);
          }
        })
        .catch(error => {
          console.error(error);
          alert('Une erreur est survenu veuillez réessayer plus tard');
        });
    }
  }, [isSubmit]);

  return (
    <>
      <h1 className="text-xl m-b-2">Nous contacter</h1>
      <p>
        Si vous rencontrez un problème sur notre site vous pouvez nous conctater
      </p>
      <section className="flex justify-center w-full m-t-5">
        <form
          onSubmit={e => handleSubmit(e)}
          className="p-3 border flex flex-col gap-2 bg-secondary-50 size-form">
          <h2 className="text-xl">Formulaire de contact</h2>
          <label className="flex flex-col">
            Email* :
            <input
              type="email"
              placeholder="ex: jhon.doe@email.com"
              className="border p-1 text-lg bg-white"
              required
              onChange={e => setFromEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            Nom ou pseudo* :
            <input
              type="text"
              placeholder="ex: Jean"
              className="border p-1 text-lg bg-white"
              required
              onChange={e => setFromName(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            Sujet* :
            <input
              type="text"
              placeholder="ex: Besoin d'aide"
              className="border p-1 text-lg bg-white"
              required
              onChange={e => setSubject(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            Message* :
            <textarea
              placeholder="votre message"
              className="border p-1 bg-white size-message"
              required
              onChange={e => setEmailMessage(e.target.value)}
            />
          </label>
          <div className="flex justify-end gap-2">
            <p className="text-sm">* champs requis</p>
            <Button>Envoyer</Button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Contact;
