import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Pencil, Star } from '@phosphor-icons/react';

import Button from '../../components/common/Button';
import Note from '../../components/Note';
import { BottleType } from '../../types/bottles';
import { categories } from '../../config/categories';
import LikeButton from '../../components/common/LikeButton';
import { useAppSelector } from '../../store/hook';
import useTitle from '../../hooks/useTitle';
import { bottlesPict } from '../../config/bottlesPict';

const BottleShow = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const index = Number(id);
  const { isAuthenticate } = useAppSelector(state => state.auth);
  const [bottle, setBottle] = useState<BottleType>();
  const [userRate, setUserRate] = useState<number>();
  const [dbRate, setDbRate] = useState<number>();
  const [userComment, setUserComment] = useState<string>();
  const [commentSubmit, setCommentSubmit] = useState(false);
  const [rateSubmit, setRateSubmit] = useState(false);
  const [rateDelete, setRateDelete] = useState(false);
  const navigate = useNavigate();
  useTitle(
    searchParams.get('name') ? searchParams.get('name')! : 'Bouteille ' + id,
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_HOST}/bottle/${index}`)
      .then(response => response.json())
      .then(data => {
        setBottle(data.bottle);
      })
      .catch(error => console.error(error));
  }, [index]);

  useEffect(() => {
    if (isAuthenticate && index) {
      fetch(`${import.meta.env.VITE_API_HOST}/rating/${index}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => setDbRate(data.rate.rating))
        .catch(error => console.error(error));
    }
  }, [isAuthenticate, index]);

  useEffect(() => {
    if (isAuthenticate && index && rateDelete) {
      fetch(`${import.meta.env.VITE_API_HOST}/rating/${index}`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(_data => {
          navigate(0);
        })
        .catch(error => console.error(error));
    }
  }, [isAuthenticate, index, rateDelete]);

  useEffect(() => {
    if (isAuthenticate && rateSubmit && userRate) {
      fetch(`${import.meta.env.VITE_API_HOST}/rating`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bottleId: index, rating: userRate }),
      })
        .then(response => response.json())
        .then(_data => {
          navigate(0);
        })
        .catch(error => console.error(error));
      setRateSubmit(false);
    }
  }, [isAuthenticate, rateSubmit, userRate]);

  useEffect(() => {
    if (isAuthenticate && userComment && commentSubmit) {
      fetch(`${import.meta.env.VITE_API_HOST}/comment`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bottleId: index, comment: userComment }),
      })
        .then(response => response.json())
        .then(_data => {
          navigate(0);
        })
        .catch(error => console.error(error));
    }
  }, [isAuthenticate, userComment, commentSubmit]);

  const handleSubmitRate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuthenticate) {
      setRateSubmit(true);
      return;
    }
    navigate('/login');
  };
  const handleDeleteRate = () => {
    if (isAuthenticate) {
      setRateDelete(true);
      return;
    }
    navigate('/login');
  };

  const handleComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuthenticate) {
      setCommentSubmit(true);
      return;
    }
    navigate('/login');
  };

  if (bottle)
    return (
      <>
        <section className="py-3 flex gap-2">
          <div className="bg-secondary size-bottle">
            <img
              src={bottlesPict[Math.floor(Math.random() * bottlesPict.length)]}
              className="size-bottle-img"
              alt={bottle.name}
            />
          </div>
          <div className="flex flex-col gap-2 size-bottle-text overflow-hidden">
            <div className="flex gap-4">
              <h1 className="text-primary text-xl font-bold font-title">
                {bottle.name}
              </h1>
              <LikeButton bottleId={bottle.id} />
            </div>
            <p>
              Pays d'origine: <strong>{bottle.country}</strong>
            </p>
            <p>
              Catégorie: <strong>{categories[bottle.categoryId - 1]}</strong>
            </p>
            <p>{bottle.description}</p>
            <div className="flex w-full justify-between gap-2">
              <Note note={bottle.avgRating} />
              {dbRate ? (
                <div className="flex items-center gap-1">
                  <p>Votre note: {dbRate} </p>
                  <Star size={20} weight="fill" color="gold" />
                  <button
                    className="flex items-center border py-1 box-shadow"
                    onClick={() => handleDeleteRate()}>
                    <Pencil size={20} />
                    changer la note
                  </button>
                </div>
              ) : (
                <form onSubmit={e => handleSubmitRate(e)}>
                  <label>
                    Noter ce rhum:
                    <select
                      name="note"
                      value={userRate}
                      onChange={e => setUserRate(Number(e.target.value))}
                      className="text-lg border p-1 m-2">
                      <option value={''}>notes</option>
                      <option value={'1'}>1</option>
                      <option value={'2'}>2</option>
                      <option value={'3'}>3</option>
                      <option value={'4'}>4</option>
                      <option value={'5'}>5</option>
                    </select>
                    <Star size={20} weight="fill" color="gold" />
                  </label>
                  <Button>Confirmer la note</Button>
                </form>
              )}
            </div>
          </div>
        </section>
        <hr className="my-4" />
        <section>
          <h2 className="text-lg m-b-3">
            {bottle.comments.length} Commentaires
          </h2>
          <form onSubmit={e => handleComment(e)}>
            <label>
              Laisser un commentaire:
              <br />
              <textarea
                required
                name="comment"
                value={userComment}
                onChange={e => setUserComment(e.target.value)}
                className="border comments-input text-md p-1"
              />
            </label>
            <Button>Envoyer</Button>
          </form>
          <ul className="w-full flex flex-col items-center py-3">
            {bottle.comments.map(({ id, comment, user }) => (
              <li
                key={'comm' + id}
                className="my-2 border p-2 comments-w bg-secondary-15 box-shadow">
                <div className="inline">
                  {user.avatar ? (
                    <div className="avatar-sm overflow-hidden mx-3 rounded-full box-shadow">
                      <img
                        src={`${import.meta.env.VITE_API_HOST.replace('/api', '')}/${user.avatar}`}
                        alt={`${user.pseudo} avatar`}
                        className="avatar-img"
                      />
                    </div>
                  ) : (
                    <div className="avatar-sm overflow-hidden mx-3 rounded-full box-shadow">
                      <img
                        src={`${import.meta.env.VITE_API_HOST.replace('/api', '')}/uploads/default.png`}
                        alt={`${user.pseudo} avatar`}
                        className="avatar-img"
                      />
                    </div>
                  )}
                  <div className="w-80">
                    <p className="font-bold text-secondary m-b-1">
                      {user.pseudo}
                    </p>
                    <p>{comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
};

export default BottleShow;
