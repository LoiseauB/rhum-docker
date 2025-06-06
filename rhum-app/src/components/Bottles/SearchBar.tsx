import { useContext } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

import { CategoryContext, SearchContext } from '../../pages/Bottles';

import palmTreeUrl from '../../assets/images/tall-palmtree.png';
import { categories } from '../../config/categories';
import Button from '../common/Button';

const SearchBar = () => {
  const setSearch = useContext(SearchContext);
  const { category, setter } = useContext(CategoryContext);
  return (
    <section className="relative overflow-hidden h-hero p-10 bg-secondary-50 m-no-x-main flex justify-center items-center">
      <img src={palmTreeUrl} alt="palm tree" className="palm" />
      <img src={palmTreeUrl} alt="palm tree" className="search-palm" />
      <search className="search-size">
        <p className="text-primary text-title text-xl text-center m-b-4">
          Rechercher une bouteille
        </p>
        <form className="flex justify-between items-center bg-white size-full rounded-lg search-border px-4">
          <input
            type="text"
            placeholder="Trois rivières"
            className="search-input text-lg"
            onChange={e => setSearch(e.target.value)}
          />
          <MagnifyingGlass size={32} className="search-icon" />
        </form>
        <div className="flex justify-center m-t-4 gap-2">
          {!category ? (
            <>
              {categories.map((cat, index) => (
                <Button onClick={() => setter(index + 1)}>{cat}</Button>
              ))}
            </>
          ) : (
            <>
              {categories
                .filter((_, id) => id === category - 1)
                .map(cat => (
                  <Button onClick={() => setter(null)}>{cat} <X /></Button>
                ))}
            </>
          )}
        </div>
      </search>
    </section>
  );
};
export default SearchBar;
