import * as React from 'react';
import Reminder from './Reminder';

export interface MainProps {
  closeModal: (isClose: boolean) => void;
}

interface OwnProps extends MainProps {
  id: number;
}

const ReminderContainer: React.FC<OwnProps> = (OwnProps) => {
  const handleModal = (isModal: boolean) => {
    console.log(isModal);
    OwnProps.closeModal(isModal)
  }

  return <Reminder id={OwnProps.id} handleModal={handleModal} />;
};

export default ReminderContainer;