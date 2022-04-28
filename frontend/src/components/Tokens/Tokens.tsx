import { FC } from 'react';
import { Link } from "react-router-dom";
import { GetTokensQuery } from '../../generated/graphql';
import './Tokens.css';
import avatar from '../../assets/avatar.png';

// export interface OwnProps {
//   handleIdChange: (newId: number) => void;
// }

// interface Props extends OwnProps {
//   data: GetTokensQuery;
// }

interface Props {
  data: GetTokensQuery;
}

const className = 'Tokens';

const Tokens: FC<Props> = ({ data }) => {

  return (
    <div className="flex flex-col items-center text-center pb-8 px-2">
      <h3 className='py-8'>Tokens</h3>
      <ul className={`${className}__list flex flex-row flex-wrap content-center justify-around gap-10`}>
        {!!data.tokens &&
          data.tokens.map(
            (token, i) =>
              !!token && (
                <Link key={`${token}_${i}`} to={`/token/${token.id}`} className='w-full md:w-1/4 border-2 border-solid hover:shadow-md pb-8 cursor-pointer'>
                  <li key={token.id} className={`${className}__item`}>
                    <img src={avatar} className={`${className}__image`} alt={`${token?.name}_${i}`} />
                    <p>{token.name}</p>
                    <p>Goes live on: {token.launch? new Date(token.launch).toUTCString() : `TBD`}</p>
                  </li>
                </Link>
              ),
          )
        }
      </ul>
    </div>
  )
};

export default Tokens;