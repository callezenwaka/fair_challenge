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

const className = 'Reminder';

const Reminders: React.FC<Props> = (Props) => {
  const [address, setAddress] = useState<string>('');
  const [setReminder] = useSetReminderMutation();

  const handleReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    setReminder({
      variables: {
        id: Props.id,
        address,
      },
    });
    Props.handleModal(false)
  };

  return (
    <div className={`${className}__form w-full md:w-1/2 mr-auto ml-auto p-2 my-12 relative rounded-md h-72 shadow-md`}>
      <h1 className={`mt-0 mb-1 pb-4`}>Get reminded about Shapes of Tokyo</h1>
      <button type="button" className={`absolute top-1.5 right-4 text-2xl`} onClick={() => Props.handleModal(false)}>&#10005;</button>
      <form className={`flex flex-col`}>
        <div className="w-full text-left mb-6">
          <label htmlFor="email" className=''>Email: *</label>
          <input
            placeholder="john.doe@mail.com"
            id="email" name="email"
            className="w-full p-2.5 border-b-2 border-2 border-slate-700 border-solid"
            onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="w-full text-left mb-6">
          <label htmlFor="agree" className='text-left pr-4'>
            Agree to our terms and Conditions
          </label>
          <input type="checkbox" id="agree" name="agree" value="true" />
        </div>
        <div className='w-full text-right mb-6'>
          <button
            type='button'
            className="py-1.5 px-4 border-solid border-black border-2 rounded-xl text-black"
            onClick={handleReminder}
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reminders;