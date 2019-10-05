const initialState = {
  currDevice: {},
  list: [
    {
      _id: 101,
      name: 'Galaxy Note 9',
    },
    {
      _id: 103,
      name: 'Galaxy s7',
    },
    {
      _id: 102,
      name: 'iPhone 8',
    },
    {
      _id: 104,
      name: 'iPhone 10',
    },
    {
      _id: 105,
      name: 'iPhone 11',
    },
    {
      _id: 106,
      name: 'iPhone 12',
    },
    {
      _id: 107,
      name: 'iPhone 13',
    },
    {
      _id: 108,
      name: 'iPhone 14',
    },
    {
      _id: 109,
      name: 'iPhone 15',
    },
    {
      _id: 110,
      name: 'iPhone 16',
    },
    {
      _id: 111,
      name: 'iPhone 17',
    },
    {
      _id: 112,
      name: 'iPhone 18',
    },
  ]
}

function getData() {
  return Promise.resolve(initialState)
}

export default {
  getData,
}
