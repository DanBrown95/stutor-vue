export function GetAllByCategoryId(topicId){
    const result = fetch("https://localhost:44343/api/topic/GetTopicsByCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: topicId
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function Get(id){
    const result = fetch("https://localhost:44343/api/topic/Get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: id
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}

export function GetBySubstring(val) {
    const result = fetch("https://localhost:44343/api/topic/GetBySubstring", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                val
            )
        })
        .then(response => response.json())
        .then(jsonData => {
            return jsonData;
        });
    return result;
}

export function SubmitRequest(accessToken, payload) {
    const result = fetch("https://localhost:44343/api/topic/SubmitRequest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
        })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}