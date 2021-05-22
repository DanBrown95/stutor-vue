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
    const result = fetch('https://localhost:44343/api/account/ResendPhoneConfirmation', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(
            userId
        )
    })
    .then((response) => response.json())
    .then((jsonData) => {
        return jsonData;
    });
    return result;
}

export function VerifyPhonePin(userId, pin, accessToken){
    const result = fetch('https://localhost:44343/api/account/VerifyPhonePin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            userId: userId,
            pin: pin
        })
    })
    .then((response) => response.json())
    .then((jsonData) => {
        return jsonData;
    });
    return result;
}

export function UpdatePhone(accessToken, userId, oldPhone, newPhone){
    const result = fetch('https://localhost:44343/api/account/UpdatePhoneNumber', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            userId: userId,
            oldPhone: oldPhone,
            newPhone: newPhone
        })
    })
    .then((response) => response.json())
    .then((jsonData) => {
        return jsonData;
    });
    return result;
}