import axios from 'axios'

export function EmailConfirmation(userId, accessToken){
    return axios({
        url: 'https://localhost:44343/api/verification/ResendEmailVerification',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));

    // const result = fetch('https://localhost:44343/api/verification/ResendEmailVerification', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`,
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

export function PhoneConfirmation(userId, accessToken){
    return axios({
        url: 'https://localhost:44343/api/account/ResendPhoneConfirmation',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch('https://localhost:44343/api/account/ResendPhoneConfirmation', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify(
    //         userId
    //     )
    // })
    // .then((response) => response.json())
    // .then((jsonData) => {
    //     return jsonData;
    // });
    // return result;
}

export function VerifyPhonePin(userId, pin, accessToken){
    return axios({
        url: 'https://localhost:44343/api/account/VerifyPhonePin',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: {
            userId: userId,
            pin: pin
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch('https://localhost:44343/api/account/VerifyPhonePin', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify({
    //         userId: userId,
    //         pin: pin
    //     })
    // })
    // .then((response) => response.json())
    // .then((jsonData) => {
    //     return jsonData;
    // });
    // return result;
}

export function UpdatePhone(accessToken, userId, oldPhone, newPhone){
    return axios({
        url: 'https://localhost:44343/api/account/UpdatePhoneNumber',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: {
            userId: userId,
            oldPhone: oldPhone,
            newPhone: newPhone
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch('https://localhost:44343/api/account/UpdatePhoneNumber', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify({
    //         userId: userId,
    //         oldPhone: oldPhone,
    //         newPhone: newPhone
    //     })
    // })
    // .then((response) => response.json())
    // .then((jsonData) => {
    //     return jsonData;
    // });
    // return result;
}