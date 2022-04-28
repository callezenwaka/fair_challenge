import React, { useState } from 'react';
import { GetTokenQuery } from '../../generated/graphql';
import Reminder from "../Reminder";
import './Token.css';
import avatar from '../../assets/avatar.png';

interface Props {
  data: GetTokenQuery;
}

const className = 'Token';

const Tokens: React.FC<Props> = ({ data }) => {
  const [modal, setModal] = useState<boolean>(false);

  if (!data.token) {
    return <div>No launch available</div>;
  }
  
  if (modal) {
    return <Reminder id={data.token.id} closeModal={setModal} />;
  }

  return (
    <div className={`flex flex-col w-full md:w-1/2 mr-auto ml-auto px-2`}>
      <h1 className={`${className}__title pb-4`}>{data.token.name}</h1>
      <img
        src={avatar}
        className={`${className}__image pb-4`}
        key={data.token.id}
        alt={`${data.token?.name}`}
      />
      <p className='pb-4'>Going live on {data.token.launch && `${new Date(data.token.launch).toUTCString()}`}</p>
      <button
        type='button' 
        onClick={() => setModal(true)} 
        className='py-2 px-2 border-solid border-2 rounded-md bg-slate-700 hover:bg-slate-400 text-white'>
          REMIND ME
        </button>
    </div>
  );
};

export default Tokens;