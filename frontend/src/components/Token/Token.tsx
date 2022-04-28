import React, { useState } from 'react';
import { GetTokenQuery, useUpdateTokenMutation } from '../../generated/graphql';
import Reminder from "../Reminder";
import './Token.css';
import avatar from '../../assets/avatar.png';

interface Props {
  data: GetTokenQuery;
}

const className = 'Token';

const Token: React.FC<Props> = ({ data }) => {
  const { id } = data.token;
  const [updateToken] = useUpdateTokenMutation();
  const [name, setName] = useState<string>('');
  const [launch, setLaunch] = useState<Date>();
  const [editing, setEditing] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(id, name, launch);
    updateToken({
      variables: {
        id,
        name,
        launch,
      },
    });
    setEditing(false);
  };

  if (!data.token) {
    return <div>No launch available</div>;
  }
  
  if (modal) {
    return <Reminder id={data.token.id} closeModal={setModal} />;
  }

  if (editing) {
    return (
      <div className='w-full md:w-1/2 mr-auto ml-auto p-2 my-12 relative'>
        <h1 className={`${className}__title pb-4`}>{data.token.name}</h1>
        <button type="button" className={`absolute top-1.5 right-4 text-2xl`} onClick={() => setEditing(false)}>&#10005;</button>
        <form className={`flex flex-col`}>
          <div className="w-full text-left mb-6">
            <label className=''>Name: </label>
            <input
              placeholder="Premium Token"
              className="w-full p-2.5 border-b-2 border-slate-700 border-solid"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full text-left mb-6">
            <label htmlFor='launch' className=''>Date: </label>
            <input 
              type="datetime-local" 
              id="launch" 
              name="launch" 
              placeholder="Launch date"
              className="w-full p-2.5 border-b-2 border-slate-700 border-solid"
              onChange={(e) => setLaunch(new Date(e.target.value))}
            />
          </div>
          <div className='w-full text-center mb-6'>
            <button
              type='button'
              className="w-full py-2 px-2 border-solid border-2 border-slate-700 rounded-md bg-slate-700 hover:bg-slate-400 text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full md:w-1/2 mr-auto ml-auto px-2 my-12 relative`}>
      <h1 className={`${className}__title pb-4`}>{data.token.name}</h1>
      <button type="button" className={`absolute top-1.5 right-4 text-2xl`} onClick={() => setEditing(true)}>&#9998;</button>
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

export default Token;