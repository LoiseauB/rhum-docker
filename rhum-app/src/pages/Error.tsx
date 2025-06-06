import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex justify-center items-center p-3 text-2xl">
      Oups... Il y a eu une erreur
    </div>
  );
};

export default Error;
