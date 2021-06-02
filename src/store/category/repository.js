import axios from 'axios'

export function GetAll() {
    return axios({
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        url: 'https://localhost:44343/api/category/GetAll'
    })
    .then(response => { return response.data; })
    .catch(error => console.error(error));
    // const result = fetch("https://localhost:44343/api/category/GetAll", {
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

export function GetAllPopular(){
    return axios({
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        url: 'https://localhost:44343/api/category/GetAllPopular'
    })
    .then(response => { return response.data; })
    .catch(error => console.error(error));

    // const result = fetch("https://localhost:44343/api/category/GetAllPopular", {
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