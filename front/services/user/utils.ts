import jwt from "jsonwebtoken";
import { TokenPayload } from "@/services/user/request";
import { REFRESH_TOKEN_EXPIRATION_DAY } from "@/services/user/const";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || ""
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || ""

export const signAccessToken = (payload: TokenPayload) => jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1h" })

export const signRefreshToken = (payload: TokenPayload) => jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_TOKEN_EXPIRATION_DAY}d` })