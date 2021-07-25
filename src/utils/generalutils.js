export function guid() {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    // returns id of formxt 'xxxxxxxx'-'xxxx'-'xxxx'-'xxxx'-'xxxxxxxxxxxx'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function sortListByIdList(list, newIdList) {
    return list.sort((a, b) => {
        return newIdList.indexOf(a.id) - newIdList.indexOf(b.id);
    });
}

export function sortListAlphabetically(list) {
    return list.sort((a, b) => a.name.localeCompare(b.name));
}