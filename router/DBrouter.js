const express = require("express");
const DBrouter = express.Router();


const conn = require("../config/DBConfig.js")  // require로 주소에 보냈다가 다시 그 내용을  conn으로 여기서 받아줌


// ex05.Login
DBrouter.post("/Login", (req, res) => {

    let id = req.body.id;
    let pw = req.body.pw;

    // res.redirect => 이미 만들어진 페이지로 이동시켜줌 
    //res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginS.html");  // 성공한 페이지 주소 붙여넣기

    // 사용자가 입력한 id가 'smart'이고, pw가 '123'이었을 때 
    // 성공 -> LoginS.html
    // 실패 -> LoginF.html
    // 조건문 활용
//     if (id == "smart" && pw =="123") {
//         res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginS.html");
//     } else {
//         res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginF.html");
//     }
// });


    // 지정된 값이 아닌 입력한 값으로 로그인하기 
//     let sql = "SELECT * from member where id = ? and pw = ?";  // 안에 세미콜론 넣으면 안됨

//     conn.query(sql, [id, pw], (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

//         if(err) {
//             console.log("검색실패 : " + err);

//         } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라  
//             // 검색된 데이터가 있음 -> 로그인 성공
//             res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginS.html");
            
//         } else if (row.length == 0) { 
//             // 검색된 데이터가 없음 -> 로그인 실패
//             res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginF.html");
            
//         }
// })

        // LoginS.html -> ejs로 변환하시오
        // 1. LoginS.html을 ejs파일로 변경하여 views 이동
        // 2. Login라우터에서 LoginS.ejs 파일을 랜더링
        // 3. 랜더링할 때 로그인에 성공한 id값을 전송
        // 4. ejs파일에서 로그인에 성공한 id값을 출력
        
        let sql = "SELECT * from member where id = ? and pw = ?";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, [id, pw], (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);

        } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라
            
            // 로그인에 성공하면 session에 id값을 저장해라 
            req.session.user = id;

            console.log("session영역에 id저장 성공" + req.session.user);
            
            // 검색된 데이터가 있음 -> 로그인 성공
            res.render("LoginS", {
                id_name : row
            })
        } else if (row.length == 0) { 
            // 검색된 데이터가 없음 -> 로그인 실패
            res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginF.html");
            
        }
})
        

});

// ex06 Join

DBrouter.post("/JoinDB", (req, res) => {

    let id = req.body.id;
    let pw = req.body.pw;
    let nick = req.body.nick;

    let sql = "insert into member values(?, ?, ?)";
    // 사용자가 입력한 값 넣으려면 ?를 넣어준다. 
    // 물음표 순서대로 변수를 아래 대괄호에 작성해준다.
    conn.query(sql, [id, pw, nick], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("입력성공 : " + row);
            res.redirect("http://127.0.0.1:3000/Main"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("입력실패 : " + err);
        }

    })


});


// ex06 회원삭제라우터만들기
// 1. get방식의 /Delete라우터 생성
// 2. 사용자가 입력한 id값 가져오기
// 3. id값을 통해 member테이블에 있는 id값 삭제하기
// 4. 삭제 성공 후 Main.html로 돌아가기 
DBrouter.get("/Delete", (req, res) => {
    
    let id = req.query.id;

    let sql = "DELETE FROM member where id = ?";

    // conn.query(sql, [id], (err, row) => {
    //     if (row.affectedRows > 0){     // 삭제한 값이 1이상 일 때 (올바른 id값을 넣어서 삭제가 된 경우)
    //         console.log("명령에 성공한 횟수 : " + row.affectedRows);   // affectedRows : 명령에 성공한 횟수를 나타냄
    //         res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex06Main.html");
    //     } else if (row.affectedRows == 0) { // 올바른 id값을 넣지 않아서 삭제가 되지 않은 경우
    //         console.log("삭제된 값이 없습니다.")
    //     } else {            // 그냥 안된 경우
    //         console.log("삭제실패 : " + err);
    //     }

    // 위 내용대로 안한 이유 
    // -> 처음에 err가 생기면 row 자체가 만들어지지 않는다. 그래서 if문 자체가 실행이 안된다
    // -> 그래서 먼저 err가 생겼을 때의 처리를 해줘야한다 

        conn.query(sql, [id], (err, row) => {
            if (err){    
                console.log("삭제실패 : " + err); 
                
            } else if (row.affectedRows > 0) {
                console.log("명령에 성공한 횟수 : " + row.affectedRows); 
                res.redirect("http://127.0.0.1:3000/Main");
                
            } else if  (row.affectedRows == 0) {           
                console.log("삭제된 값이 없습니다.")
            }
    })

});


// ex06 회원수정라우터 만들기
DBrouter.post("/Update", (req, res) => {
    
    // 사용자가 입력한 id의 pw를 변경하고
    // 성공 후  Main.html 페이지로 이동하시오. 

    let id = req.body.id;
    // let pw = req.body.pw;
    let select = req.body.select; // pw or nick 값이 넘어옴 // pw인지 nick인지 확인해주는 것
    let data = req.body.data; // 변경될 데이터 값이 넘어옴

    // let sql = "UPDATE member set pw=? where id = ?;";
    // UPDATE set 어떻게 바꿀건지 where 어떤 데이터를 바꿀건지 (UPDATE 일 때 set, where은 같이감) 
    // column 명은 ? 처리 할 수 없음 (이미 정해져있는 값이라서)

    let sql = ""

        if (select == "pw") {
            sql="UPDATE member set pw=? where id = ?"  // sql 은 중괄호 안에서만 쓸 수 있는 지역변수이다. 
            // 그래서 밖에 비어있는 sql문에 문자열을 대입해줌 
        } else if (select == "nick" ) {
            sql="UPDATE member set nick=? where id = ?"
        }

    //     conn.query(sql, [pw, id], (err, row) => {
    //         if (err){    
    //             console.log("수정실패 : " + err); 
                
    //         } else if (row.affectedRows > 0) {
    //             console.log("명령에 성공한 횟수 : " + row.affectedRows); 
    //             res.redirect("http://127.0.0.1:5500/mynodejs_/public/ex06Main.html");
                
    //         } else if  (row.affectedRows == 0) {           
    //             console.log("수정된 값이 없습니다.")
    //         }
    // })

        conn.query(sql, [data, id], (err, row) => {
            if (err){    
                console.log("수정실패 : " + err); 
                
            } else if (row.affectedRows > 0) {
                console.log("명령에 성공한 횟수 : " + row.affectedRows); 
                res.redirect("http://127.0.0.1:3000/Main");
                
            } else if  (row.affectedRows == 0) {           
                console.log("수정된 값이 없습니다.")
            }
    })

    // let sql = `unpdate member ser ${select} = ? where id = ?}`;
    // 이 방식 대로 하면 굳이 if문을 쓰지 않아도 사용자가 설정한 값으로 해서 변경돼서 진행할 수 있음 


});


// selectAll 전체회원검색
// post는 html에 post로 지정해줘야 가능함 
// 그래서 지정 안할 때는 get방식으로 진행한다. 

DBrouter.get("/SelectAll", (req, res) => {

    let sql = "SELECT * from member";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        

        if(err) {
            console.log("검색실패 : " + err);
        } else if (row.length > 0) {
            console.log("검색된 데이터의 수 : " + row.length);

            res.render("SelectAll", {
                row_names : row
            })
            
            // view 엔진 없이는 이대로 출력할 수 없음 그래서 일단 불편하게 html 만들어서 출력해보기
            // res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
            // res.write("<html>");
            // res.write("<body>");
            // res.write("<table border='1'>"); // table은 무조건 tr(table row) td(table data) 가 같이 있어야함
            // res.write("<tr>");
            // res.write("<th>ID</th>"); // td : table head
            // res.write("<th>PW</th>");
            // res.write("<th>NICK</th>");
            // res.write("</tr>");


            // for (let i=0;i<row.length;i++) {
            //     res.write("<tr>");
            //     res.write("<td>" + row[i].id + "</td>");
            //     res.write("<td>" +row[i].pw + "</td>");
            //     res.write("<td>" +row[i].nick + "</td>");
            //     // (추가) 삭제버튼을 눌렀을 때 삭제할 수 있는 router로 이동하게 하기 
            //     // -> 수동으로 queryString 값 보내기
            //     // -> ?name=value 이런식으로 써야함(value가 변수)
            //     // queryString 방식으로 변수를 보내면 내가 따로 일일이 링크를 지정하지 않아도 할 수 있다. 
            //     res.write("<td><a href='http://127.0.0.1:3000/SelectDelete?id="+row[i].id+"'>삭제</a></td>");
            //     res.write("</tr>");

            // }

            // res.write("</table>");
            // res.write("</body>");
            // res.write("</html>");
            // res.end(); 

        } else if (row.length == 0) {
            console.log("검색된 데이터가 없습니다.");
        }
        
    })



});

// ex06 selectOne 회원검색라우터 만들기
// 1. get 방식의 /SelectOne라우터 생성
// 2. 사용자가 입력한 id의 정보만 검색해서 브라우저 출력하시오. 

DBrouter.get("/SelectOne", (req, res) => {
    let id = req.query.id; // 사용자의 정보를 받기 때문에 꼭 선언해줘야함
    let sql = "SELECT * from member where id = ?";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, [id], (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);

        } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라 
            console.log("검색된 데이터의 수 : " + row.length);
            console.log(row);
            // (추가) EJS로 만들기
            res.render("SelectOne", {
                row_name : row,  // row변수를 보냄 

            })
            
        //     // view 엔진 없이는 이대로 출력할 수 없음 그래서 일단 불편하게 html 만들어서 출력해보기
        //     res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
        //     res.write("<html>");
        //     res.write("<body>");
        //     res.write("<table border='1'>"); // table은 무조건 tr(table row) td(table data) 가 같이 있어야함
        //     res.write("<tr>");
        //     res.write("<th>ID</th>"); // td : table head
        //     res.write("<th>PW</th>");
        //     res.write("<th>NICK</th>");
        //     res.write("</tr>");


        //     for (let i=0;i<row.length;i++) {
        //         res.write("<tr>");
        //         res.write("<td>" + row[i].id + "</td>");
        //         res.write("<td>" +row[i].pw + "</td>");
        //         res.write("<td>" +row[i].nick + "</td>");
        //         res.write("</tr>");

        //     }

        //     res.write("</table>");
        //     res.write("</body>");
        //     res.write("</html>");
        //     res.end(); 

        // } else if (row.length == 0) {
        //     console.log("검색된 데이터가 없습니다.");
        //     res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
        //     res.write("<html>");
        //     res.write("<body>");
        //     res.write("<h1>검색 실패</h1>");
        //     res.write("</body>");
        //     res.write("</html>");
        //     res.end()
         }
        
    })
})


// SelectDelete 회원 전체검색에서 삭제버튼 만들어서 삭제하기 
DBrouter.get("/SelectDelete", (req, res) => {
    
    let id = req.query.id;

    let sql = "DELETE FROM member where id = ?";

        conn.query(sql, [id], (err, row) => {
            if (err){    
                console.log("삭제실패 : " + err); 
                
            } else if (row.affectedRows > 0) {
                console.log("명령에 성공한 횟수 : " + row.affectedRows); 
                res.redirect("http://127.0.0.1:3000/SelectAll");
                // 위 링크를 추가하면 바로 삭제된 것처럼 보임 
                
            } else if  (row.affectedRows == 0) {           
                console.log("삭제된 값이 없습니다.")
            }
    })

});

// Main
DBrouter.get("/Main", (req, res) => {
    res.render("Main", {
        id : req.session.user
    })
});

// Logout
// 삭제를 시키면 id에 null 값이 됨
DBrouter.get("/Logout", (req, res) => {

    delete req.session.user;

    res.render("Main", {
        id : req.session.user
        // session이 지워졌으니 null이다. -> main.ejs에서 로그인 유무가 확인됨  
    })
});

module.exports = DBrouter;