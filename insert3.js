const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

let sqls = [
  `insert into test ("use","kill") values ("4.24","56.50");`,
  `insert into test ("use","kill") values ("5.48","58.36");`,
  `insert into test ("use","kill") values ("2.18","54.44");`,
  `insert into test ("use","kill") values ("5.36","52.84");`,
  `insert into test ("use","kill") values ("1.30","59.62");`,
  `insert into test ("use","kill") values ("3.97","55.12");`,
  `insert into test ("use","kill") values ("6.64","57.29");`,
]

for(let sql of sqls){
db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを追加しました" );
	});
});
}