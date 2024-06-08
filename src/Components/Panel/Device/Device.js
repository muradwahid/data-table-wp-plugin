import { compose } from "@wordpress/compose";
import { withDispatch, withSelect } from "@wordpress/data";
import { Fragment } from "react";

import "./style.css";

/**
 * Device Component
 * 
 * @param {object} props - The props object
 * @param {object} props.style - The style object for the device component
 * @param {string} props.className - The class name for the device component
 * @param {(horizontal | vertical)} props.position - The position of the device component
 * @param {function} props.onChange - The function to handle changes in the device type
 * @returns {JSX.Element} React component
 */



export const Device = compose(
  withSelect((select) => {
    const {__experimentalGetPreviewDeviceType } =
      select("core/edit-post");

    return {
      device:__experimentalGetPreviewDeviceType()?.toLowerCase(),
    };
  }),
  withDispatch((dispatch) => {
    return {
      setDevice(device) {
        return dispatch("core/edit-post").__experimentalSetPreviewDeviceType(
          device
        );
      },
    };
  })
)(
  ({
    style,
    className,
    position = "horizontal",
    device,
    setDevice,
    onChange = () => {},
  }) => {
    // const [show, setShow] = useState(false);
    const deviceValue = [
      { label: "Desktop", name: "desktop", icon: "dashicons-desktop" },
      { label: "Tablet", name: "tablet", icon: "dashicons-tablet" },
      { label: "Mobile", name: "mobile", icon: "dashicons-smartphone" },
    ];
    return (
      <Fragment>
        <div style={style} className={className}>
          <div
            style={{
              display: position === "horizontal" ? "flex" : "grid",
              gap: "5px",
            }}
          >
            {deviceValue.map(({ label, name, icon }, i) => (
              <button
                key={i}
                onClick={() => {
                  // setShow(false);
                  setDevice(label);
                  onChange(label.toLowerCase());
                }}
                className={`advancedOptionssingle-device ${
                  name === device ? "active" : ""
                }`}
              >
                <span
                  className={`dashicons ${icon} ${
                    name === device ? "active" : ""
                  } `}
                ></span>
              </button>
            ))}
          </div>
          {/* )} */}
        </div>
      </Fragment>
    );
  }
);
