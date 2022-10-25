const express = require("express");
const EJSrouter = express.Router();

// EJS를 사용하지 않으면 res.write를 고대로 여기에 작성해야함 
// 하지만 EJS를 사용하면 별도 ejs 파일에 작성하면 됨 (ejs 파일에는 HTML 코드랑 비슷하니까 CSS 바로 적용 가능)
// -> 그래서 템플릿엔진을 사용하는 것!
EJSrouter.get("/ejs01", (req, res) => {

    console.log("/ejs01 라우터 실행")
    res.render("ex01EJS", {
        // ,를 기준으로 여러개 작성 가능 
        name1 : "value1",
        name2 : "value2"
    })
        

})


module.exports = EJSrouter;