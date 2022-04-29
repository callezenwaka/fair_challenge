const collections = [
  {
    id: 10,
    name: 'Ten',
    launch: '2022-05-15T11:45:00.765Z',
  },
  {
    id: 8,
    name: 'Eight',
    launch: null,
  },
  {
    id: 6,
    name: 'Six',
    launch: '2022-05-11T11:45:00.765Z',
  },
  {
    id: 7,
    name: 'Seven',
    launch: null,
  },
  {
    id: 2,
    name: 'Two',
    launch: null,
  },
  {
    id: 5,
    name: 'Five',
    launch: '2022-05-22T11:45:00.765Z',
  },
  {
    id: 4,
    name: 'Four',
    launch: '2022-06-30T11:45:00.765Z',
  },
  {
    id: 1,
    name: 'One',
    launch: null,
  },
  {
    id: 3,
    name: 'Three',
    launch: null,
  },
  {
    id: 9,
    name: 'Nine',
    launch: null,
  },
];

const mails: { id: number; address: string }[] = [];

export const tokens = Promise.all(
  collections.map(async (collection) => {
    return {
      id: collection.id,
      name: collection.name,
      launch: collection.launch ? new Date(collection.launch) : null,
    };
  }),
);

export const emails = Promise.all(mails);
