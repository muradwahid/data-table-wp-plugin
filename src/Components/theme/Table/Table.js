import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import React, { Fragment, useState } from 'react';
import SVG from 'react-inlinesvg';
import placeholderImg from '../../../../assets/icons/placeholder.png';
import starIcon from '../../../../assets/icons/starIcon.svg';
import { PlusIcon } from '../../../utils/icons';
const Table = ({ attributes, setAttributes, setFirstIdx }) => {
  const { headings, bodyItems, tableSort, headerStyle, table } = attributes;
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const addRow = [];
  headings.forEach((_) => {
    addRow.push({
      clSpan: 1,
      contentType: "edit",
      rowSpan: 1,
      icon: '',
      text: `Content ${addRow.length + 1}`,
      link: '',
      toggle: false,
    });
  });
  const handleAddRow = () => {
    setAttributes({
      bodyItems: [...bodyItems, addRow],
    });
  };

  const handleColumnToggle = (index, i) => {
    const updateToggle = bodyItems.map((row) => {
      const newRow = produce(row, (draft) => {
        if (draft[index]) {
          draft[index].toggle = true;
          draft.forEach((el, idx) => {
            if (index !== idx) {
              el.toggle = false;
            }
          });
        }
      });
      return newRow;
    });
    setAttributes({
      bodyItems: updateToggle,
    });
  };
  const updateColumnContent = (content, firstIdx, lastIdx) => {
    const updatedBodyItems = produce(bodyItems, (draft) => {
      draft[firstIdx][lastIdx].text = content;
    });
    setAttributes({ bodyItems: updatedBodyItems });
  };
  const handleSort = () => {
    const tableBody = document.querySelector('.bpdt-table-body');
    const rowsArray = Array.from(tableBody.rows);
    const sortedRows = rowsArray.sort((a, b) => {
      const aValue = a.cells[0].textContent.trim();
      const bValue = b.cells[0].textContent.trim();
      const comparison = aValue.localeCompare(bValue);
      return ascendingOrder ? comparison : comparison * -1;
    });
    tableBody.innerHTML = '';
    sortedRows.forEach((row) => {
      tableBody.appendChild(row);
    });
    setAscendingOrder(!ascendingOrder);
  };
  const removeColumn = (index, secondIdx) => {
    const restColumn = produce(bodyItems, (draft) => {
      draft[index].splice(secondIdx, 1);
    });
    setAttributes({ bodyItems: restColumn });
  };

  const headingsClSpan = headings.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.clSpan),
    0
  );
  return (
    <div className="bpdt-dataTable-wrapper">
      <div className="bpdt-dataTable">
        <table className="bpdt-table-wrapper">
          <thead>
            <tr className="table-header">
              {headings.map((val, i) => (
                <th
                  onClick={() => {
                    setAttributes({
                      headings: produce(headings, (draft) => {
                        draft[i].toggle = true;
                        draft.forEach((el, idx) => {
                          if (i !== idx) {
                            draft[idx].toggle = false;
                          }
                        });
                      }),
                    });
                  }}
                  key={i}
                  style={{ width: val.width }}
                  colSpan={val.clSpan}
                >
                  {val.enableIcon && (
                    <Fragment>
                      {val?.iconType === "icon" && (
                        <SVG
                          fill={headerStyle.iconColor}
                          className="bpdt-headerIcon"
                          style={{ marginBottom: '-4px' }}
                          src={val.icon || starIcon}
                          width={25}
                          height="auto"
                        />
                      )}
                      {val?.iconType === "image" && (
                        <img src={val.image || placeholderImg} alt="" />
                      )}
                    </Fragment>
                  )}
                  <span>{val.clName}</span>
                  {tableSort && (
                    <div className="table-header-sortIcon">
                      <svg onClick={handleSort} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                      <svg onClick={handleSort} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bpdt-table-body">
            {bodyItems?.map((val, i) => (
              <tr onClick={() => setFirstIdx(i)} key={i}>
                {val?.map((item, index) => {
                  const columnSpan = Array.from(bodyItems[i]).reduce(
                    (accumulator, currentValue) =>
                      accumulator + Number(currentValue.clSpan),
                    0
                  );
                  return (
                    <>
                      {item.contentType === "edit" && (
                        <td
                          className={`${headingsClSpan < columnSpan &&
                            bodyItems[i].length - 1 === index
                            ? 'removeColumn'
                            : ''
                            }`}
                          key={index}
                          colSpan={item.clSpan}
                          rowSpan={item.rowSpan}
                          onClick={() => {
                            if (!item.toggle) {
                              handleColumnToggle(index, i);
                            }
                          }}
                        >
                          <RichText
                            tagName="span"
                            allowedFormats={[
                              'core/bold',
                              'core/italic',
                              'core/link',
                              'core/underline',
                            ]}
                            value={item.text}
                            onChange={(content) => {
                              updateColumnContent(content, i, index);
                            }}
                            placeholder={__('Content...')}
                          />
                          {headingsClSpan < columnSpan &&
                            bodyItems[i].length - 1 === index && (
                              <svg onClick={() => removeColumn(i, index)}
                                className="bpdt-bodydeleteIcon" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            )}
                        </td>
                      )}
                      {item.contentType === "icon" && (
                        <td
                          className={`${headingsClSpan < columnSpan &&
                            bodyItems[i].length - 1 === index
                            ? 'removeColumn'
                            : ''
                            }`}
                          rowSpan={item.rowSpan}
                          colSpan={item.clSpan}
                        >
                          <SVG
                            className="bpdt-bodyIcon"
                            fill="#000"
                            style={{
                              marginBottom: '-4px',
                              marginRight: '10px',
                            }}
                            src={item.icon || starIcon}
                            title=""
                            height="auto"
                          />
                          {headingsClSpan < columnSpan &&
                            bodyItems[i].length - 1 === index && (<svg onClick={() => removeColumn(i, index)}
                              className="bpdt-bodydeleteIcon" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            )}
                        </td>
                      )}
                    </>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div
          onClick={handleAddRow}
          style={{
            borderTop: `2px ${!table.borderSeparator ? 'solid' : 'none'} #ccc`,
          }}
          className="bpdt-data-table-addRow"
        >
          <button>
            <PlusIcon style={{margin:"0px"}} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
