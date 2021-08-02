export function CompareBySubmitted(a, b) {
    if (a.submitted < b.submitted) return 1;
    if (a.submitted > b.submitted) return -1;
    
    return 0;
}

export function CompareByStatus(a, b) {
    if (a.status.toLowerCase() == "unanswered" && b.status.toLowerCase() != "unanswered") return -1
    if (a.status.toLowerCase() != "unanswered" && b.status.toLowerCase() != "unanswered") return 1;

    return 0;
}

export function CompareExpertsByRating(a, b) {
  if ( a.rating < b.rating ){
    return -1;
  }
  if ( a.rating > b.rating ){
    return 1;
  }
  return 0;
}