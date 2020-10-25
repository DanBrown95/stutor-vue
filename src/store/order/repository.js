export function GetAllByUserEmail(userEmail, accessToken){
    const result = fetch("https://localhost:44343/api/order/GetAllByUserEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
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

export function SubmitPasskey(id, clientPasskey, userEmail, accessToken){
    var editedItem = {
        orderId: id,
        clientPasskey: clientPasskey,
        userEmail: userEmail
    }

    const result = fetch("https://localhost:44343/api/order/SubmitPasskeys", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedItem)
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}