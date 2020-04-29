module.exports = {
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-plugin-react-leaflet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'LaunchTime',
        short_name: 'LaunchTime',
        start_url: '/',
        icon: './src/assets/images/launchtime-one-color.png'
      },
    },
  ],
};
