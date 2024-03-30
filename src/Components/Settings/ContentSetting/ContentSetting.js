import { InspectorControls } from '@wordpress/block-editor';
import { produce } from 'immer';
import React, { Fragment } from 'react';
import HeaderSettings from './HeaderSettings';
import BodySettings from './BodySettings/BodySettings';

const ContentSetting = ({
  attributes,
  setAttributes,
  firstIdx,
}) => {
  const { headings } = attributes;
  const updateHeading = (index, property, value) => {
    const newHeadings = produce(headings, (draft) => {
      draft[index][property] = value;
    });
    setAttributes({ headings: newHeadings });
  };
  return (
    <Fragment>
      <InspectorControls>
        <HeaderSettings
          attributes={attributes}
          setAttributes={setAttributes}
          updateHeading={updateHeading}
        />
        <BodySettings
          firstIdx={firstIdx}
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </InspectorControls>
    </Fragment>
  );
};
export default ContentSetting;
