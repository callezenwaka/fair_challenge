import * as React from 'react';
import { useGetTokenQuery } from '../../generated/graphql';
import Token from './Token';

interface OwnProps {
  id: number;
}

const TokenContainer: React.FC<OwnProps> = ({ id }) => {
  const { data, error, loading, refetch } = useGetTokenQuery({
    variables: { id },
  });
  React.useEffect(() => {
    refetch({ id });
  }, [refetch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR</div>;
  }

  if (!data) {
    return <div>Select a flight from the panel</div>;
  }

  return <Token data={data} />;
};

export default TokenContainer;