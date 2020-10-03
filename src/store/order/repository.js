export function GetAllByUserId(userId, accessToken){
    const result = fetch("https://localhost:44343/api/order/GetAllByUserId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
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

export function SubmitPasskey(id, clientPasskey, userId, accessToken){
    var editedItem = {
        orderId: id,
        clientPasskey: clientPasskey,
        userId: userId
    }

    const result = fetch("https://localhost:44343/api/order/SubmitPasskeys", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedItem)
    })
    .then((response) => {
        return response;
    });
    return result;
}