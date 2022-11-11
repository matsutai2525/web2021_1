const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

let sqls = [
  `insert into killer ("name","use","kill","join_id") values ("トラッパー","4.24","56.50","1");`,
  `insert into killer ("name","use","kill","join_id") values ("レイス","5.48","58.36","1");`,
  `insert into killer ("name","use","kill","join_id") values ("ヒルビリー","2.18","54.44","1");`,
  `insert into killer ("name","use","kill","join_id") values ("ナース","5.36","52.84","1");`,
  `insert into killer ("name","use","kill","join_id") values ("ハグ","1.30","59.62","1");`,
  `insert into killer ("name","use","kill","join_id") values ("ドクター","3.97","55.12","2");`,
  `insert into killer ("name","use","kill","join_id") values ("ハントレス","6.64","57.29","2");`,
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