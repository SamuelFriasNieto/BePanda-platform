import { createUser } from "../../model/modelUser";

export async function insertUser(req, res){
    createUser(req.name, req.email)
}




