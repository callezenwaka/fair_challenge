import * as React from 'react';
import { useState } from 'react';
import { useSetReminderMutation } from '../../generated/graphql';
import './Reminder.css';

export interface OwnProps {
  handleModal: (isModal: boolean) => void;
}

interface Props extends OwnProps {
  id: number;
}

// interface Props {
//   id: number;
//   // isModal: boolean;
// }

const className = 'Reminder';

const Reminders: React.FC<Props> = (Props) => {
  const [address, setAddress] = useState<string>('');
  // const [modal, setModal] = useState<boolean>(false);
  const [setReminder] = useSetReminderMutation();
  // const { data, error, loading, refetch } = useGetTokenQuery({
  //   variables: { id: Number(id) },
  // });

  // const handleChange = (e: Event) => {
  //   e.preventDefault();
  //   const target = e.target as HTMLInputElement;
  //   setAddress(target.value);
  // }

  const handleReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    // setAddress(address);
    setReminder({
      variables: {
        id: Props.id,
        address,
      },
    });
    console.log(Props.id, address);
    // setAddress('');
    // isModal = false;
    // setModal(false);
    Props.handleModal(false)
    // Props.handleModal(false);
  };

  return (
    <div className='w-full md:w-1/2 mr-auto ml-auto p-2 my-12 relative'>
      <h1 className={`${className}__title pb-4`}>Set Reminder</h1>
      <button type="button" className={`absolute top-1.5 right-4 text-2xl`} onClick={() => Props.handleModal(false)}>&#10005;</button>
      <form className={`flex flex-col`}>
        <div className="w-full text-left mb-6">
          <label className=''>Email: </label>
          <input
            placeholder="john.doe@mail.com"
            className="w-full p-2.5 border-b-2 border-slate-700 border-solid"
            onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className='w-full text-center mb-6'>
          <button
            type='button'
            className="w-full py-2 px-2 border-solid border-2 border-slate-700 rounded-md bg-slate-700 hover:bg-slate-400 text-white"
            onClick={handleReminder}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reminders;