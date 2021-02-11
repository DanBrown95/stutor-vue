export function EmailConfirmation(userId, accessToken){
    const result = fetch('https://localhost:44343/api/verification/ResendEmailVerification', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
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

export function PhoneConfirmation(userId, accessToken){
    const result = fetch('https://localhost:44343/api/verification/ResendPhoneConfirmation', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            userId: userId,
            token: accessToken
        })
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}