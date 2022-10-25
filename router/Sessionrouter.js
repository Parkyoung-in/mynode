const express = require("express");
const Sessionrouter = express.Router();

// create에서는 만들고 select에서는 가져오고 Delete에서는 지우기 
// 화면에 127.0.0.1:3000/create /Select /Delete 해서 log 확인해보기 

Sessionrouter.get("/sessionCreate", (req, res) => {

    // 1. session 생성 
    // session 안에 user라는 이름으로 생성해서 smart라는 데이터를 담음
    // req.session.user = "smart";
    req.session.user = {
        "id" : "smart",
        "pw" : "123",
        "nick" : "smart"
    };

    // 이 마지막까지 작성해야 끝남
    res.end();

})

Sessionrouter.get("/sessionSelect", (req, res) => {

    // 2. session 검색(session에 있는 값 가져오기)
    console.log("session에 있는 user값 : " + req.session.user);

})

Sessionrouter.get("/sessionDelete", (req, res) => {

    // 3. session 삭제
    delete req.session.user;
    res.end();

})

module.exports = Sessionrouter;