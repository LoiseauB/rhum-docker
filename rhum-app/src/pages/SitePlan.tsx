import { NavLink } from 'react-router-dom';

const SitePlan = () => {
  return (
    <>
      <h1 className='text-xl m-b-2'>Plan du site</h1>
      <ul>
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li>
          <NavLink to="/bottles">Bouteilles</NavLink>
        </li>
        <li>
          <NavLink to="/login">Connexion</NavLink>
        </li>
        <li>
          <NavLink to="/register">Inscription</NavLink>
        </li>
        <li>
          <NavLink to="/legals">Mentions Légales</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </>
  );
};
export default SitePlan;
