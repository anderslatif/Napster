const newIdList = [2, 5, 1];

const listToSort = [[{ id: 5}, { id: 1}, { id: 2}]];

listToSort[0].sort((a, b) => {
    return newIdList.indexOf(a.id) - newIdList.indexOf(b.id);
});

console.log(listToSort);