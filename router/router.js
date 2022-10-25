const express = require("express");
// const mysql = require("mysql"); // mysql을 가져와서 사용하겠다.  // DBconfig파일로 따로 만들면 여기서 안씀 
// DBconfig 작성된 부분은 DBrouter로 옮겨둠!!

const router = express.Router(); // express가 가진 기능 중 router를 사용하겠다 선언

// DBconfig파일로 따로 만들면 여기서 안씀 
// let conn = mysql.createConnection({   // 이코드가 실행되는 순간 DB로 감 
//     // -> 아래 정보를 보고 승인되면 conn이라는 변수를 쓰면 mysql 쓸 수 있음 
//     host : "127.0.0.1",
//     user : "root",
//     password : "gjaischool",
//     port : "3306",   // 기본적으로 이 번호로 설정됨
//     database : "nodejs_db"
// })

router.get("/plus", function(req, res){ // /plus 라우터 기능정의 및 등록
    console.log("/plus 라우터 호출")
    console.log(parseInt(req.query.num1)+parseInt(req.query.num2));
    // 여기까지해서 사용자로부터 정보를 받았다. parseInt 쓰는 이유는 문자열로 받았기 때문에 정수로 바꿔서 더해주기 위해서 

    // 응답
    // 1번: 우리에게 보이지 않는 html 공백이 생긴다. 응답해야하는 파일 지정 
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"}); // text/html로 된 페이지로 응답한다. / 응답방식 utf-8이다. 
    // 2번: 응답해야되는 파일에 html 코드를 작성한다. 
    res.write("<html>");
    res.write("<body>");
    res.write("응답성공<br>");
    res.write("결과값 :" + (parseInt(req.query.num1)+parseInt(req.query.num2))); // 연산한 값에 소괄호 -> 문자랑 같이 더해지면 뒤가 문자로 인식되기 때문에 소괄호 추가함
    res.write("</body>");
    res.write("</html>");
    res.end(); // 3번: 완성된 html 코드가 그대로 사용자에게 전달이 된다.(응답) 
});

router.get("/cal", (req,res) => { // /cal 라우터 기능정의 및 등록
    // 1. 사용자가 입력한 값을 가져오기 
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    let cal = req.query.cal;

    console.log(num1+ cal + num2);

    // 사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하시오. 
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    res.write("<html>");
    res.write("<body>");

    if (cal == "+") {
        res.write("결과값: " + (parseInt(num1)+parseInt(num2)))
    } else if (cal == "-"){
        res.write("결과값: " + (parseInt(num1)-parseInt(num2)))
    } else if (cal == "*"){
        res.write("결과값: " + (parseInt(num1)*parseInt(num2)))
    } else 
        res.write("결과값: " + (parseInt(num1)/parseInt(num2)))
    res.write("</body>");
    res.write("</html>");
    res.end();
});

// post 방식으로 보낸다했는데 get으로 적어놓으면 아예 무시하고 지나감 
// post 방식일 때는 미들웨어를 따로 등록해줘야함 
router.post("/Grade", (req, res) => {

    let avg = (parseInt(req.body.java) + parseInt(req.body.web) 
    + parseInt(req.body.iot) + parseInt(req.body.android))/ 4

    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    res.write("<html>");
    res.write("<body>");
    res.write("이름 : " + (req.body.name) + "<br>");
    res.write("자바 : " + (req.body.java) + "<br>");
    res.write("웹 : " + (req.body.web) + "<br>");
    res.write("IoT : " + (req.body.iot) + "<br>");
    res.write("안드로이드 : " + (req.body.android) + "<br>");
    
    res.write("평균값 : " + avg + "<br>");
    if (avg >=95) {
        res.write("grade : A+")
    } else if (avg >=90) {
        res.write("grade : A")
    } else if (avg >=85) {
        res.write("grade : B+")
    } else if (avg >=80) {
        res.write("grade : B")
    } else if (avg >=75) {
        res.write("grade : C")
    } else {
        res.write("grade : F")
    }

    res.write("</body>");
    res.write("</html>");
    res.end();

})

// ex04.join
router.post("/join", (req, res) => {

    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    res.write("<html>");
    res.write("<body>");

    res.write("ID : " + (req.body.id) + "<br>");
    res.write("NAME : " + (req.body.name) + "<br>");
    res.write("EMAIL : " + (req.body.email) + "<br>");
    res.write("TEL : " + (req.body.tel) + "<br>");
    res.write("GENDER : " + (req.body.gender) + "<br>");
    res.write("COUNTRY : " + (req.body.country) + "<br>");
    res.write("BIRTH : " + (req.body.birth) + "<br>");
    res.write("COLOR : " + (req.body.color) + "<br>");
    res.write("HOBBY : " + (req.body.hobby) + "<br>");
    res.write("TALK : " + (req.body.talk) + "<br>");

    res.write("</body>");
    res.write("</html>");
    res.end();

})






// 현재 선언된 router를 외부에서 사용할 수 있게 선언해주는 것 
module.exports = router;