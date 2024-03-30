import React from 'react';

const Style = ({ attributes }) => {
  const { cId, table, headerStyle, bodyStyle } = attributes;
  const container = `#wp-block-bpdt-data-table-${cId}`;
  const tableWrapper = `${container} .bpdt-dataTable-wrapper`;
  const tableContainer = `${tableWrapper} .bpdt-table-wrapper`;
  const tableBody = `${tableWrapper} .bpdt-table-body`;
  return (
    <style>
      {`
      ${tableWrapper}{
        display:grid;
        justify-items:${table.alignment === "left"
          ? 'start'
          : table.alignment === "center"
            ? 'center'
            : 'end'
        };
      }
      ${tableWrapper} .bpdt-dataTable{
        width:${table.width.desktop};
      }
      ${tableContainer}{
        border-collapse:${table.borderSeparator ? 'separate' : 'collapse'};
      }
      ${tableContainer} thead>tr>th:first-child{
        border-radius:${headerStyle.bRadius}px 0 0 0;
      }
      ${tableContainer} thead>tr>th:last-child{
        border-radius:0 ${headerStyle.bRadius}px 0 0;
      }
      ${tableContainer} thead>tr>th{
        padding:${headerStyle.padding.desktop.top} ${headerStyle.padding.desktop.left
        } ${headerStyle.padding.desktop.bottom} ${headerStyle.padding.desktop.right
        };
      color:${headerStyle.color.normal};
      background-color:${headerStyle.bg.normal};
      border:${headerStyle.border.normal.width}px ${headerStyle.borderType.normal
        } ${headerStyle.border.normal.color};
      text-align:${headerStyle.titleAlign === "left"
          ? 'left'
          : headerStyle.titleAlign === "center"
            ? 'center'
            : 'right'
        };
      }
      ${tableContainer} thead>tr>th:hover{
        color:${headerStyle.color.hover};
        background-color:${headerStyle.bg.hover};
        border:${headerStyle.border.hover.width}px ${headerStyle.borderType.hover
        } ${headerStyle.border.hover.color};
      }
      ${tableContainer} thead>tr>th :where(.bpdt-headerIcon,img){
        width:${headerStyle.iconSize.desktop}px;
        margin-right:${headerStyle.iconSpace.desktop}px;
      }
      ${tableBody} tr>td{
        border:${bodyStyle.border.normal.width}px ${bodyStyle.borderType.normal
        } ${bodyStyle.border.normal.color};
        padding:${bodyStyle.padding.desktop.top} ${bodyStyle.padding.desktop.left
        } ${bodyStyle.padding.desktop.bottom} ${bodyStyle.padding.desktop.right};
        text-align:${bodyStyle.textAlign.desktop === "left"
          ? 'left'
          : bodyStyle.textAlign.desktop === "center"
            ? 'center'
            : 'right'
        };
      }
      ${tableBody} tr>td:hover{
        border:${bodyStyle.border.hover.width}px ${bodyStyle.borderType.hover
        } ${bodyStyle.border.hover.color};
      }
      ${tableBody} tr>td a{
        color:${bodyStyle.linkColor.normal};
        cursor:pointer;
      }
      ${tableBody} tr>td a:hover{
        color:${bodyStyle.linkColor.hover};
        
      }
      ${tableBody} tr:nth-child(odd){
        color:${bodyStyle.oddCell.normal.color};
        background-color:${bodyStyle.oddCell.normal.bg || '#fff'};
      }
      ${tableBody} tr:nth-child(odd)>td:hover{
        color:${bodyStyle.oddCell.hover.color};
        background-color:${bodyStyle.oddCell.hover.bg || '#fff'};
      }
      ${tableBody} tr:nth-child(even){
        color:${bodyStyle.evenCell.normal?.color};
        background-color:${bodyStyle.evenCell.normal.bg || '#fff'};
      }
      ${tableBody} tr:nth-child(even)>td:hover{
        color:${bodyStyle.evenCell.hover.color};
        background-color:${bodyStyle.evenCell.hover.bg || '#fff'};
      }
      ${tableBody} .bpdt-bodyIcon{
        width:${bodyStyle.icon.size.desktop}px;
        fill:${bodyStyle.icon.color.normal}
      }
      ${tableBody} .bpdt-bodyIcon:hover{
        fill:${bodyStyle.icon.color.hover}
      }
      `}
    </style>
  );
};

export default Style;
