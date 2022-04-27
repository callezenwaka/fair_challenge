import * as React from 'react';
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
    <h3>Tokens</h3>
    <ul className={`${className}__list`}>
      {!!data.tokens &&
        data.tokens.map(
          (token, i) =>
            !!token && (
              <li
                key={token.id}
                className={`${className}__item`}
                onClick={() => handleIdChange(token.id!)}
              >
                <img 
                  src={avatar}
                  className={`${className}__image`}
                  alt={`${token?.name} ${i}`} 
                />
                {token.name} ({token.launch? token.launch : `TBD`})
                {/* {token.launch && ` (${token.launch} | TBD)`} */}
              </li>
            ),
        )
      }
    </ul>
  </div>
);

export default Tokens;

// function Tokens() {
//   const { data, loading } = useQuery<Token[]>(GET_TOKENS);
//   console.log(data);
//   console.log(loading);

//   const {tokens} = data;
//   console.log(tokens);

//   // const [deleteUser] = useMutation(DELETE_USER);

//   return (
//     <div className="Token">
//       {/* Loading!!! getTokens */}
//       {data &&
//         data.tokens.map((token: Token) => {
//           return (
//             <div key={token.id}>
//               <img src={avatar} className="Token-logo" alt="logo" />
//               {token.name} / {token.launch}
//             </div>
//           );
//         })
//       }
//     </div>
//   );
// }

// export default Tokens;