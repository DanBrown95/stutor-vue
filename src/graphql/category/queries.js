import gql from 'graphql-tag'

export const ALL_CATEGORIES_QUERY = gql`
    query getCategories {
        categories {
            id,
            name,
            imageUrl
        }
    }
`;