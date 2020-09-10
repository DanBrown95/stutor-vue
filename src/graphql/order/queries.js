import gql from 'graphql-tag'

export const ALL_ORDERS_QUERY = gql`
    query getOrders {
        orders(userId: $userId) {
          id,
          topicId,
          expertId,
          userId,
          charge,
          status,
          submitted,
          callLegnth
        }
    }
`;