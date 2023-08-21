require('dotenv').config();
const express = require('express');
const PORT = process.env.SERVER_PORT || 3005;

//  tanda ' || ' itu = 'atau', jika port yang kita setting sudah dipakai oleh aplikasi lain
//  kita bisa pakai port cadangan yaitu 3005

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
res.send('Hello World yeahhh!');

});

app.listen(PORT, () => {
    console.log('Server Running in :', PORT)
});