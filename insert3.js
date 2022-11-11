const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

let sqls = [
  `insert into age ("age") values ("2016年");`,
  `insert into age ("age") values ("2017年");`,
  `insert into age ("age") values ("2018年");`,
  `insert into age ("age") values ("2019年");`,
  `insert into age ("age") values ("2020年");`,
  `insert into age ("age") values ("2021年");`,
  `insert into age ("age") values ("2022年");`,
  `insert into age ("age") values ("2023年");`,
  `insert into age ("age") values ("2024年");`,
  `insert into age ("age") values ("2025年");`,
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