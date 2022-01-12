import { Request, Response, NextFunction } from "express";
import { verify, sign } from "jsonwebtoken";
import appConfig from "../config/environments";

const conf = appConfig.passport.JWT

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: any = req.headers["user_token"];
  let jwtPlayload
  console.log("res->", req.headers);
  
  if (!token) {
    return res.status(403).send("User is not autenticated!");
  }
  try {
    jwtPlayload = verify(token, conf.CLIENT_SECRET);
    res.locals.jwtPlayload = jwtPlayload
  } catch (err) {
    return res.status(401).send("Error trying to autenticate");
  }

  const {user_id, username}: any = jwtPlayload

  const newToken = sign({user_id, username}, conf.CLIENT_SECRET, {expiresIn: '15d'})
  res.setHeader("token", newToken)

  return next();
};

export default verifyToken