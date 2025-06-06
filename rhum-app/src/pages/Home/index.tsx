import { BeerBottle, MagnifyingGlass, PlusCircle } from '@phosphor-icons/react';

import HomeHero from '../../components/Home/HomeHero';
import useTitle from '../../hooks/useTitle';

const HomePage = () => {
  useTitle('Accueil')
  return (
    <>
      <HomeHero />
      <section className="p-10 flex justify-center gap-5">
        <div className="flex flex-col items-center w-home-text gap-3">
          <BeerBottle size={106} weight="fill" className="icon-home" />
          <p className="text-lg">
            Découvre un répertoire de rhum avec leur fiche technique
          </p>
        </div>
        <div className="flex flex-col items-center w-home-text gap-3">
          <PlusCircle size={106} weight="fill" className="icon-home" />
          <p className="text-lg">
            Ajoute tes bouteilles préférées dans ta collection
          </p>
        </div>
        <div className="flex flex-col items-center w-home-text gap-3">
          <MagnifyingGlass size={106} className="icon-home" />
          <p className="text-lg">
            Trouve ta prochaine dégustation grâce à notre système de recherche
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
