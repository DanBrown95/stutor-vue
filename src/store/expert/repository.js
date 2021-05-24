export function TopicExpertsByTopicId(topicId, userTimezone, userId) {
    const result = fetch("https://localhost:44343/api/expert/TopicExpertsByTopicId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            topicId: topicId,
            userTimezone: userTimezone,
            requestingUserId: userId
        })
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function Register(formData, accessToken){
    const result = fetch('https://localhost:44343/api/expert/Register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function UploadDocuments(documents, accessToken) {
    const result = fetch("https://localhost:44343/api/expert/UploadDocuments", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        body: documents
    })
    .then( (response) => {
        return response;
    });
    return result;
}

export function OrdersByUserId(userId){
    const result = fetch("https://localhost:44343/api/expert/OrdersByUserId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userId
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function ExpertTimezoneId(userId) {
    const result = fetch("https://localhost:44343/api/Expert/expertTimezone", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userId
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData.id;
    });
    return result;
}

export function ExpertTopics(userId) {
    const result = fetch("https://localhost:44343/api/Expert/TopicsByUserId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userId
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function GetActiveStatus(userId) {
    const result = fetch("https://localhost:44343/api/Expert/IsActive", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userId
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function ToggleIsActive(isActive, userId) {
    const result = fetch("https://localhost:44343/api/Expert/ToggleIsActive", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            isActive: isActive
        })
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function UpdateTimezone(userId, timezoneId) {
    const result = fetch("https://localhost:44343/api/Expert/UpdateTimezone", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            timezoneId: timezoneId
        })
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}