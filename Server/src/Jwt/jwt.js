import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  console.log("@payload", payload);
  const token = jwt.sign(payload, "Barcelona Baby");
  return token;
};

export const verifyToken=(token)=>{

   return jwt.verify(token,"Barcelona Baby");


}