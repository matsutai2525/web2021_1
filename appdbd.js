const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.set('view engine', 'ejs');
app.use("/views", express.static(__dirname + "/views"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
 const message = "キラーの情報を検索しよう!!";
  res.render('showdbd', {mes:message});
});

app.get("/insert", (req, res) => {
    console.log(req.query);    // ①
    let sql = "insert into killer (name,use,kill,age_id) values (" + `"`+ req.query.name + `"`+ "," + req.query.use + "," + req.query.kill + "," + req.query.aid + ");";
      
    console.log(sql);
    db.serialize( () => {
        db.all(sql, (error, data) => {
          console.log(error);
            if( error ) {
                res.render('error', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('mess1', {data:data});
        })
    })
})

app.get("/top", (req, res) => {
  console.log(req.query)
    db.serialize( () => {
        db.all("SELECT killer.name,killer.use,killer.kill,age.age FROM killer INNER JOIN age ON killer.age_id = age.id;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('selectdbd', {data:data});
        })
    })
})

app.get("/tasu", (req, res) => {
    db.serialize( () => {
        db.all("select id, age from age ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"エラー"});
            }
          //console.log(data);
            res.render('insertdbd', {data:data});
        })
    })
})

app.get("/kesu", (req, res) => {
    db.serialize( () => {
        db.all("select id,name,use,kill from killer ;", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          console.log({data});
            res.render('delete', {data:data});
        })
    })
})

app.get("/delete", (req, res) => {
  console.log(req.query);
  let sql = "DELETE FROM killer WHERE id ="+ req.query.kill +";";
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, data) => {
      console.log(error);
      if(error) {
        res.render('error', {mes:"最初からやり直してください"});
      }
    res.render('mess2', {mes:"削除しました"});
  });
});
//console.log(req.body);
});


app.get("/itiran", (req, res) => {
  console.log(req.query)
    db.serialize( () => {
        db.all("SELECT killer.name,killer.use,killer.kill,age.age FROM killer INNER JOIN age ON killer.age_id = age.id ORDER BY " + req.query.item +" "+ req.query.desc +";", (error, data) => {
            if( error ) {
                res.render('error', {mes:"最初からやり直してください"});
            }
          //console.log(data);
            res.render('selectdbd', {data:data});
        })
    })
})


app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(80, () => console.log("Example app listening on port 80!"));
