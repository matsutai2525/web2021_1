const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

let schema = `
create table killer(
  id integer primary key,
  name text,
  use integer,
  kill integer,
  age_id integer
);
`

db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});