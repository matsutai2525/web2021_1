const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

let sqls = [
  `insert into killer ("name") values ("トラッパー");`,
  `insert into killer ("name") values ("レイス");`,
  `insert into killer ("name") values ("ヒルビリー");`,
  `insert into killer ("name") values ("ナース");`,
  `insert into killer ("name") values ("ハグ");`,
  `insert into killer ("name") values ("ドクター");`,
  `insert into killer ("name") values ("ハントレス");`,
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