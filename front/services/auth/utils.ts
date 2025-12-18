import jwt from "jsonwebtoken";
import crypto from "crypto";

import { TokenPayload } from "@/services/auth/request";
import { REFRESH_TOKEN_EXPIRATION_DAY } from "@/services/auth/const";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || ""
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || ""

export const sha256 = (value: string) => crypto.createHash("sha256").update(value).digest("hex")

export const signAccessToken = (payload: TokenPayload) => jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1h" })

export const signRefreshToken = (payload: TokenPayload) => jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_TOKEN_EXPIRATION_DAY}d` })