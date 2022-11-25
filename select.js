const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

let sql = `
SELECT killer.id,killer.name,killer.use,killer.kill,age.age FROM killer INNER JOIN age ON killer.age_id = age.id;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.name + ' 使用率:' + data.use + ' 殺傷率:' + data.kill +' 追加年:' + data.age );
		}
	});
});
