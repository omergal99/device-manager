const initialState = {
  list: [
    {
      _id: 'S1001',
      name: 'Server 1',
      language: 'Node.js',
      DB: 'MongoDB',
    },
  ]
}

function getData() {
  return Promise.resolve(initialState)
}

export default {
  getData,
}
