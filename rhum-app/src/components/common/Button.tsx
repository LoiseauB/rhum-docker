import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  asNavLink?: boolean;
  href?: string;
  isBig?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = ({ asNavLink, href, isBig, children, onClick }: Props) => {
  if (asNavLink) {
    return (
      <NavLink
        to={href ? href : '/'}
        className={classNames(
          { 'w-full': isBig },
          'btn btn-primary box-shadow',
        )}>
        {children}
      </NavLink>
    );
  }
  return (
    <button
      onClick={onClick}
      className={classNames({ 'w-full': isBig }, 'btn btn-primary box-shadow')}>
      {children}
    </button>
  );
};

export default Button;
