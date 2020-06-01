const isObjectEmpty = (obj) => {
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true
}

const Endpoint = 'https://axol.herokuapp.com/'
    // let socket;

module.exports = { isObjectEmpty, Endpoint }