import { Dashicon } from '@wordpress/components';
import React from 'react';
import './tabpanel.scss';
const TabPanel = ({ tab, setTab }) => {
  return (
    <div className="tab-panel-container">
      <div
        onClick={() => setTab('content')}
        className={`single-tab ${tab === 'content'
            ? 'is-tab-active active-tab-color'
            : 'deActive-tab-color'
          }`}
      >
        <Dashicon icon="edit" />
        <span>Content</span>
      </div>
      <div
        onClick={() => setTab('style')}
        className={`single-tab ${tab === 'style'
            ? 'is-tab-active active-tab-color'
            : 'deActive-tab-color'
          }`}
      >
        <svg style={{ paddingBottom: '4px', fontSize: '20px' }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path></svg>
        <span>Style</span>
      </div>
    </div>
  );
};

export default TabPanel;
