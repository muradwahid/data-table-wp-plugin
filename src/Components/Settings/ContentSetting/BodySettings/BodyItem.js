import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';
import starIcon from '../../../../../assets/icons/starIcon.png';
import { panelStarIcon, pencilIcon, xMarkIcon } from '../../../../utils/icons';
import MediaArea from '../../../Panel/MediaArea/MediaArea';
import TinyEditor from '../../../Panel/TinyEditor/TinyEditor';

const BodyItem = ({
  updateHeading,
  value,
  index,
  secondIndx,
  removeColumn,
  ...props
}) => {

  const icons = [
    { label: 'Edit', value: pencilIcon },
    { label: 'Icon', value: panelStarIcon },
  ]


  return (
    <div className="panel-header-main-container">
      <div className="panel-header-title-container" {...props}>
        <div className="panel-header-title">
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onClick={() =>
              updateHeading(index, secondIndx, 'toggle', !value.toggle)
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: value.text || `Content ${secondIndx + 1}`,
              }}
            ></div>
          </p>
          <div
            onClick={() => removeColumn(index, secondIndx)}
            className="panel-header-single-icon"
          >
            {xMarkIcon}
          </div>
        </div>
      </div>
      {value.toggle && (
        <div className="table-header-control-body-wrapper">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <p style={{ margin: 0 }}>{__('Col Span', 'b-blocks')}</p>
            <NumberControl
              style={{ gap: '13px', width: '130px' }}
              onChange={(value) =>
                updateHeading(index, secondIndx, 'clSpan', value)
              }
              step={1}
              min={1}
              max={10}
              value={value.clSpan}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <p style={{ margin: 0 }}>{__('Row Span', 'b-blocks')}</p>
            <NumberControl
              style={{ gap: '13px', width: '130px' }}
              onChange={(value) =>
                updateHeading(index, secondIndx, 'rowSpan', value)
              }
              step={1}
              min={1}
              max={10}
              value={value.rowSpan}
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
                {__('Content Type', 'b-blocks')}
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
                      onClick={() =>
                        updateHeading(index, secondIndx, 'contentType', icon.label.toLowerCase())}
                      className={`single-icon-admin-panel panelAlign ${value.contentType === icon.label.toLowerCase() ? 'isActive' : ''
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



          {value.contentType === "edit" && (
            <TinyEditor
              height={100}
              value={value.text}
              onChange={(value) =>
                updateHeading(index, secondIndx, 'text', value)
              }
            />
          )}
          {value.contentType === "icon" && (
            <MediaArea
              types={['image/svg+xml']}
              default={starIcon}
              image={value.icon}
              onChange={(value) =>
                updateHeading(index, secondIndx, 'icon', value)
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BodyItem;
