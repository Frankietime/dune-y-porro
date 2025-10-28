export const isNullOrEmpty = (item: any) => {
    const type = typeof item;

    switch (type) {
        case "string":
            return item == "";
        default:
           return item == null || item == undefined;
    }
}

export const getEnumStringKeys = (_: {}) => Object.keys(_).filter(k => isNaN(parseInt(k)));
export const getEnumNumberKeys = (_: {}) => Object.keys(_).filter(k => typeof k == "string").map(k => parseInt(k));