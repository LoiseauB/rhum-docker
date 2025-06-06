import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import {
  CaretDown,
  CaretUp,
  EnvelopeSimple,
  PencilSimple,
  Trash,
  UserSwitch,
} from '@phosphor-icons/react';
import { userType } from '../../types/user';
import classNames from 'classnames';
import { CommentType } from '../../types/comments';
import useTitle from '../../hooks/useTitle';
import EditAdminModal from '../User/EditAdminModal';

const AdminDashboard = () => {
  useTitle('Espace Admin');
  const { isAuthenticate, role } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [users, setUsers] = useState<userType[]>();
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState<CommentType[]>();
  const [isModal, setIsModal] = useState(false);
  const [modalUser, setModalUser] = useState<userType | undefined>();
  useEffect(() => {
    if (!isAuthenticate) {
      navigate('/login');
    }
    if (!isAuthenticate && role !== 'ADMIN') {
      navigate('/profile');
    }
  }, [isAuthenticate, navigate, role]);

  useEffect(() => {
    if (isAuthenticate && role === 'ADMIN' && !users) {
      fetch(`${import.meta.env.VITE_API_HOST}/admin/users`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          setUsers(data.users);
        })
        .catch(err => console.error(err));
    }
  }, [isAuthenticate, role, users]);

  useEffect(() => {
    if (isAuthenticate && role === 'ADMIN' && !comments) {
      fetch(`${import.meta.env.VITE_API_HOST}/admin/comments`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          setComments(data.comments);
        })
        .catch(err => console.error(err));
    }
  }, [isAuthenticate, role, comments]);

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/admin/users`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: id }),
        },
      );
      const result = await response.json();
      console.log(result);
      alert('Utilisateur supprimé');
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = async (id: number, role: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/admin/users`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: id,
            role: role === 'USER' ? 'ADMIN' : 'USER',
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      alert("Rôle de l'utilisateur modifié");
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (
    id: number,
    userId: number,
    bottleId: number,
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/admin/comments`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, userId, bottleId }),
        },
      );
      const result = await response.json();
      console.log(result);
      alert('Commentaire supprimé');
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isModal && modalUser && (
        <EditAdminModal onClose={() => setIsModal(false)} user={modalUser} />
      )}
      <h1 className="text-xl m-b-4">Espace administrateur</h1>
      <section className="m-b-4">
        <Button isBig onClick={() => setIsUser(prev => !prev)}>
          Utilisateurs{' '}
          {isUser ? <CaretUp size={20} /> : <CaretDown size={20} />}
        </Button>
        <table
          border={1}
          style={{ borderCollapse: 'collapse' }}
          className={classNames(
            { 'visible-none': !isUser, 'visible-table': isUser },
            'w-full m-t-2',
          )}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Pseudo</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && !!users.length && (
              <>
                {users.map(({ id, email, pseudo, role }, index) => (
                  <tr
                    key={'user' + index}
                    className={classNames({
                      'bg-secondary-30': (index + 1) % 2 === 0,
                    })}>
                    <td>{id}</td>
                    <td>{email}</td>
                    <td>{pseudo}</td>
                    <td>{role}</td>
                    <td>
                      <div className="flex w-full justify-center gap-2">
                        <button
                          onClick={() => handleEditUser(id, role)}
                          className="flex items-center gap-2">
                          <UserSwitch size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setModalUser({ id, email, pseudo, role });
                            setIsModal(true);
                          }}
                          className="flex items-center gap-2">
                          <PencilSimple size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(id)}
                          className="flex items-center">
                          <Trash size={18} fill="red" />
                        </button>
                        <a
                          href={`mailto:${email}`}
                          className="flex items-center">
                          <EnvelopeSimple size={18} fill="blue" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </section>
      <section>
        <Button isBig onClick={() => setIsComment(prev => !prev)}>
          Commentaires{' '}
          {isComment ? <CaretUp size={20} /> : <CaretDown size={20} />}
        </Button>
        <table
          border={1}
          style={{ borderCollapse: 'collapse' }}
          className={classNames(
            { 'visible-none': !isComment, 'visible-table': isComment },
            'w-full m-t-2',
          )}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Commentaire</th>
              <th>ID Bouteille</th>
              <th>ID Auteur</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments && !!comments.length && (
              <>
                {comments.map(({ id, comment, bottleId, userId }, index) => (
                  <tr
                    key={'user' + index}
                    className={classNames({
                      'bg-secondary-30': (index + 1) % 2 === 0,
                    })}>
                    <td>{id}</td>
                    <td>{comment}</td>
                    <td>{bottleId}</td>
                    <td>{userId}</td>
                    <td>
                      <div className="flex w-full justify-center gap-2">
                        <button
                          onClick={() =>
                            handleDeleteComment(id, userId, bottleId)
                          }
                          className="flex items-center">
                          <Trash size={18} fill="red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AdminDashboard;
