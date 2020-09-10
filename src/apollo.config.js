module.exports = {
    client: {
      service: {
        name: 'stutor',
        // URL to the GraphQL API
        url: 'https://localhost:44343/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }