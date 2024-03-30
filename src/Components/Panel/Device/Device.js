import { useState } from 'react';
import './device.scss';
const Device = ({ device = 'desktop', onChange = () => {}, style }) => {
  const [show, setShow] = useState(false);
  const deviceValue = [
    {
      value: 'desktop',
      icon: 'dashicons-desktop',
    },
    { value: 'tablet', icon: 'dashicons-tablet' },
    { value: 'mobile', icon: 'dashicons-smartphone' },
  ];
  return (
    <div style={style}>
      {!show && (
        <div style={{ display: 'flex' }}>
          <button onClick={() => setShow(true)} className="single-device">
            <span
              className={`dashicons dashicons-${
                device === 'desktop'
                  ? 'desktop'
                  : device === 'tablet'
                  ? 'tablet'
                  : 'smartphone'
              }`}
            ></span>
          </button>
        </div>
      )}

      {show && (
        <div style={{ display: 'flex' }}>
          {deviceValue.map(({ value, icon }, i) => (
            <button
              key={i}
              onClick={() => {
                setShow(false);
                onChange(value);
              }}
              className="single-device"
            >
              <span className={`dashicons ${icon}`}></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Device;
