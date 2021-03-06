const initialState = {
  list: [
    {
      _id: 'R10',
      name: 'Router R10',
      type: 'Router',
      manufacturer: 'Cisco',
      catalog: 'RV130',
      version: '4.2',
      ip: '192.168.1.1',
      POE: true,
      CPU: '2.4 GHz',
      ROM: '64 MB',
      RAM: '128 MB',
      NVRAM: '16 MB',
      LAN: 'RJ-45 x 4 for 10/100/1000 Base T',
      WAN: 'RJ45 LAN',
      flashMemory: '8 MB',
      networkInterfaces: 'networkInterfaces',
      wirelessSupport: '',
      speed: '300 Mbsp',
      weight: '660 g',
      Dimension: '190mm * 35m * 165mm',
      networkSecurity: 'WPA2, Guest Access, DoS, Firewall'
    },
    {
      _id: 'R11',
      name: 'Router R11',
      type: 'Router',
      manufacturer: 'Amazon',
      catalog: 'R6120-100NAS',
      version: '4.2',
      ip: '192.168.1.1',
      POE: true,
      CPU: '5 GHz',
      ROM: '64 MB',
      RAM: '128 MB',
      NVRAM: '16 MB',
      LAN: 'RJ-45 x 4 for 10/100/1000 Base T',
      WAN: 'RJ45 LAN',
      flashMemory: '8 MB',
      networkInterfaces: 'networkInterfaces',
      wirelessSupport: '802.11b/g/n',
      speed: '1200 Mbsp',
      weight: '800 g',
      Dimension: '190mm * 35m * 165mm',
      networkSecurity: 'WPA2, Guest Access, DoS, Firewall'
    },
    {
      _id: 'R12',
      name: 'Router R12',
      type: 'Router',
      manufacturer: 'COMFAST',
      catalog: 'CF-WR610N',
      version: '4.2',
      ip: '192.168.1.1',
      POE: true,
      CPU: '2.4 GHz',
      ROM: '64 MB',
      RAM: '128 MB',
      NVRAM: '16 MB',
      LAN: 'RJ-45 x 4 for 10/100/1000 Base T',
      WAN: 'RJ45 LAN',
      flashMemory: '8 MB',
      networkInterfaces: 'networkInterfaces',
      wirelessSupport: '802.11a/g/n/ac',
      speed: '300 Mbsp',
      weight: '660 g',
      Dimension: '190mm * 35m * 165mm',
      networkSecurity: 'WPA2, Guest Access, DoS, Firewall'
    },
    {
      _id: 'R13',
      name: 'Router R13',
      type: 'Router',
      manufacturer: 'D-Link',
      catalog: 'DIR-878/IL/A1A',
      version: '4.2',
      ip: '192.168.1.1',
      POE: true,
      CPU: '2.4 GHz',
      ROM: '64 MB',
      RAM: '128 MB',
      NVRAM: '16 MB',
      LAN: 'RJ-45 x 4 for 10/100/1000 Base T',
      WAN: 'RJ45 LAN',
      flashMemory: '8 MB',
      networkInterfaces: 'networkInterfaces',
      wirelessSupport: '',
      speed: '300 Mbsp',
      weight: '660 g',
      Dimension: '190mm * 35m * 165mm',
      networkSecurity: 'WPA2, Guest Access, DoS, Firewall'
    },
  ]
}

function getData() {
  return Promise.resolve(initialState)
}

export default {
  getData,
}
