import { FC } from 'react';
import { Link } from "react-router-dom";
import { GetTokensQuery } from '../../generated/graphql';
import avatar from '../../assets/avatar.png';
interface Props {
  data: GetTokensQuery;
}

const Tokens: FC<Props> = ({ data }) => {

  return (
    <div className="flex flex-col items-center text-center pb-8 px-2">
      <h3 className='py-8'>NFT Collections</h3>
      <ul className={`flex flex-row flex-wrap content-center justify-around gap-10`}>
        {!!data.tokens &&
          data.tokens.map(
            (token, i) =>
              !!token && (
                <Link key={`${token}_${i}`} to={`/token/${token.id}`} className='w-full md:w-1/4 border-2 border-solid hover:shadow-md pb-8 cursor-pointer'>
                  <li key={token.id} className={`cursor-pointer`}>
                    <img src={avatar} className={`w-full h-auto pointer-events-none`} alt={`${token?.name}_${i}`} />
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