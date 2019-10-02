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
      name: 'iPhone X',
    },
  ]
}

function getData() {
  return Promise.resolve(initialState)
}

export default {
  getData,
}
