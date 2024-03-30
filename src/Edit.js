import { InspectorControls } from '@wordpress/block-editor';
import { Fragment, useEffect, useState } from 'react';
import TabPanel from './Components/Panel/TabPanel/TabPanel';
import ContentSetting from './Components/Settings/ContentSetting/ContentSetting';
import StyleSettings from './Components/Settings/StyleSettings/StyleSettings';
import Table from './Components/theme/Table/Table';
import Style from './Components/Style/Style';
const Edit = (props) => {
  const { className, setAttributes, attributes, clientId } = props;
  const { cId } = attributes;
  const [firstIdx, setFirstIdx] = useState(0);
  const [tab, setTab] = useState('content');

  useEffect(() => {
    clientId && setAttributes({ cId: clientId.substring(0, 10) });
  }, [clientId]); // Set & Update clientId to cId
  return (
    <Fragment>
      <Style attributes={attributes} />
      <InspectorControls>
        <TabPanel tab={tab} setTab={setTab} />
      </InspectorControls>
      <InspectorControls>
        {tab === 'style' && (
          <StyleSettings
            attributes={attributes}
            setAttributes={setAttributes}
          />
        )}
        {tab === 'content' && (
          <ContentSetting
            firstIdx={firstIdx}
            attributes={attributes}
            setAttributes={setAttributes}
          />
        )}
      </InspectorControls>
      <div className={className} id={`wp-block-bpdt-data-table-${cId}`}>
        <Table
          attributes={attributes}
          setAttributes={setAttributes}
          setFirstIdx={setFirstIdx}
        />
      </div>
    </Fragment>
  );
};
export default Edit;
