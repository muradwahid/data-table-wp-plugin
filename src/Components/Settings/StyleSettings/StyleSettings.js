import {
  PanelBody,
  ToggleControl,
  __experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import React, { useState } from 'react';
import { alignCenter, alignLeft, alignRight } from '../../../utils/icons';
import Device from '../../Panel/Device/Device';
import ContentStyle from './ContentStyle';
import HeaderStyle from './HeaderStyle';
const StyleSettings = ({ attributes, setAttributes }) => {
  const { table } = attributes;
  const [widthDevice, setWidthDevice] = useState('desktop');
  const update = (property, value, secondProperty) => {
    let updatedData;
    if (secondProperty) {
      updatedData = produce(table, (draft) => {
        draft[property][secondProperty] = value;
      });
    } else {
      updatedData = produce(table, (draft) => {
        draft[property] = value;
      });
    }
    setAttributes({ table: updatedData });
  };

  const icons = [
    { label: 'Left', value: alignLeft },
    { label: 'Center', value: alignCenter },
    { label: 'Right', value: alignRight },
  ]

  return (
    <>
      <PanelBody title={__('General Style', 'b-blocks')} initialOpen={true}>
        <div className="tablePanelStyle">
          <Device
            onChange={(value) => setWidthDevice(value)}
            device={widthDevice}
            style={{ position: 'absolute',left: '45px' }}
          />
          <span>Width</span>
          <UnitControl
            onChange={(value) => update('width', value, widthDevice)}
            isUnitSelectTabbable
            value={table.width[widthDevice]}
            min={0}
            max={table.width[widthDevice].includes('%') ? 100 : 1200}
            style={{ width: '70px' }}
          />
        </div>
        <div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                margin: '8px 0',
                fontSize: '14px',
                fontWeight: 400,

              }}
            >
              {__('Alignment', 'b-blocks')}
            </p>
            <div
              style={{
                display: 'flex',
                border: '1px solid #ccc',
              }}
            >
              {icons &&
                icons.map((icon, i) => (
                  <div
                    key={i}
                    onClick={() => update('alignment', icon.label.toLowerCase())}
                    className={`single-icon-admin-panel panelAlign ${table.alignment === icon.label.toLowerCase() ? 'isActive' : ''
                      }`}
                  >
                    {icon.value}
                    <div className="icon-picker-tooltip-container">
                      <div
                        style={{ padding: '2px 6px' }}
                        className="icon-picker-tooltip"
                      >
                        <span>{icon.label}</span>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>


        <div style={{ marginTop: "10px" }}>
          <ToggleControl
            label={__('Separate Border', 'b-blocks')}
            checked={table.borderSeparator}
            onChange={(value) => update('borderSeparator', value)}
          />
        </div>
      </PanelBody>
      <HeaderStyle attributes={attributes} setAttributes={setAttributes} />
      <ContentStyle attributes={attributes} setAttributes={setAttributes} />
    </>
  );
};

export default StyleSettings;
