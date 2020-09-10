export function CompareBySubmitted(a, b) {
    if (a.submitted < b.submitted) return -1;
    if (a.submitted > b.submitted) return 1;
    
    return 0;
}

export function CompareByStatus(a, b) {
    if (a.status.toLowerCase() == "unanswered" && b.status.toLowerCase() != "unanswered") return -1
    if (a.status.toLowerCase() != "unanswered" && b.status.toLowerCase() != "unanswered") return 1;

    return 0;
}

export function CompareBySubmittedThenStatus(a, b) {
    var x = CompareBySubmitted(a, b);
    if(x == -1 || x == 0){
        return CompareByStatus(a, b);
    }
    if(x == 1){
        return CompareByStatus(b,a);
    }
}