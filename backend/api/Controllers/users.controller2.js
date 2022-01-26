//User controller using HTTP module to consume Spring RestAPI

import http from "http";

//"http://localhost:8080/api/employees/"
let SpringApi_options = {
  host: "localhost",
  port: 8080,
  path: "/api/employees/create",
  method: "",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": 0,
  },
};

export default class UsersController {
  static async getAllUsers(req, res, next) {
    let options = JSON.parse(JSON.stringify(SpringApi_options)); //deep copy
    options.method = "GET";

    const reqToSpringAPI = await http.request(options, (resp) => {
      console.log("statusCode: ", resp.statusCode);
      let ans = "";
      resp.on("data", (chunk) => {
        ans += chunk;
      });
      resp.on("end", () => {
        res.json(JSON.parse(ans));
      });
      resp.on("error", (err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    });
    reqToSpringAPI.end();
  }

  static async getUserByID(req, res, next) {
    let options = JSON.parse(JSON.stringify(SpringApi_options)); //deep copy
    options.path += req.params.id;
    options.method = "GET";

    const reqToSpringAPI = await http.get(options, (resp) => {
      console.log("statusCode: ", resp.statusCode);
      let ans = "";
      resp.on("data", (chunk) => {
        ans += chunk;
      });
      resp.on("end", () => {
        res.json(JSON.parse(ans));
      });
      resp.on("error", (err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    });
    reqToSpringAPI.end();
  }

  static async postUser(req, res, next) {
    const data = JSON.stringify(req.body); //body request

    let options = JSON.parse(JSON.stringify(SpringApi_options)); //deep copy
    options.method = "POST";
    options.hearders = {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    };

    const reqToSpringAPI = await http.request(options, (resp) => {
      console.log("statusCode: ", resp.statusCode);
      let ans = "";
      resp.on("data", (chunk) => {
        ans += chunk;
      });
      resp.on("end", () => {
        res.json(JSON.parse(ans));
      });
      resp.on("error", (err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    });

    console.log(data);

    reqToSpringAPI.write(data); //write request body
    reqToSpringAPI.end(); //to signify the end of the request - even if there is no data being written to the request body.
  }
}
