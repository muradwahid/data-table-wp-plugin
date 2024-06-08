import {
    PanelBody,
    RangeControl,
    SelectControl,
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import React, { useState } from "react";
import { alignCenter, alignLeft, alignRight } from "../../../utils/icons";
import { borderOptions } from "../../../utils/options";
import { Device } from "../../Panel/Device/Device";
import IncludeExClude from "../../Panel/IncludeExClude/IncludeExClude";
import PanelColorPicker from "../../Panel/PanelColorPicker/PanelColorPicker";
import { BBoxControl } from "../../Panel/BBoxControl/BBoxControl";

const HeaderStyle = ({ attributes, setAttributes, device }) => {
    const { headerStyle } = attributes;
    const [hover, setHover] = useState("normal");
    const update = (property, value, secondProperty, thirdProperty) => {
        let updatedData;
        if (thirdProperty) {
            updatedData = produce(headerStyle, (draft) => {
                draft[property][secondProperty][thirdProperty] = value;
            });
        } else if (secondProperty) {
            updatedData = produce(headerStyle, (draft) => {
                draft[property][secondProperty] = value;
            });
        } else {
            updatedData = produce(headerStyle, (draft) => {
                draft[property] = value;
            });
        }
        setAttributes({ headerStyle: updatedData });
    };

    const icons = [
        { label: "Left", value: alignLeft },
        { label: "Center", value: alignCenter },
        { label: "Right", value: alignRight },
    ];
    return (
        <PanelBody title={__("Header Style", "b-blocks")} initialOpen={false}>
            <RangeControl
                label={__("Border Radius", "data-block")}
                min={0}
                max={200}
                value={headerStyle.bRadius}
                onChange={(value) => update("bRadius", value)}
            />
            <div style={{ position: "relative" }}>
                <Device
                    style={{ position: "absolute", top: "0", left: "55px" }}
                />
                <BBoxControl
                    label={__("Padding", "data-block")}
                    values={headerStyle.padding[device]}
                    onChange={(value) => update("padding", value, [device])}
                />
            </div>
            <IncludeExClude
                options={["normal", "hover"]}
                onChange={(value) => setHover(value)}
                value={hover}
            />
            <PanelColorPicker
                label={__("Color", "b-blocks")}
                value={headerStyle.color[hover]}
                onChange={(value) => update("color", value, [hover])}
            />
            <PanelColorPicker
                label={__("Background", "b-blocks")}
                value={headerStyle.bg[hover]}
                onChange={(value) => update("bg", value, [hover])}
                style={{ margin: "10px 0" }}
            />
            <SelectControl
                label={__("Border Type", "b-blocks")}
                labelPosition="left"
                value={headerStyle.borderType[hover]}
                options={borderOptions}
                onChange={(value) => update("borderType", value, [hover])}
            />
            {headerStyle.borderType[hover] !== "default" &&
                headerStyle.borderType[hover] !== "none" && (
                    <>
                        <RangeControl
                            label={__("Border Width", "b-blocks")}
                            value={headerStyle.border[hover].width}
                            min={0}
                            max={30}
                            step={1}
                            onChange={(value) =>
                                update("border", value, [hover], "width")
                            }
                        />
                        <PanelColorPicker
                            label={__("Border Color", "b-blocks")}
                            value={headerStyle.border[hover].color}
                            onChange={(value) =>
                                update("border", value, [hover], "color")
                            }
                            style={{ margin: "10px 0" }}
                        />
                    </>
                )}

            {hover === "normal" && (
                <>
                    <div style={{ position: "relative" }}>
                        <Device
                            style={{
                                position: "absolute",
                                left: "115px",
                                top: "0",
                            }}
                        />
                        <RangeControl
                            label={__("Icon/Image Size")}
                            min={0}
                            max={200}
                            value={headerStyle.iconSize[device]}
                            onChange={(value) =>
                                update("iconSize", value, [device])
                            }
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <Device
                            style={{
                                position: "absolute",
                                left: "115px",
                                top: "0",
                            }}
                        />
                        <RangeControl
                            label={__("Icon/Image Space")}
                            min={0}
                            max={200}
                            value={headerStyle.iconSpace[device]}
                            onChange={(value) =>
                                update("iconSpace", value, [device])
                            }
                        />
                    </div>
                    <PanelColorPicker
                        label={__("Icon Color", "b-blocks")}
                        value={headerStyle.iconColor}
                        onChange={(value) => update("iconColor", value)}
                        style={{ margin: "10px 0" }}
                    />

                    <div>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <p
                                style={{
                                    margin: "8px 0",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                }}
                            >
                                {__("Title Alignment", "b-blocks")}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    border: "1px solid #ccc",
                                }}
                            >
                                {icons &&
                                    icons.map((icon, i) => (
                                        <div
                                            key={i}
                                            onClick={() =>
                                                update(
                                                    "titleAlign",
                                                    icon.label.toLowerCase()
                                                )
                                            }
                                            className={`single-icon-admin-panel panelAlign ${
                                                headerStyle.titleAlign ===
                                                icon.label.toLowerCase()
                                                    ? "isActive"
                                                    : ""
                                            }`}
                                        >
                                            {icon.value}
                                            <div className="icon-picker-tooltip-container">
                                                <div
                                                    style={{
                                                        padding: "2px 6px",
                                                    }}
                                                    className="icon-picker-tooltip"
                                                >
                                                    <span>{icon.label}</span>
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 1024 1024"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </PanelBody>
    );
};
export default withSelect((select) => {
    return {
        device: select("core/edit-post")
            .__experimentalGetPreviewDeviceType()
            ?.toLowerCase(),
    };
})(HeaderStyle);
