import axios from "axios"

export function GetAll() {
    return axios({
        url: 'https://localhost:44343/api/DisplayUtils/timezones',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.error(error));
    
    // const result = fetch("https://localhost:44343/api/DisplayUtils/timezones", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}