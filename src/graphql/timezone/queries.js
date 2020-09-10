import gql from 'graphql-tag'

export const ALL_TIMEZONES_QUERY = gql`
    query getTimezones {
        timezones {
            id,
            friendlyName,
            TZName
        }
    }
`;