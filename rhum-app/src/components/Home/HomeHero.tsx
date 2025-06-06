import Button from '../common/Button';

import barrelUrl from '../../assets/images/barrel.png';
import palmTreeUrl from '../../assets/images/tall-palmtree.png';

const HomeHero = () => {
  return (
    <section className="relative overflow-hidden h-hero p-10 bg-secondary-50 m-no-x-main flex justify-center items-center">
      <img src={palmTreeUrl} alt="palm tree" className="palm" />
      <div className="flex cta-hero flex-col gap-5">
        <div>
          <h1 className="text-title text-primary">RHUM.</h1>
          <p className="text-accent font-nav text-xl">Le site des passionnés</p>
        </div>
        <Button asNavLink href="/bottles" isBig>
          Voir les bouteilles
        </Button>
      </div>
      <img src={barrelUrl} alt="two barrel" className="barrel" />
    </section>
  );
};

export default HomeHero;
