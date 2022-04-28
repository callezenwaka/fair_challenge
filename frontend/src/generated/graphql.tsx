import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Email = {
  __typename?: 'Email';
  address: Scalars['String'];
  id: Scalars['Int'];
  tokens?: Maybe<Array<Token>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteToken: Token;
  postEmail: Email;
  postToken: Token;
  removeEmail: Email;
  /** This resolves email reminder mutation. */
  setReminder: Token;
  updateEmail: Email;
  updateToken: Token;
};


export type MutationDeleteTokenArgs = {
  id: Scalars['Int'];
};


export type MutationPostEmailArgs = {
  postEmailInput: PostEmailInput;
};


export type MutationPostTokenArgs = {
  postTokenInput: PostTokenInput;
};


export type MutationRemoveEmailArgs = {
  id: Scalars['Int'];
};


export type MutationSetReminderArgs = {
  reminderInput: ReminderInput;
};


export type MutationUpdateEmailArgs = {
  updateEmailInput: UpdateEmailInput;
};


export type MutationUpdateTokenArgs = {
  updateTokenInput: UpdateTokenInput;
};

export type Query = {
  __typename?: 'Query';
  getEmail: Email;
  getEmails: Array<Email>;
  token: Token;
  tokens: Array<Token>;
};


export type QueryGetEmailArgs = {
  id: Scalars['Int'];
};


export type QueryTokenArgs = {
  id: Scalars['Int'];
};

export type Token = {
  __typename?: 'Token';
  emails?: Maybe<Array<Email>>;
  id: Scalars['Int'];
  launch?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
};

export type UpdateEmailInput = {
  address?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type PostEmailInput = {
  address: Scalars['String'];
};

export type PostTokenInput = {
  launch?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
};

export type ReminderInput = {
  address: Scalars['String'];
  id: Scalars['Int'];
};

export type UpdateTokenInput = {
  id: Scalars['Int'];
  launch?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
};

export type GetTokenQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTokenQuery = { __typename?: 'Query', token: { __typename?: 'Token', id: number, name: string, launch?: any | null } };

export type GetTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', id: number, name: string, launch?: any | null }> };


export const GetTokenDocument = gql`
    query getToken($id: Int!) {
  token(id: $id) {
    id
    name
    launch
  }
}
    `;

/**
 * __useGetTokenQuery__
 *
 * To run a query within a React component, call `useGetTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTokenQuery(baseOptions: Apollo.QueryHookOptions<GetTokenQuery, GetTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTokenQuery, GetTokenQueryVariables>(GetTokenDocument, options);
      }
export function useGetTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokenQuery, GetTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTokenQuery, GetTokenQueryVariables>(GetTokenDocument, options);
        }
export type GetTokenQueryHookResult = ReturnType<typeof useGetTokenQuery>;
export type GetTokenLazyQueryHookResult = ReturnType<typeof useGetTokenLazyQuery>;
export type GetTokenQueryResult = Apollo.QueryResult<GetTokenQuery, GetTokenQueryVariables>;
export const GetTokensDocument = gql`
    query getTokens {
  tokens {
    id
    name
    launch
  }
}
    `;

/**
 * __useGetTokensQuery__
 *
 * To run a query within a React component, call `useGetTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokensQuery(baseOptions?: Apollo.QueryHookOptions<GetTokensQuery, GetTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTokensQuery, GetTokensQueryVariables>(GetTokensDocument, options);
      }
export function useGetTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokensQuery, GetTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTokensQuery, GetTokensQueryVariables>(GetTokensDocument, options);
        }
export type GetTokensQueryHookResult = ReturnType<typeof useGetTokensQuery>;
export type GetTokensLazyQueryHookResult = ReturnType<typeof useGetTokensLazyQuery>;
export type GetTokensQueryResult = Apollo.QueryResult<GetTokensQuery, GetTokensQueryVariables>;