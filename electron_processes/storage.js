const Datastore = require('nedb');

const userDataPath = process.env.APP_DATA;

const db = new Datastore({ 
    filename: process.env.NODE_ENV === "dev" ? 
                "data.db"
                : userDataPath + "/data/napster.db",
    autoload: true 
});

function findOne(searchQuery) {
    return new Promise((resolve, reject) => {
        db.findOne(searchQuery, (error, data) => {
            if (error) {
                console.log(error);
            }
            resolve(data);
        });
    });
}

function find(searchQuery) {
    return new Promise((resolve, reject) => {
        db.find(searchQuery, (error, data) => {
            if (error) {
                console.log(error);
            }
            resolve(data);
        });
    });
}

function insert(insertContent) {
    return new Promise((resolve, reject) => {
        db.insert(insertContent, (error, data) => {
            if (error) {
                console.log(error);
            }
            resolve(data);
        });
    });
}

function update(searchQuery, updateContent) {
    return new Promise((resolve, reject) => {
        db.update(searchQuery, updateContent, (error, data) => {
            if (error) {
                console.log(error);
            }
            resolve(data);
        });
    });
}

module.exports = {
    findOne, 
    find,
    insert,
    update
};
