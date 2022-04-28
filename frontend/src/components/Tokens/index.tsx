import { FC } from 'react';
import { useGetTokensQuery } from '../../generated/graphql';
import Tokens from './Tokens';

const TokensContainer: FC = () => {
  const { data, error, loading } = useGetTokensQuery();
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <Tokens data={data} />;
};

export default TokensContainer;