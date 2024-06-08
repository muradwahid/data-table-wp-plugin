export const getBoxCss = (value, property) => {
    if (value) {
        const result = Object.keys(value).map(
            (key) => `${property}-${key}:${value[key]};`
        );
        return result.join(" ");
    }
    return "";
};
