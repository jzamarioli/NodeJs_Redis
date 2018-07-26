const uuidv1 = require('uuid/v1');

exports.GenerateNewGuid = () => {
    return uuidv1(); // timestamped guid
}
