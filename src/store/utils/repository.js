export function SendEmail(payload, accessToken) {
    const result = fetch("https://localhost:44343/api/contact/SendEmailAsync", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
        })
    .then((response) => {
        return response;
    });
    return result;
}

export function UpdateFeedback(orderId, rating, additionalInfo, accessToken){
    const result = fetch("https://localhost:44343/api/order/updateFeedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            Id: orderId,
            rating: rating,
            additionalInfo: additionalInfo
        })
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}