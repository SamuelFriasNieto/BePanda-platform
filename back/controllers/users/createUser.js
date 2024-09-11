import { createUser } from "../../model/modelUser";

export async function insertUser(name, email){
    createUser(name, email)
}




