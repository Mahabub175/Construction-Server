import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: JwtPayload | object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
): string => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
