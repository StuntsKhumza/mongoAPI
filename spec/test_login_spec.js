var request = require('request');
var packagejson = require("../package.json");

const url_login = "http://localhost:" + packagejson.port;

describe("Server running", function () {
  describe("GET", function () {
    it("returns status code 200", function (done) {
      request.get(url_login, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});

describe("Response should be 'working'", function () {
  describe("GET", function () {
    it("returns body = worked", function (done) {
      request.get(url_login + "/log", function (error, response, body) {
        expect(response.body).toContain("worked");
        done();
      });
    });
  });
});

describe("Response should be '200' for loggin", function () {
  describe("POST", function () {
    it("returns body = json contains 200", function (done) {

      var data = { username: "nkosi", password: "test" };

      request.post(url_login + "/log", data, function (error, response, body) {
        console.log(response);
        expect(response.body).toContain("200");
        done();
      });

    });
  });
});