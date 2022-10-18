const express = require('express');

const router = express.Router();    // express 갖고 있는 기능 중에 router 기능 사용

router.get('/plus', function(req,res){  // req : 사용자의 모든 정보를 가지고 있는것 // res : 응답   // /plus라우터 기능정의 및 등록
    console.log('/plus 라우터 호출')
    console.log(parseInt(req.query.num1)+parseInt(req.query.num2));        // body-parser는 post방식에서만 쓰인다.

    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});    // res.writeHead : 사용자에게 응답할 html 파일을 지정
    res.write('<html>');                                                // res.write : 보내지는 html에 써지는것
    res.write('<body>');
    res.write('응답성공<br>');
    res.write('결과값 : ' + (parseInt(req.query.num1)+parseInt(req.query.num2)));
    res.write('</body>');
    res.write('</html>');
    res.end();                                                          // res.end() : 응답된 파일 전송
});

router.get('/cal', (req,res) => {       // /cal라우터 기능정의 및 등록
    // 1. 사용자가 입력한 값을 가져오기
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    let cal = req.query.cal;

    console.log(num1 + cal + num2);

    // 2. 사용자가 입력한 기호에 맞는 연산 결과 값을 브라우저에 출력하시오.
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    res.write('<html>');                                                
    res.write('<body>');
    if(cal=='+') {
        res.write('결과값 : ' + (parseInt(req.query.num1) + parseInt(req.query.num2)));
    } else if(cal=='-') {
        res.write('결과값 : ' + (parseInt(req.query.num1) - parseInt(req.query.num2)));
    } else if(cal=='*') {
        res.write('결과값 : ' + (parseInt(req.query.num1) * parseInt(req.query.num2)));
    } else {
        res.write('결과값 : ' + (parseInt(req.query.num1) / parseInt(req.query.num2)));
    }
    res.write('</body>');
    res.write('</html>');
    res.end();
})


router.post('/Grade', (req, res) => {

    let avg = (parseInt(req.body.java) + parseInt(req.body.web) + parseInt(req.body.iot) + parseInt(req.body.android))/4;
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    res.write('<html>');                                                
    res.write('<body>');
    res.write('이름 : ' + req.body.name + '<br>');
    res.write('자바 : ' + req.body.java + '<br>');
    res.write('웹 : ' + req.body.web + '<br>');
    res.write('IoT : ' + req.body.iot + '<br>');
    res.write('안드로이드 : ' + req.body.android + '<br>');
    res.write('평균 : ' + avg + '<br>');
    if(avg>=95) {
        res.write('grade : A+');
    } else if(avg>=90) {
        res.write('grade : A');
    } else if(avg>=85) {
        res.write('grade : B+');
    } else if(avg>=80) {
        res.write('grade : B');
    } else if(avg>=75) {
        res.write('grade : C');
    } else {
        res.write('grade : F');
    }
    res.write('</body>');
    res.write('</html>');
    res.end();
    
})
module.exports = router;