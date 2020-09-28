const JWT_SECRET = process.env.JWT_SECRET
const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: '30d',
  },
}

export { JWT_SECRET, tokens }
