const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mern-marketplaceCH7andCH8',
  stripe_connect_test_client_id: 'ca_FkyHCg7X8mlvCUdMDao4mMxagUfhIwXb',
  stripe_test_secret_key: 'sk_test_51Kyjy3LYs1bfnmbVmEskK9xQFUfhIBH1uHqGvOIX30TeE5sbjLmGsDowp717DkTbuI0q6JhJUPA4l1m0Ws0AKHG200Evb0JLxX',
  stripe_test_api_key: 'pk_test_51Kyjy3LYs1bfnmbVErAh7skhIvQJYTY0ZFhkGP3Ji6tV3LDrGVIeP6eZNKIpgaUXdL59bhrGzmCVzjE1ysnu9HZj00Qpe3fXnT'
}

export default config

