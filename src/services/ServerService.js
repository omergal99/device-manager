const initialState = {
  list: [
    {
      _id: 'S1001',
      name: 'Server S1001',
      type: 'Server',
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
