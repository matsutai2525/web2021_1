const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbd.db');

let sql = `
SELECT id,killer.name,test.use,test.kill FROM killer INNER JOIN test ON killer.id = test.id;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.name + ' 使用率:' + data.use + ' 殺傷率:' + data.kill);
		}
	});
});
