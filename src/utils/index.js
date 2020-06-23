export function isBlank(obj) {
    if (obj != null && obj != undefined && obj != '') {
        return false
    }
    else {
        return true
    }
}
export function isBlankDisplay(obj) {
    if (obj != null && obj != undefined && obj != '' && obj != 0 && obj != NaN && obj != '0000-00-00') {
        return false
    }
    else {
        return true
    }
}

export function capitalFirst(string) {
    if (isBlank(string) == false && string.length > 0) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else {
        return isBlank(string) ? "" : string
    }
}

