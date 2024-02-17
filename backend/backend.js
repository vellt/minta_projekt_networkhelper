const express= require('express');
const mysql= require('mysql');
const app = express();

const host='localhost';
const port =3000;

app.use(express.json());

let connection = mysql.createConnection({
    host: host, 
    user: 'root',
    password: '',
    database: 'app'
});

// lekérdezi az összes felhasználót
// DÁTUM FORMÁZÁS KIÍRATÁSKOR!!
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM user', (err, results)=> {
        if(err) {
            console.log(err);
            res.send("hiba");
        }
        else {
            console.log(results);
            res.send(results);
        }
    });
});

// elkészít egy új felhasználót
app.post('/users', (req, res) => {
    const {firstname, lastname, birthday} = req.body;
    console.log(firstname, lastname, birthday);

    connection.query('INSERT INTO user (firstname, lastname, birthday) VALUES ( ?, ?, ?)', [firstname, lastname, birthday], (err, results)=> {
        if(err) {
            console.log(err);
            res.send("hiba");
        }
        else {
            console.log(results);
            res.send("Sikeres felvétel!");
        }
    });
});

// módosít egy felhasználót
app.put('/users', (req, res) => {
    const {id, firstname, lastname, birthday} = req.body;
    console.log(id, firstname, lastname, birthday);

    connection.query('UPDATE user SET firstname=?, lastname=?, birthday=? WHERE id=?',[firstname, lastname, birthday, id], (err, results)=> {
        if (err) {
            console.log(err);
            res.send("hiba");
        } else {
            console.log(results);
            res.send("Sikeres Modosítás!");
        }
    });
});

// tötöl egy felhasználót
app.delete('/users', (req, res) => {
    const id = req.body.id;
    console.log(id);

    connection.query('DELETE FROM user WHERE id=?',[id], function (err, results) {
        if (err) {
            console.log(err);
            res.send("hiba");
        } else {
            console.log(results);
            res.send("Sikeres Törlés!");
        }
    });
});

app.listen(port, host,() => {
  console.log(`IP: http://${host}:${port}`);
});