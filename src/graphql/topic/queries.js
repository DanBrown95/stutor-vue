import gql from 'graphql-tag'

export const TOPICS_BY_CATEGORY_QUERY = gql`
    query TopicsByCategory($id: Int!) {
        topics (Int: $id) {
            id,
            name
        }
    }
`;