import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn: number | string;
}

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: SignOption = { expiresIn: "h1" }
) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
  return jwt.sign(payload, secretKey, options);
};

export const verifyJwtAccessToken: (
  token: string
) => string | JwtPayload | null = (token) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log(error);
    return null;
  }
};
