import * as React from 'react';
import { GetTokenQuery } from '../../generated/graphql';
import './Token.css';
import avatar from '../../assets/avatar.png';

interface Props {
  data: GetTokenQuery;
}

const className = 'Token';

const Tokens: React.FC<Props> = ({ data }) => {
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