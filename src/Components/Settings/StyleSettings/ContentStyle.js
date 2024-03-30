import { __experimentalBoxControl as BoxControl, PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import React, { useState } from 'react';
import { alignCenter, alignLeft, alignRight } from '../../../utils/icons';
import { borderOptions } from '../../../utils/options';
import Device from '../../Panel/Device/Device';
import IncludeExClude from '../../Panel/IncludeExClude/IncludeExClude';
import PanelColorPicker from '../../Panel/PanelColorPicker/PanelColorPicker';

const ContentStyle = ({ attributes, setAttributes }) => {
  const { bodyStyle } = attributes;
  const [hover, setHover] = useState('normal');
  const [paddingDevice, setPaddingDevice] = useState('desktop');
  const [alignDevice, setAlignDevice] = useState('desktop');
  const [iconSizeDevice, setIconSizeDevice] = useState('desktop')

  const update = (property, value, secondProperty, thirdProperty) => {
    let updatedData;
    if (thirdProperty) {
      updatedData = produce(bodyStyle, (draft) => {
        draft[property][secondProperty][thirdProperty] = value;
      });
    } else if (secondProperty) {
      updatedData = produce(bodyStyle, (draft) => {
        draft[property][secondProperty] = value;
      });
    } else {
      updatedData = produce(bodyStyle, (draft) => {
        draft[property] = value;
      });
    }
    setAttributes({ bodyStyle: updatedData });
  };

  const icons = [
    { label: 'Left', value: alignLeft },
    { label: 'Center', value: alignCenter },
    { label: 'Right', value: alignRight },
  ]

  return (
    <PanelBody initialOpen={false} title={__('Body Style', 'b-blocks')}>
      <IncludeExClude
        options={['normal', 'hover']}
        value={hover}
        onChange={(value) => setHover(value)}
      />
      <PanelColorPicker
        label={__('Color (Odd Row)', 'b-blocks')}
        value={bodyStyle.oddCell[hover].color}
        onChange={(value) => update('oddCell', value, [hover], 'color')}
      />
      <PanelColorPicker
        style={{ margin: '10px 0' }}
        label={__('Background (Odd Row)', 'b-blocks')}
        value={bodyStyle.oddCell[hover].bg}
        onChange={(value) => update('oddCell', value, [hover], 'bg')}
      />
      <PanelColorPicker
        label={__('Color (Even Row)', 'b-blocks')}
        value={bodyStyle.evenCell[hover].color}
        onChange={(value) => update('evenCell', value, [hover], 'color')}
      />
      <PanelColorPicker
        style={{ margin: '10px 0' }}
        label={__('Background (Even Row)', 'b-blocks')}
        value={bodyStyle.evenCell[hover].bg}
        onChange={(value) => update('evenCell', value, [hover], 'bg')}
      />

      <SelectControl
        label={__('Border Type', 'b-blocks')}
        labelPosition="left"
        value={bodyStyle.borderType[hover]}
        options={borderOptions}
        onChange={(value) => update('borderType', value, [hover])}
      />
      {bodyStyle.borderType[hover] !== 'default' &&
        bodyStyle.borderType[hover] !== 'none' && (
          <>
            <RangeControl
              label={__('Border Width', 'b-blocks')}
              value={bodyStyle.border[hover].width}
              min={0}
              max={30}
              step={1}
              onChange={(value) => update('border', value, [hover], 'width')}
            />
            <PanelColorPicker
              label={__('Border Color', 'b-blocks')}
              value={bodyStyle.border[hover].color}
              onChange={(value) => update('border', value, [hover], 'color')}
              style={{ margin: '10px 0' }}
            />
          </>
        )}
      {hover === 'normal' && (
        <>
          <div style={{ position: 'relative' }}>
            <Device
              device={paddingDevice}
              onChange={(value) => setPaddingDevice(value)}
              style={{ position: 'absolute', top: '0', left: '55px' }}
            />
            <BoxControl
              label={__('Padding', 'data-block')}
              values={bodyStyle.padding[paddingDevice]}
              onChange={(value) => update('padding', value, [paddingDevice])}
            />
          </div>
        </>
      )}
      <PanelColorPicker
        style={{ margin: '10px 0' }}
        label={__('Link Color', 'b-blocks')}
        value={bodyStyle.linkColor[hover]}
        onChange={(value) => update('linkColor', value, [hover])}
      />
      {hover === 'normal' && (
        <>
          <div style={{ position: 'relative' }}>
            <Device
              device={alignDevice}
              onChange={(value) => setAlignDevice(value)}
              style={{ position: 'absolute', top: '5px', left: '125px' }}
            />
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
                        onClick={() => update('textAlign', icon.label.toLowerCase(), [alignDevice])}
                        className={`single-icon-admin-panel panelAlign ${bodyStyle.textAlign[alignDevice] === icon.label.toLowerCase() ? 'isActive' : ''
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


          </div>
          <div style={{ position: 'relative', marginTop: '15px' }}>
            <Device
              device={iconSizeDevice}
              onChange={(value) => setIconSizeDevice(value)}
              style={{ position: 'absolute', top: '-3px', left: '60px' }}
            />
            <RangeControl
              label={__('Icon Size', 'b-blocks')}
              value={bodyStyle.icon.size[iconSizeDevice]}
              onChange={(value) =>
                update('icon', value, 'size', [iconSizeDevice])
              }
            />
          </div>
        </>
      )}
      <PanelColorPicker
        style={{ margin: '10px 0' }}
        label={__('Icon Color', 'b-blocks')}
        value={bodyStyle.icon.color[hover]}
        onChange={(value) => update('icon', value, "color", [hover])}
      />
    </PanelBody>
  );
};

export default ContentStyle;
