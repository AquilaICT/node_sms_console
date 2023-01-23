const axios = require('axios');
const envconfig = require('../envconfig');


module.exports.getByGroup = function (group_id, user_id) {
    return axios
        .get(`${envconfig.backendHost}/api/contact/group?group_id=${group_id}&user_id=${user_id}`, {
            headers: {
                'authorization': `Bearer ${envconfig.jwt}`
            }
        })

}