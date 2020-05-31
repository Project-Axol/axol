const isObjectEmpty = (obj) => {
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true
}

const Endpoint = 'http://localhost:3000/'
let socket;

module.exports = { isObjectEmpty, Endpoint, socket }