const express = require("express");  // express로 변수 선언해서 express 설치한 것을 가지고 옴 
const app = express();  // express를 실행해서 app이라는 변수에 대입  
//127.0.0.1 // 우리가 이 express를 몇 번 방에서 실행할건지(포트번호)를 지정해줘야 실행이 됨 / 3000번이라는 포트를 지정해주기

const router = require("./router/router.js"); 
// router.js에서 module까지 읽었을 때 다시 돌아오는 것을 받기 위해 const router로 선언해준다. 

// static 등록을 안하면 ejs가 css를 잡지못해서 등록해줘야함
app.use(express.static("./public"));

// body-parser : post 방식을 분석할 수 있는 함수 
// 가지고 오는 부분이 있고 미들웨어를 선언하는 부분이 있음 
const bodyparser = require("body-parser");

let ejs = require('ejs');
const DBrouter = require("./router/DBrouter.js");
const EJSrouter = require("./router/EJSrouter.js")
const Sessionrouter = require("./router/Sessionrouter.js")

const session = require("express-session"); // 세션기능
const mysql_session = require("express-mysql-session"); // 세션이 저장되는 영역(mysql로)
const Messagerouter = require("./router/Messagerouter.js");

app.set('view engine', 'ejs');
// set : 이미 nodejs에 있는 속성 중 하나(설정) / use : 기능이 있는 미들웨어를 쓰겠다(ex)router) 

// mysql에 대한 정보를 담고 있는 변수 선언하기
// config에 저장해놨기 때문에 안에 내용만 복붙함
let conn = {
    host : "127.0.0.1",
    user : "root",
    password : "duddls5163!",
    port : "3306",   
    database : "nodejs_db"
}

// session 기능 가지고와서 conn 정보를 넣고 DB에서 사용할 수 있는 정보인지 확인하고 나서 변수에 넣어줌 
// mysql에 session을 담을 수 있는 공간이 있는지 확인하는 것 
let conn_session = new mysql_session(conn);

// 실제 session기능(저장위치: mysql)을 미들웨어로 등록한 것
app.use(session({
    secret : "smart",
    resave : false, // 매번 서버에 저장할건지 안할건지 
    saveUninitialized : true, // 매번시작할 때마다 초기화 할건지
    store : conn_session // 세션이 저장되는 공간
}))


// body-parser가 가진 내장된 설정은 잘 사용하지 않아서 
// post방식일 때 body 영역을 분석해주는 미들웨어로 bodyparser 등록 
// 밑에 router 등록하기 전에 이거 먼저 등록해야함 
app.use(bodyparser.urlencoded({extended:false}));

app.use(router); // 미들웨어로 router 등록 / 등록을 해줘야 쓸 수 있음 
app.use(DBrouter);
app.use(EJSrouter);
app.use(Sessionrouter);
app.use(Messagerouter);

app.listen(3000); // 현재 서버파일의 포트 번호 설정 


// ex01.html에서 client가 실행 -> submit 버튼 누르면 입력된 num1, num2 값이 넘어감
// -> 서버가 가진 방 중에서 3000번이라는 포트 방으로 들어감 -> 그안에 /plus라는 라우터로 들어감 
// -> 라우터 안에 있는 request의 .query라는 기능으로 num1, num2를  ... 

// 할 때 라우터를 먼저 만들어주기 ?