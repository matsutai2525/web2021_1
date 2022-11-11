const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
 const message = "キラーの情報を検索しよう!!";
  res.render('showdbd', {mes:message});
});



app.get("/itiran", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    let sql = `
SELECT killer.id,killer.name,test.use,test.kill FROM killer INNER JOIN test ON killer.id = test.id;
`
    console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('showdbd', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('selectdbd', {data:data});
        })
    })
})



app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(80, () => console.log("Example app listening on port 80!"));
