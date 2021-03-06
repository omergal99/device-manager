const initialState = {
  currDevice: null,
  list: [
    {
      _id: 'P101',
      name: 'Galaxy s7',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 120, y: 300 }, zIndex: 10 }],
      connections: [['R10', 'R11'], ['R11', 'P101']],
      manufacturer: 'Samsung',
      operatingSystem: 'Android',
      publishDate: '2017',
      networkType: 'LTE',
      generation: 4,
      memory: '128GB',
      RAM: '6GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P102',
      name: 'Galaxy Note 9',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 120, y: 300 }, zIndex: 10 }],
      connections: [['R10', 'R11'], ['R10', 'P102']],
      manufacturer: 'Samsung',
      operatingSystem: 'Android',
      publishDate: '2018',
      networkType: 'LTE',
      generation: 4,
      memory: '128GB',
      RAM: '6GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P103',
      name: 'HP 255 G7',
      type: 'Computer',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 120, y: 300 }, zIndex: 10 }],
      connections: [['R10', 'R11']],
      manufacturer: 'HP',
      operatingSystem: 'Windows',
      publishDate: '2020',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '8GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P104',
      name: 'Dell Inspiron 15',
      type: 'Computer',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 120, y: 300 }, zIndex: 10 }],
      connections: [['R11', 'P104']],
      manufacturer: 'Dell',
      operatingSystem: 'Windows',
      publishDate: '2020',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '16GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P105',
      name: 'iPhone 10',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 400, y: 135 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 150, y: 400 }, zIndex: 10 },
      { _id: 'S1001', type: 'Server', name: 'Server S1001', location: { x: 350, y: 550 }, zIndex: 10 }],
      connections: [['R10', 'R11'], ['R11', 'P105'], ['R10', 'P105'] , ['S1001', 'R11']],
      manufacturer: 'Apple',
      operatingSystem: 'iOS',
      publishDate: '2020',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '4GB',
      processor: '2700 1800 MHz',
      location: { x: 120, y: 130 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P106',
      name: 'iPhone X',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 230, y: 60 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 245, y: 265 }, zIndex: 10 },
      { _id: 'R12', type: 'Router', name: 'Router R12', location: { x: 60, y: 290 }, zIndex: 10 },
      { _id: 'S1001', type: 'Server', name: 'Server S1001', location: { x: 200, y: 460 }, zIndex: 10 }],
      connections: [['R11', 'S1001'], ['R12', 'S1001'] , ['R10', 'R11'], ['P106', 'R10']],
      manufacturer: 'Apple',
      operatingSystem: 'iOS',
      publishDate: '2021',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '4GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P107',
      name: 'Galaxy 20',
      type: 'Phone',
      relatedDevices: [],
      connections: [],
      manufacturer: 'Apple',
      operatingSystem: 'iOS',
      publishDate: '2022',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '4GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P108',
      name: 'Galaxy 20+',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 120, y: 300 }, zIndex: 10 }],
      connections: [['R10', 'R11'], ['R11', 'P108'], ['R10', 'P108']],
      manufacturer: 'Apple',
      operatingSystem: 'iOS',
      publishDate: '2023',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '4GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P109',
      name: 'xiaomi note 7',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 400, y: 135 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 270, y: 400 }, zIndex: 10 }],
      connections: [],
      manufacturer: 'Apple',
      operatingSystem: 'iOS',
      publishDate: '2024',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '4GB',
      processor: '2700 1800 MHz',
      location: { x: 130, y: 120 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P110',
      name: 'iPhone 11',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 120, y: 300 }, zIndex: 10 }],
      connections: [],
      manufacturer: 'Apple',
      operatingSystem: 'iOS',
      publishDate: '2025',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '4GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'P111',
      name: 'Huawei P30',
      type: 'Phone',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 120, y: 300 }, zIndex: 10 }],
      connections: [['R10', 'R11']],
      manufacturer: 'Apple',
      operatingSystem: 'iOS',
      publishDate: '2026',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '4GB',
      processor: '2700 1800 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
    {
      _id: 'C112',
      name: 'Lenovo YOGA',
      type: 'Computer',
      relatedDevices: [{ _id: 'R10', type: 'Router', name: 'Router R10', location: { x: 240, y: 80 }, zIndex: 10 },
      { _id: 'R11', type: 'Router', name: 'Router R11', location: { x: 50, y: 300 }, zIndex: 10 },
      { _id: 'S1001', type: 'Server', name: 'Server S1001', location: { x: 250, y: 400 }, zIndex: 10 }],
      connections: [['R10', 'R11'], ['R11', 'C112'],['R11', 'S1001']],
      manufacturer: 'Lenovo',
      operatingSystem: 'Windows',
      publishDate: '2017',
      networkType: 'LTE',
      generation: 4,
      memory: '256GB',
      RAM: '8GB',
      processor: '2700 2500 MHz',
      location: { x: 40, y: 60 },
      zIndex: 10,
      isDraging: false,
    },
  ]
}

function getData() {
  return Promise.resolve(initialState)
}

export default {
  getData,
}