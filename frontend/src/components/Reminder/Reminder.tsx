import * as React from 'react';
import { GetTokenQuery } from '../../generated/graphql';
import './Reminder.css';
import avatar from '../../assets/avatar.png';

interface Props {
  data: GetTokenQuery;
}

const className = 'Reminder';

const Reminders: React.FC<Props> = ({ data }) => {
  if (!data.token) {
    return <div>No launch available</div>;
  }

  return (
    <div className={className}>
      <h1 className={`${className}__title`}>
        {data.token.name}
        {data.token.launch &&
          ` (${data.token.launch})`}
      </h1>
      <p className={`${className}__description`}>Click to reveal</p>
      <img
        src={avatar}
        className={`${className}__image`}
        key={data.token.id}
        alt={`${data.token?.name}`}
      />
    </div>
  );
};

export default Reminders;