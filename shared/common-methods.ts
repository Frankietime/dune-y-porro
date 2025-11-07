export const isNullOrEmpty = (item: any) => {
    const type = typeof item;

    switch (type) {
        case "string":
            return item == "";
        default:
           return item == null || item == undefined || item.length == 0;
    }
}

export const getEnumStringKeys = (_: {}) => Object.keys(_).filter(k => isNaN(parseInt(k)));
export const getEnumNumberKeys = (_: {}) => Object.keys(_).filter(k => typeof k == "string").map(k => parseInt(k));

export const log = (text?: string, isPhase?: boolean) => text ? console.log(`${isPhase ? '**  ' :'    -> '}${text}${isPhase ? ' PHASE  **' :''}`) : console.log(isPhase ? '----' : '');