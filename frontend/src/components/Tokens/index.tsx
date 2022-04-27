import * as React from 'react';
import { useGetTokensQuery } from '../../generated/graphql';
import Tokens, { OwnProps } from './Tokens';

const TokensContainer: React.FC<OwnProps> = (props) => {
  const { data, error, loading } = useGetTokensQuery();
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <Tokens data={data} {...props} />;
};

export default TokensContainer;