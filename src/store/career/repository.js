import axios from 'axios'

export function GetAllAvailableJobs() {
    return axios({
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        url: 'https://localhost:44343/api/career/GetAllAvailableJobs'
    })
    .then(response => { return response.data; })
    .catch(error => console.error(error));
}