export function GetAll() {
    const result = fetch("https://localhost:44343/api/DisplayUtils/timezones", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(jsonData => {
        return jsonData;
    });
    return result;
}