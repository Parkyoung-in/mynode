const express = require('express');
const { rawListeners } = require('../config/DBConfig.js');
const Messagerouter = express.Router();

// 1. app.js 미들웨어 등록
// 2. DB정보등록(conn) 
const conn = require("../config/DBConfig.js")

Messagerouter.get('/Message', (req, res) => {

    // 현재 로그인한 사람에게 온 메세지를 검색

    // let sql = 'select send, content, DATE_FORMAT(send_date,"%Y-%m-%d") as send_date from web_message where rec=?'
    let sql = 'select * from web_message where rec=?'

    if(req.session.user){   // if문이 없으면 로그인이 안되어있을때 user는 null값인데 거기서 email을 찾으려고 하면 error 뜸
        conn.query(sql, [req.session.user.email], (err, row) => {
            console.log(row);
            
            res.render("message", {
                user : req.session.user,
                row_name : row
            });
        })
    } else {
        res.render("message", {
            user : req.session.user
        });

    }
});
Messagerouter.get('/MessageLogout', (req, res) => {

    delete req.session.user;

    res.redirect('http://127.0.0.1:3000/Message');
});

Messagerouter.post('/MessageJoin', (req,res) => {
    
    let email = req.body.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address

    let sql = "insert into web_member values(?, ?, ?, ?, now())";
    // 사용자가 입력한 값 넣으려면 ?를 넣어준다. 
    // 물음표 순서대로 변수를 아래 대괄호에 작성해준다.
    conn.query(sql, [email, pw, tel, address], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("입력성공 : " + row);
            res.redirect("http://127.0.0.1:3000/Message"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("입력실패 : " + err);
        }

    })


});

// Login 기능 구현
// 1. message.ejs에 form 수정
// 2. MessageLogin 라우터를 구현
// 3. 로그인 성공 후 Message 페이지로 이동

Messagerouter.post('/MessageLogin', (req, res) => {
    let email = req.body.email;
    let pw = req.body.pw;

    let sql = "SELECT * from web_member where email = ? and pw = ?";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, [email, pw], (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);

        } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라
            
            // 로그인에 성공하면 session에 id값을 저장해라 
            req.session.user = {
                'email' : row[0].email,
                'tel' : row[0].tel,
                'address' : row[0].address
            };

            console.log("session영역에 id저장 성공" + req.session.user);
            
            // 검색된 데이터가 있음 -> 로그인 성공
            res.redirect('http://127.0.0.1:3000/Message')
        } else if (row.length == 0) { 
            // 검색된 데이터가 없음 -> 로그인 실패
            res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginF.html");
            
        }
    })
    
});

Messagerouter.get('/MessageUpdate', (req,res) => {
    
    // update.eis 파일을 랜더링
    
    res.render('update', {
        user : req.session.user
    })



});

Messagerouter.post('/MessageUpdateExe', (req,res) => {
    
    let email = req.session.user.email; // update.ejs에서 email은 사용자가 입력한 것이 아니라 session에서 가져왔으므로 session에서 불러와야한다.
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address
    
    // 사용자가 입력한 pw, tel, address로 email의 정보를 수정하시오

    let sql = "update web_member set pw=?, tel=?, address=? where email=?";
    // 사용자가 입력한 값 넣으려면 ?를 넣어준다. 
    // 물음표 순서대로 변수를 아래 대괄호에 작성해준다.
    conn.query(sql, [pw, tel, address, email], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("수정성공 : " + row);

            req.session.user = {
                'email' : email,
                'tel' : tel,
                'address' : address 
            }
            res.redirect("http://127.0.0.1:3000/Message"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("수정실패 : " + err);
        }

    })


});

Messagerouter.get('/MessageMemberSelect', (req, res) => {

    let sql = "SELECT * from web_member";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);

        } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라
            
           
            
            // 검색된 데이터가 있음 -> 로그인 성공
            res.render("selectMember", {
                row_name : row
            })
        } else if (row.length == 0) { 
            // 검색된 데이터가 없음
            res.redirect("http://127.0.0.1:3000/Message");
            
        }
    })
    
});

Messagerouter.get('/MessageDelete', (req,res) => {
    
    let email = req.query.email;    // req.session.email로 하면 반드시 admin 계정만 삭제된다 -

    let sql = "delete from web_member where email = ?";
  
    conn.query(sql, [email], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("삭제성공 : " + row);
            res.redirect("http://127.0.0.1:3000/MessageMemberSelect"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("삭제실패 : " + err);
        }

    })


});

Messagerouter.post('/MessageSend', (req,res) => {
    
    let send = req.body.send;
    let rec = req.body.rec;
    let content = req.body.content;

    let sql = "insert into web_message(send, rec, content, send_date) values(?, ?, ?, now())";
    // 사용자가 입력한 값 넣으려면 ?를 넣어준다. 
    // 물음표 순서대로 변수를 아래 대괄호에 작성해준다.
    conn.query(sql, [send, rec, content], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("입력성공 : " + row);
            res.redirect("http://127.0.0.1:3000/Message"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("입력실패 : " + err);
        }

    })


});


module.exports = Messagerouter;