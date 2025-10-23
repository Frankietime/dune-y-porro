export const isNullOrEmpty = (item: any) => {
    const type = typeof item;

    switch (type) {
        case "string":
            return item == "";
        default:
           return item == null || item == undefined;
    }
}