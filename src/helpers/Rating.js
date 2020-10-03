export function RatingAsTitle(rating) {
    var title = ''
    switch (rating) {
        case 1:
            title = 'Novice'
            break;
        case 2:
            title = 'Beginner'
            break;
        case 3:
            title = 'Expert'
            break;
        case 4:
            title = 'Master'
            break;
        case 5:
            title = 'Scholar'
            break;
    }
    return title;
}