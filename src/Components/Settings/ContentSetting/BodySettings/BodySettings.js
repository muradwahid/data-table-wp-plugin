import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import React, { Fragment, useEffect, useState } from 'react';
import { newColumn } from '../../../../utils/options';
import BodyItem from './BodyItem';

const BodySettings = ({ attributes, setAttributes, firstIdx }) => {
  const { bodyItems, headings, tableSort } = attributes;
  const [bodyClSpan, setBodyClSpan] = useState(0);
  const [headingClSpan, setHeadingClSpan] = useState(0);
  const duplicateItem = (index) => {
    setAttributes({
      bodyItems: [
        ...bodyItems.slice(0, index),
        { ...bodyItems[index] },
        ...bodyItems.slice(index),
      ],
    });
  };
  const removeItem = (index) => {
    setAttributes({
      bodyItems: [...bodyItems.slice(0, index), ...bodyItems.slice(index + 1)],
    });
  };
  const removeColumn = (index, secondIdx) => {
    const rowItems = produce(bodyItems, (draft) => {
      draft[index].length > 1
        ? draft[index].splice(secondIdx, 1)
        : draft.splice(index, 1);
    });
    setAttributes({ bodyItems: rowItems });
  };

  const updateHeading = (index, secondIndx, property, value) => {
    const newBodyItems = produce(bodyItems, (draft) => {
      draft[index][secondIndx][property] = value;
    });
    setAttributes({ bodyItems: newBodyItems });
  };
  useEffect(() => {
    let clSpan = 0;
    bodyItems[firstIdx]?.forEach((el) => {
      clSpan = Number(el.clSpan) + clSpan;
    });
    setBodyClSpan(clSpan);
  }, [firstIdx, bodyClSpan, bodyItems]);
  useEffect(() => { 
    let clSpan = 0;
    headings.forEach((el) => {
      clSpan = Number(el.clSpan) + clSpan;
    });
    setHeadingClSpan(clSpan);
  },[headings])
  const handleAddColumn = (index) => {
    const addNewColumn = bodyItems.map((row, i) => {
      if (index === i) {
        return [...row, newColumn];
      } else {
        return row;
      }
    });
    setAttributes({ bodyItems: addNewColumn });
  };
  return (
    <Fragment>
      <PanelBody title={__('Body', 'b-blocks')} initialOpen={false}>
        <div className="table-header-panel-wrapper">
          <div className={``}>
            {bodyItems?.map((value, i) => {
              return value?.map(
                (item, index) =>
                  i === firstIdx && (
                    <BodyItem
                      key={index}
                      index={i}
                      secondIndx={index}
                      bodyItems={bodyItems}
                      duplicateItem={duplicateItem}
                      items={value}
                      removeColumn={removeColumn}
                      updateHeading={updateHeading}
                      value={item}
                    />
                  )
              );
            })}
          </div>
          <div className="table-body-removeRow">
            {bodyItems.length > 1 && (
              <button
                className="remove-row"
                onClick={() => removeItem(firstIdx)}
              >
                Remove Row
              </button>
            )}
            {headingClSpan > bodyClSpan && (
              <button
                className="add-col"
                onClick={() => handleAddColumn(firstIdx)}
              >
                Add Column
              </button>
            )}
          </div>
        </div>
      </PanelBody>
    </Fragment>
  );
};

export default BodySettings;
