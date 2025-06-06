import { Star } from '@phosphor-icons/react';

const Note = ({ note }: { note: number }) => {
  const stars = [];
  for (let i = 0; i < note; i++) {
    stars.push(<Star key={'starFill'+i} weight="fill" size={42} color="gold" />);
  }
  for (let i = 0; i < 5 - note; i++) {
    stars.push(<Star key={'star'+i} size={42} color="gold" />);
  }
  return (
    <>
      <div className="flex">{stars}</div>
    </>
  );
};

export default Note;
