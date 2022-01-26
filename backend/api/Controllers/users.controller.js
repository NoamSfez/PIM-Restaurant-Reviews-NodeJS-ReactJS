//User controller using AXIOS library to consume Spring RestAPI

import axios from "axios";

let instance = axios.create();

export default class UsersController {
  static async getAllUsers(req, res, next) {
    let rep = await instance.get("http://localhost:8080/api/employees/");
    res.json(rep.data);
  }

  static async getUserByID(req, res, next) {
    const id = req.params.id;
    let rep = await instance.get(`http://localhost:8080/api/employees/${id}`);
    res.json(rep.data);
  }

  static async postUser(req, res, next) {
    const data = JSON.stringify(req.body); //body request
    console.log("data", data);
    try {
      let rep = await instance.post(
        "http://localhost:8080/api/employees/",
        data
      );
      console.log(rep.data);
    } catch (error) {
      console.log(error.toJSON());
    }
  }
}
