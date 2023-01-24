import axios from 'axios';
import config  from '../config.js';


export function getByGroup (group_id, user_id) {
    return axios.get(`${config.backendHost}/api/contact/group?group_id=${group_id}&user_id=${user_id}`, {
            headers: {
                'authorization': `Bearer ${config.jwt}`
            }
        })

}