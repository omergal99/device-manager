import React from 'react';


function DeviceDetails({ device }) {

  return (
    <div className="device-details">
      <h2>Details</h2>
      <div className="list">
        <p>
          <span className="title">Name: </span>
          <span>{device.name}</span>
        </p>
        <p>
          <span className="title">Type: </span>
          <span>{device.type}</span>
        </p>
        <p>
          <span className="title">Manufacturer: </span>
          <span>{device.manufacturer}</span>
        </p>
        <p>
          <span className="title">System: </span>
          <span>{device.operatingSystem}</span>
        </p>
        <p>
          <span className="title">Publish Date: </span>
          <span>{device.publishDate}</span>
        </p>
        <p>
          <span className="title">Network Type: </span>
          <span>{device.networkType}</span>
        </p>
        <p>
          <span className="title">Memory: </span>
          <span>{device.memory}</span>
        </p>
        <p>
          <span className="title">RAM: </span>
          <span>{device.RAM}</span>
        </p>
        <p>
          <span className="title">Processor: </span>
          <span>{device.processor}</span>
        </p>
      </div>
    </div>
  );
}

export default React.memo(DeviceDetails)