import axios from "axios"

export function SendEmail(payload, accessToken) {
    return axios({
        url: 'https://localhost:44343/api/contact/SendEmailAsync',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: payload
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/contact/SendEmailAsync", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`
    //     },
    //     body: JSON.stringify(payload)
    //     })
    // .then((response) => {
    //     return response;
    // });
    // return result;
}

export function UpdateFeedback(orderId, rating, additionalInfo, accessToken){
    return axios({
        url: 'https://localhost:44343/api/order/updateFeedback',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: {
            Id: orderId,
            rating: rating,
            additionalInfo: additionalInfo
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/order/updateFeedback", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`
    //     },
    //     body: JSON.stringify({
    //         Id: orderId,
    //         rating: rating,
    //         additionalInfo: additionalInfo
    //     })
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}