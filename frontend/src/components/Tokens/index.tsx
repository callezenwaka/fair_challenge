import { FC } from 'react';
import { useGetTokensQuery } from '../../generated/graphql';
import Tokens from './Tokens';

const TokensContainer: FC = () => {
  const { data, error, loading } = useGetTokensQuery();

  if (loading || !data) {
    return (
      <div className='px-2'>
        <h3 className='py-8'>NFT Collections</h3>
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

  if (error) {
    return <div>ERROR</div>;
  }

  return <Tokens data={data} />;
};

export default TokensContainer;