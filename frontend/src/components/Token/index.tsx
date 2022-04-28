import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTokenQuery } from '../../generated/graphql';
import Token from './Token';

const TokenContainer: React.FC = () => {
  let { id } = useParams();

  const { data, error, loading, refetch } = useGetTokenQuery({
    variables: { id: Number(id) },
  });
  React.useEffect(() => {
    refetch({ id: Number(id) });
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