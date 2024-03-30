/* eslint-disable no-unused-vars */
import { Dropdown, GradientPicker } from '@wordpress/components';
import { useState } from 'react';

import PanelColorPicker from '../PanelColorPicker/PanelColorPicker';
import './panelCustomColorControl.scss';
const PanelCustomColorControl = ({
  value,
  onChange = () => {},
  label = 'Color',
  style,
}) => {
  const [tab, setTab] = useState('solid');
  return (
    <div style={style}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span>{label}</span>
        </div>
        <Dropdown
          className="my-container-class-name"
          contentClassName="my-popover-content-classname"
          renderToggle={({ isOpen, onToggle, onClose }) => (
            <span
              style={{ cursor: 'pointer' }}
              onClick={onToggle}
              aria-expanded={isOpen}
              className="dashicons dashicons-edit"
            ></span>
          )}
          renderContent={({ isOpen, onToggle, onClose }) => (
            <div className="panel-custom-color-control-container">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ marginBottom: '0px' }}>Type:</p>
                <div className="panel-custom-tab">
                  <div
                    className={`custom-single-tab ${
                      tab === 'solid' ? 'active' : ''
                    }`}
                    onClick={() => setTab('solid')}
                  >
                    Solid
                  </div>
                  <div
                    className={`custom-single-tab ${
                      tab === 'gradient' ? 'active' : ''
                    }`}
                    onClick={() => setTab('gradient')}
                  >
                    Gradient
                  </div>
                </div>
              </div>
              {tab === 'solid' && (
                <div style={{ marginTop: '20px' }}>
                  <PanelColorPicker
                    color="#00FFFF"
                    value={value}
                    label="Color :"
                    onChange={(value) => console.log(value)}
                  />
                </div>
              )}
              {tab === 'gradient' && (
                <div style={{ marginTop: '10px' }}>
                  <GradientPicker
                    value={'#f00'}
                    onChange={(value) => onChange(value)}
                    gradients={[
                      {
                        name: 'Vivid cyan blue to vivid purple',
                        gradient:
                          'linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)',
                        slug: 'vivid-cyan-blue-to-vivid-purple',
                      },
                      {
                        name: 'Light green cyan to vivid green cyan',
                        gradient:
                          'linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)',
                        slug: 'light-green-cyan-to-vivid-green-cyan',
                      },
                      {
                        name: 'Luminous vivid amber to luminous vivid orange',
                        gradient:
                          'linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%)',
                        slug: 'luminous-vivid-amber-to-luminous-vivid-orange',
                      },
                      {
                        name: 'Luminous vivid orange to vivid red',
                        gradient:
                          'linear-gradient(135deg,rgba(255,105,0,1) 0%,rgb(207,46,46) 100%)',
                        slug: 'luminous-vivid-orange-to-vivid-red',
                      },
                      {
                        name: 'Very light gray to cyan bluish gray',
                        gradient:
                          'linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%)',
                        slug: 'very-light-gray-to-cyan-bluish-gray',
                      },
                      {
                        name: 'Cool to warm spectrum',
                        gradient:
                          'linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%)',
                        slug: 'cool-to-warm-spectrum',
                      },
                    ]}
                  />
                </div>
              )}
              <div onClick={onClose}></div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PanelCustomColorControl;
