export const DATE_FILTER_CHANGED = "DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "DATE_FILTER_CLEAR";

export function dateFilterChanged(){
    return {
        type: DATE_FILTER_CHANGED
    }
}

export function clearDateFilter(){
    return {
        type: DATE_FILTER_CLEAR
    }
}
