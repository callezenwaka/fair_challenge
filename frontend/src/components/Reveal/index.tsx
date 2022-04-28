import React, { useEffect, useState } from 'react';
import Reveal from './Reveal';

const RevealContainer = () => {
  const [nfts, setNfts] = useState<number[]>();

  useEffect(() => {
    setTimeout( async () => {
      setNfts([1, 2, 3, 4])
    }, 5000);
  });

  if (!nfts) {
    return (
      <div>
        <h3 className='py-8'>Latest NFTs</h3>
        <div className='flex flex-row flex-wrap gap-5 md:gap-0'>
          {[1, 2, 3, 4].map((element, i) => (
            <div key={i} className='w-full md:w-1/4 px-5'>
              <div className='w-full h-52 bg-gray-300 animate-pulse'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className='py-8'>Latest NFTs</h3>
      <div className='flex flex-row flex-wrap justify-between content-center gap-5 md:gap-0'>
        {nfts.map((element, i) => (
          <Reveal key={i} id={ i }/>
        ))}
      </div>
    </div>
  );
};

export default RevealContainer;