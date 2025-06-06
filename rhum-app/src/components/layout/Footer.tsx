import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-secondary p-3 flex justify-center gap-2">
    <Link to="/contact">Contact</Link>
    <Link to="/plan">Plan du site</Link>
    <Link to="/legals">Mentions légales</Link>
  </footer>
);

export default Footer;
