import {Request, Response, NextFunction} from "express"; 

export function ensureAdmin(request: Request, response: Response, next: NextFunction){

   const isAdmin = false;

   if(isAdmin){
      //  next segue na rota
      return next();
   }

   return response.status(401).json({
      error:"User unauthorized"
   })
    
}