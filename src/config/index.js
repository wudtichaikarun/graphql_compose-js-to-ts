import 'dotenv/config'

export default {
  PORT: process.env.PORT || '4000',
  token: {
    secret: process.env.TOKEN_SECRET,
  },
}
