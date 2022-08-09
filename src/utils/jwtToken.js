import jwt from 'jsonwebtoken'
import "../config/index.js";

const SECRET = process.env.JWT_SECRET || '$1AIKSO%6A41'
const EXPIRED_TIME = process.env.JWT_EXPIRES_IN || '1h'

const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME })
}

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET)
    return decoded
  } catch (err) {
    return null
  }
}

export { createToken, decodeToken }
