import React from 'react';


function DeviceDetails({ device }) {

  return (
    <div className="device-details">
      <h2>Details</h2>
      <span>Name: {device.name}</span>
      <span>Type: {device.type}</span>
      <span>Manufacturer: {device.manufacturer}</span>
      <span>OperatingSystem: {device.operatingSystem}</span>
      <span>PublishDate: {device.publishDate}</span>
      <span>NetworkType: {device.networkType}</span>
      <span>Memory: {device.memory}</span>
      <span>RAM: {device.RAM}</span>
      <span>Processor: {device.processor}</span>
    </div>
  );
}

export default React.memo(DeviceDetails)