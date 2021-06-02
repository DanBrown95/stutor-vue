import axios from "axios"

export function GetAllByCategoryId(topicId){
    return axios({
        url: 'https://localhost:44343/api/topic/GetTopicsByCategory',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: topicId
    })
    .then(response => { return response.data; })
    .catch(error => console.error(error));
    // const result = fetch("https://localhost:44343/api/topic/GetTopicsByCategory", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: topicId
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}

export function Get(id){
    return axios({
        url: 'https://localhost:44343/api/topic/Get',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: id
    })
    .then(response => { return response.data; })
    .catch(error => console.error(error));

    // const result = fetch("https://localhost:44343/api/topic/Get", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: id
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}

export function GetBySubstring(val) {
    return axios({
        url: 'https://localhost:44343/api/topic/GetBySubstring',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(val)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));

    // const result = fetch("https://localhost:44343/api/topic/GetBySubstring", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(
    //             val
    //         )
    //     })
    //     .then(response => response.json())
    //     .then(jsonData => {
    //         return jsonData;
    //     });
    // return result;
}

export function SubmitRequest(accessToken, payload) {
    return axios({
        url: 'https://localhost:44343/api/topic/SubmitRequest',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: payload
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/topic/SubmitRequest", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`
    //     },
    //     body: JSON.stringify(payload)
    //     })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}