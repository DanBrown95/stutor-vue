import axios from 'axios'

export function GetAllByUserId(userId, accessToken){
    return axios({
        url: 'https://localhost:44343/api/order/GetAllByUserId',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/order/GetAllByUserId", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`
    //     },
    //     body: JSON.stringify(
    //         userId
    //     )
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}

export function SubmitPasskey(id, clientPasskey, userId, accessToken){
    var editedItem = {
        orderId: id,
        clientPasskey: clientPasskey,
        userId: userId
    }

    return axios({
        url: 'https://localhost:44343/api/order/SubmitPasskeys',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: editedItem
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));

    // const result = fetch("https://localhost:44343/api/order/SubmitPasskeys", {
    //     method: "POST",
    //     headers: {
    //         "Authorization": `Bearer ${accessToken}`,
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(editedItem)
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}