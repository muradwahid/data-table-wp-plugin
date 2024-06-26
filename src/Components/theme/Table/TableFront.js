import React, { Fragment, useState } from 'react';
import SVG from 'react-inlinesvg';
import placeholderImg from '../../../../assets/icons/placeholder.png';
import starIcon from '../../../../assets/icons/starIcon.svg';
const TableFront = ({ attributes }) => {
  const { headings, bodyItems, tableSort, headerStyle } = attributes;
  const [ascendingOrder, setAscendingOrder] = useState(true);
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
  return (
    <div className="bpdt-dataTable-wrapper">
      <div className="bpdt-dataTable">
        <table className="bpdt-table-wrapper">
          <thead>
            <tr className="table-header">
              {headings.map((val, i) => (
                <th key={i} style={{ width: val.width }} colSpan={val.clSpan}>
                  {val.enableIcon && (
                    <Fragment>
                      {val.iconType === "icon" && (
                        <SVG
                          fill={headerStyle.iconColor}
                          className="bpdt-headerIcon"
                          style={{ marginBottom: '-4px' }}
                          src={val.icon || starIcon}
                          width={25}
                          height="auto"
                        />
                      )}
                      {val.iconType === "image" && (
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
              <tr key={i}>
                {val?.map((item, index) => (
                  <>
                    {item.contentType === "edit" && (
                      <td
                        key={index}
                        colSpan={item.clSpan}
                        rowSpan={item.rowSpan}
                        dangerouslySetInnerHTML={{ __html: item.text }}
                      ></td>
                    )}
                    {item.contentType === "icon" && (
                      <td rowSpan={item.rowSpan} colSpan={item.clSpan}>
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
                      </td>
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableFront;
