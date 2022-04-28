import React from 'react';
import { GetTokensQuery } from '../../generated/graphql';
import './Tokens.css';
import avatar from '../../assets/avatar.png';

export interface OwnProps {
  handleIdChange: (newId: number) => void;
}

interface Props extends OwnProps {
  data: GetTokensQuery;
}

const className = 'Tokens';

const Tokens: React.FC<Props> = ({ data, handleIdChange }) => (
  <div className="flex flex-col items-center text-center">
  {/* <div className={className}> */}
    <h3 className='py-8'>Tokens</h3>
    <ul className={`${className}__list flex flex-row flex-wrap content-center justify-around gap-10`}>
      {!!data.tokens &&
        data.tokens.map(
          (token, i) =>
            !!token && (
              <li
                key={token.id}
                className={`${className}__item w-full md:w-1/4 py-8 cursor-pointer`}
                onClick={() => handleIdChange(token.id!)}
              >
                <img 
                  src={avatar}
                  className={`${className}__image`}
                  alt={`${token?.name} ${i}`} 
                />
                {token.name} {token.launch? token.launch : `TBD`}
              </li>
            ),
        )
      }
    </ul>
  </div>
);

export default Tokens;