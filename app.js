const express = require('express');     // 설치된 express 사용 선언
const app = express(); // express 실행 -> app이라는 변수에 대입

const router = require('./router/router.js');

// const router = express.Router();    // express 갖고 있는 기능 중에 router 기능 사용

// router.get('/plus', function(req,res){  // req : 사용자의 모든 정보를 가지고 있는것 // res : 응답   // /plus라우터 기능정의 및 등록
//     console.log('/plus 라우터 호출')
//     console.log(parseInt(req.query.num1)+parseInt(req.query.num2));        // body-parser는 post방식에서만 쓰인다.

//     res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});    // res.writeHead : 사용자에게 응답할 html 파일을 지정
//     res.write('<html>');                                                // res.write : 보내지는 html에 써지는것
//     res.write('<body>');
//     res.write('응답성공<br>');
//     res.write('결과값 : ' + (parseInt(req.query.num1)+parseInt(req.query.num2)));
//     res.write('</body>');
//     res.write('</html>');
//     res.end();                                                          // res.end() : 응답된 파일 전송
// });

// router.get('/cal', (req,res) => {       // /cal라우터 기능정의 및 등록
//     // 1. 사용자가 입력한 값을 가져오기
//     let num1 = req.query.num1;
//     let num2 = req.query.num2;
//     let cal = req.query.cal;

//     console.log(num1 + cal + num2);

//     // 2. 사용자가 입력한 기호에 맞는 연산 결과 값을 브라우저에 출력하시오.
//     res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
//     res.write('<html>');                                                
//     res.write('<body>');
//     if(cal=='+') {
//         res.write('결과값 : ' + (parseInt(req.query.num1) + parseInt(req.query.num2)));
//     } else if(cal=='-') {
//         res.write('결과값 : ' + (parseInt(req.query.num1) - parseInt(req.query.num2)));
//     } else if(cal=='*') {
//         res.write('결과값 : ' + (parseInt(req.query.num1) * parseInt(req.query.num2)));
//     } else {
//         res.write('결과값 : ' + (parseInt(req.query.num1) / parseInt(req.query.num2)));
//     }
//     res.write('</body>');
//     res.write('</html>');
//     res.end();
// })

const bodyparser = require('body-parser'); // body-parser는 express 가지고 있는 기능중 하나로 post방식에서 데이터를 분석할수 있는 기능
app.use(bodyparser.urlencoded({extended:false})); // post 방식일때, body 영역을 분석해주는 미들웨어로 bodyparser 등록
// 반드시 방법을 설정하고 router를 등록해야한다.
app.use(router);        // 미들웨어로 router 등록


app.listen(3000);       // 현재 서버파일의 port번호 설정