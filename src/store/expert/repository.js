import axios from "axios"

export function TopicExpertsByTopicId(accessToken, topicId, userCoordinates, userId) {
    return axios({
        url: 'https://localhost:44343/api/expert/TopicExpertsByTopicId',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: {
            topicId: topicId,
            userCoordinates: userCoordinates,
            requestingUserId: userId
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/expert/TopicExpertsByTopicId", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         topicId: topicId,
    //         userTimezone: userTimezone,
    //         requestingUserId: userId
    //     })
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}

export function Register(formData, accessToken){
    return axios({
        url: 'https://localhost:44343/api/expert/Register',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: formData
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch('https://localhost:44343/api/expert/Register', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}

export function UploadDocuments(documents, accessToken) {
    return axios({
        url: 'https://localhost:44343/api/expert/UploadDocuments',
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        data: documents
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/expert/UploadDocuments", {
    //     method: "POST",
    //     headers: {
    //         "Authorization": `Bearer ${accessToken}`
    //     },
    //     body: documents
    // })
    // .then( (response) => {
    //     return response;
    // });
    // return result;
}

export function OrdersByUserId(userId){
    return axios({
        url: 'https://localhost:44343/api/expert/OrdersByUserId',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/expert/OrdersByUserId", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
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

export function ExpertTimezoneId(userId) {
    return axios({
        url: 'https://localhost:44343/api/Expert/expertTimezone',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/Expert/expertTimezone", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(
    //         userId
    //     )
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData.id;
    // });
    // return result;
}

export function ExpertLocationById(userId) {
    return axios({
        url: 'https://localhost:44343/api/Expert/expertLocation',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
}

export function UpdateLocation(userId, location) {
    return axios({
        url: 'https://localhost:44343/api/Expert/UpdateLocation',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            userId: userId,
            location: location
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
}

export function ExpertTopics(userId) {
    return axios({
        url: 'https://localhost:44343/api/Expert/TopicsByUserId',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/Expert/TopicsByUserId", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
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

export function GetActiveStatus(userId) {
    return axios({
        url: 'https://localhost:44343/api/Expert/IsActive',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/Expert/IsActive", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
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

export function ToggleIsActive(isActive, userId) {
    return axios({
        url: 'https://localhost:44343/api/Expert/ToggleIsActive',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            userId: userId,
            isActive: isActive
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/Expert/ToggleIsActive", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         userId: userId,
    //         isActive: isActive
    //     })
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}

export function UpdateTimezone(userId, timezoneId) {
    return axios({
        url: 'https://localhost:44343/api/Expert/UpdateTimezone',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            userId: userId,
            timezoneId: timezoneId
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
    
    // const result = fetch("https://localhost:44343/api/Expert/UpdateTimezone", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         userId: userId,
    //         timezoneId: timezoneId
    //     })
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //     return jsonData;
    // });
    // return result;
}

export function RevokeTopicExpert(topicExpertId, expertId, accessToken){
    return axios({
        url: 'https://localhost:44343/api/expert/RevokeTopicExpert',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: {
            topicExpertId: topicExpertId,
            expertId: expertId
        }
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
}

export function GetSpecialties(topicExpertId, accessToken){
    return axios({
        url: 'https://localhost:44343/api/expert/GetSpecialties',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: JSON.stringify(topicExpertId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
}

export function UpdateSpecialties(accessToken, payload) {
    return axios({
        url: 'https://localhost:44343/api/expert/UpdateTopicExpertSpecialties',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: payload
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
}

export function HasIncompleteOrders(userId, accessToken){
    return axios({
        url: 'https://localhost:44343/api/expert/HasIncompleteOrders',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: JSON.stringify(userId)
    })
    .then(response => { return response.data; })
    .catch(error => console.log(JSON.stringify(error.response.data.errors)));
}