import { __ } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

import {
  Button,
  __experimentalInputControl as InputControl,
  __experimentalNumberControl as NumberControl,
  PanelBody,
  ToggleControl,
  __experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { PanelRepeater, SortableProvider } from 'bpl-gutenberg-panel';
import { produce } from 'immer';
import placeholderImage from '../../../../assets/icons/placeholder.png';
import starIcon from '../../../../assets/icons/starIcon.png';
import { banIcon, copyIcon, imageFillIcon, panelStarIcon, xMarkIcon } from '../../../utils/icons';
import { newColumn } from '../../../utils/options';
import MediaArea from '../../Panel/MediaArea/MediaArea';
import './HeaderSettings.scss';

const DragHandle = SortableHandle(() => (
  <div className="panel-header-gripIcon">
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"></path></svg>
  </div>
));

const SortableItem = SortableElement(
  ({
    sortIndex: index,
    value,
    updateHeading,
    items,
    removeItem,
    duplicateItem,
    collapsPanelHeading,
  }) => {
    const icons = [
      { label: 'None', value: banIcon },
      { label: 'Icon', value: panelStarIcon },
      { label: 'Image', value: imageFillIcon },
    ]
    return (
      <div className="panel-header-main-container">
        <div className="panel-header-title-container">
          <DragHandle style={{ cursror: 'grab' }} />
          <div className="panel-header-title">
            <p
              onClick={() => {
                updateHeading(index, 'toggle', !value.toggle);
                collapsPanelHeading(index);
              }}
            >
              <div>{value.clName}</div>
            </p>
            <div className="panel-header-icon-wrapper">
              <div
                onClick={() => duplicateItem(index)}
                className="panel-header-single-icon"
              >
                {copyIcon}
              </div>
              {items.length > 1 && (
                <div
                  onClick={() => removeItem(index)}
                  className="panel-header-single-icon"
                >
                  {xMarkIcon}
                </div>
              )}
            </div>
          </div>
        </div>
        {value.toggle && (
          <div className="table-header-control-body-wrapper">
            <InputControl
              label={__('Column Name', 'b-blocks')}
              value={value.clName}
              onChange={(val) => updateHeading(index, 'clName', val)}
              type="text"
              labelPosition="left"
            />
            <NumberControl
              label={__('Column Span', 'b-blocks')}
              labelPosition="left"
              className="mt10"
              style={{ gap: '13px' }}
              onChange={(value) => updateHeading(index, 'clSpan', value)}
              step={1}
              min={1}
              max={10}
              value={value.clSpan}
            />
            <div
              style={{
                display: 'flex',
                gap: '13px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{__('WIDTH', 'b-blocks')}</span>
              <UnitControl
                onChange={(value) => updateHeading(index, 'width', value)}
                isUnitSelectTabbable
                value={value.width}
                style={{ width: '130px' }}
              />
            </div>
            <div>
              <ToggleControl
                label={__('Enable Header Icon', 'b-blocks')}
                checked={value.enableIcon}
                value={value.enableIcon}
                onChange={(value) => updateHeading(index, 'enableIcon', value)}
              />
            </div>
            {value.enableIcon && (
              <>
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
                      {__('Header icon type', 'b-blocks')}
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
                            onClick={() => updateHeading(index, 'iconType', icon.label.toLowerCase())}
                            className={`single-icon-admin-panel panelAlign ${value.iconType === icon.label.toLowerCase() ? 'isActive' : ''
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

                <div style={{ marginTop: '5px' }}>
                  {value?.iconType === "icon" && (
                    <MediaArea
                      default={starIcon}
                      image={value.icon}
                      types={['image/svg+xml']}
                      onChange={(value) => updateHeading(index, 'icon', value)}
                    />
                  )}
                  {value?.iconType === "image" && (
                    <MediaArea
                      label={__('Choose Image', 'b-blocks')}
                      default={placeholderImage}
                      image={value.image}
                      height="100%"
                      width="100%"
                      onChange={(value) => updateHeading(index, 'image', value)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

const SortableList = SortableContainer(
  ({
    items,
    updateHeading,
    removeItem,
    duplicateItem,
    collapsPanelHeading,
  }) => (
    <div>
      {items.map((value, index) => {
        return (
          <SortableItem
            key={index}
            index={index}
            sortIndex={index}
            items={items}
            value={value}
            removeItem={removeItem}
            duplicateItem={duplicateItem}
            updateHeading={updateHeading}
            collapsPanelHeading={collapsPanelHeading}
          />
        );
      })}
    </div>
  )
);

const HeaderSettings = ({ attributes, setAttributes }) => {
  const { headings, bodyItems, tableSort } = attributes;


  const handleAddColumn = () => {
    const updatedBodyItems = bodyItems.map((row) => {
      const newRow = [...row, newColumn];
      return newRow;
    });
    setAttributes({ bodyItems: updatedBodyItems });
  };

  const handleAddHeader = () => {
    setAttributes({
      headings: [
        ...headings,
        {
          id: Number([headings.length - 1].id) + 1,
          clName: `Table Header ${headings.length + 1}`,
          clSpan: '1',
          width: "0%",
          enableIcon: false,
          icon: '',
          image: '',
          iconType: 1,
          size: 20,
          toggle: false,
        },
      ],
    });
    handleAddColumn();
  };
  const duplicateBodyItems = (index) => {
    const newBodyItems = bodyItems.map((row) => {
      const newRow = [
        ...row.slice(0, index),
        { ...row[index] },
        ...row.slice(index),
      ];
      return newRow;
    });
    setAttributes({ bodyItems: newBodyItems });
  };
  const duplicateItem = (index) => {
    setAttributes({
      headings: [
        ...headings.slice(0, index),
        { ...headings[index] },
        ...headings.slice(index),
      ],
    });
    duplicateBodyItems(index);
  };


  const removeItem = (index) => {
    setAttributes({
      headings: [...headings.slice(0, index), ...headings.slice(index + 1)],
    });
    // removeBodyItems(index);
  };
  const updateHeading = (index, property, value) => {
    const newHeadings = produce(headings, (draft) => {
      draft[index][property] = value;
    });
    setAttributes({ headings: newHeadings });
  };
  const sortBodyItems = (oldIndex, newIndex) => {
    const newBodyItems = bodyItems.map((row) => {
      const newRow = arrayMove(row, oldIndex, newIndex);
      return newRow;
    });
    setAttributes({ bodyItems: newBodyItems });
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    sortBodyItems(oldIndex, newIndex);
    setAttributes({ headings: arrayMove(headings, oldIndex, newIndex) });
  };

  const collapsPanelHeading = (index) => {
    setAttributes({
      headings: produce(headings, (draft) => {
        draft[index].toggle = !draft[index].toggle;
        draft.forEach((el, idx) => {
          if (index !== idx) {
            draft[idx].toggle = false;
          }
        });
      }),
    });
  };
  return (
    <PanelBody
      title={__('Header', 'b-blocks')}
      initialOpen={true}
    >
      <ToggleControl
        label={__('Enable Table Sorting', 'b-blocks')}
        onChange={(value) => setAttributes({ tableSort: value })}
        checked={tableSort}
      />

      <div className="table-header-panel-wrapper">

        <div className={`bplSortableList`}>
          <SortableList
            removeItem={removeItem}
            duplicateItem={duplicateItem}
            onSortEnd={onSortEnd}
            updateHeading={updateHeading}
            collapsPanelHeading={collapsPanelHeading}
            useDragHandle
            items={headings}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }} className="bpdt-addItem">
          <Button onClick={handleAddHeader} variant="primary" icon={plus}>
            Add Item
          </Button>
        </div>
      </div>
    </PanelBody>
  );
};
export default HeaderSettings;
