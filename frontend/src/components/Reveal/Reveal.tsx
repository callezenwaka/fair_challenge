import React, { useState } from 'react';
import avatar from '../../assets/avatar.png';
import './Reveal.css';

interface Props {
  id: number;
}

// hidden hover:block
const Reveal: React.FC<Props> = ({ id }) => {
  const [reveal, setReveal] = useState<boolean>(true);

  const handleReveal = () => {
    setReveal(!reveal);
  };

  return (
    <div className="w-full md:w-1/4 px-5 relative">{reveal}
      <img src={avatar} className={`${reveal? "blur" : "animate-reveal"} w-full`} alt={`${ id }`} />
      {reveal && <button type='button' onClick={handleReveal} className='opacity-0 hover:opacity-100  absolute text-white bg-transparent border-none left-0 right-0 absolute inset-y-0 left-0'>Click to reveal</button>}
    </div>
  );
}

export default Reveal;
