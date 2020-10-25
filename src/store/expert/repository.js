export function TopicExpertsByTopicId(topicId, userTimezone) {
    const result = fetch("https://localhost:44343/api/expert/TopicExpertsByTopicId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            topicId: topicId,
            userTimezone: userTimezone
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

export function OrdersByUserEmail(userEmail){
    const result = fetch("https://localhost:44343/api/expert/OrdersByUserEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userEmail
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function ExpertTimezoneId(userEmail) {
    const result = fetch("https://localhost:44343/api/Expert/expertTimezone", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userEmail
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData.id;
    });
    return result;
}

export function ExpertTopics(userEmail) {
    const result = fetch("https://localhost:44343/api/Expert/TopicsByUserEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userEmail
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function GetActiveStatus(userEmail) {
    const result = fetch("https://localhost:44343/api/Expert/IsActive", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            userEmail
        )
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function ToggleIsActive(isActive, userEmail) {
    const result = fetch("https://localhost:44343/api/Expert/ToggleIsActive", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userEmail,
            isActive: isActive
        })
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function UpdateTimezone(userEmail, timezoneId) {
    const result = fetch("https://localhost:44343/api/Expert/UpdateTimezone", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userEmail,
            timezoneId: timezoneId
        })
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}