import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import BottleCard from '../../components/Bottles/BottleCard';
import SearchBar from '../../components/Bottles/SearchBar';
import { BottleType } from '../../types/bottles';
import { categories } from '../../config/categories';
import useTitle from '../../hooks/useTitle';
export const SearchContext = createContext<Dispatch<SetStateAction<string>>>(
  () => {},
);
type CategoryContextType = {
  category: number | null;
  setter: Dispatch<SetStateAction<number | null>>;
};
export const CategoryContext = createContext<CategoryContextType>({
  category: null,
  setter: () => {},
});
const Bottles = () => {
  useTitle('Les Bouteilles')
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const [bottles, setBottles] = useState<BottleType[]>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_HOST}/bottle`)
      .then(response => response.json())
      .then(data => setBottles(data.bottles))
      .catch(error => console.error(error));
  },[]);
  return (
    <>
      <SearchContext.Provider value={setSearch}>
        <CategoryContext.Provider value={{ category, setter: setCategory }}>
          <SearchBar />
          <section className="py-3">
            <ul className="px-4">
              {bottles &&
                bottles
                  .filter(({ name }) =>
                    name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .filter(({ categoryId }) =>
                    categoryId === (category ? category : categoryId),
                  )
                  .map(({ id, name, country, categoryId }) => (
                    <>
                      <li key={'bottle' + id} className="my-2 px-4">
                        <BottleCard
                          index={id}
                          name={name}
                          country={country}
                          category={categories[categoryId - 1]}
                        />
                      </li>
                      {id !== bottles.length && <hr />}
                    </>
                  ))}
            </ul>
          </section>
        </CategoryContext.Provider>
      </SearchContext.Provider>
    </>
  );
};

export default Bottles;
