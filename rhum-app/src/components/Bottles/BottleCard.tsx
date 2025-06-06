import { NavLink } from 'react-router-dom';

import Button from '../common/Button';
import LikeButton from '../common/LikeButton';
import { bottlesPict } from '../../config/bottlesPict';

type Props = {
  name: string;
  index: number;
  country: string;
  category: string;
};

const BottleCard = ({ index, name, country, category }: Props) => (
  <article className="flex gap-2">
    <div className="bg-secondary size-bottle">
      <img
        src={bottlesPict[Math.floor(Math.random() * bottlesPict.length)]}
        className="size-bottle-img"
        alt={name}
      />
    </div>
    <div className="flex flex-col gap-2 size-bottle-text overflow-hidden">
      <NavLink
        to={'/bottles/' + index + '?name=' + name}
        className="text-nav text-primary">
        {name}
      </NavLink>
      <p>Pays d'origine: {country}</p>
      <p>Catégorie: {category}</p>
      <div className="flex w-full justify-end gap-2">
        <LikeButton bottleId={index} />
        <Button asNavLink href={'/bottles/' + index + '?name=' + name}>
          Voir les détails
        </Button>
      </div>
    </div>
  </article>
);

export default BottleCard;
