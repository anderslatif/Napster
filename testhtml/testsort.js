const newIdList = [
    "d89257ff-cb62-dc8d-7246-b8a3999ac894",
    "91e00df8-163a-74dc-8667-16712f4f4f34",
    "ed44d28a-3adb-5417-c6b6-7a2a6a9b4b02"
];


const listToSort = [
    { id: "ed44d28a-3adb-5417-c6b6-7a2a6a9b4b02"}, 
    { id: "91e00df8-163a-74dc-8667-16712f4f4f34"}, 
    { id: "d89257ff-cb62-dc8d-7246-b8a3999ac894"}
];

listToSort.sort((a, b) => {
    return newIdList.indexOf(a.id) - newIdList.indexOf(b.id);
});

// console.log(listToSort);

function getRandomId(size = 20) {
    let randomId = ""
    for (let i = 0; i < size; i++) {
        randomId += Math.floor(Math.random() * 10);
    }
    return randomId;
}
console.log(getRandomId());