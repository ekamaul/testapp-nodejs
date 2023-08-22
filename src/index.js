require('dotenv').config();
const express = require('express');
const PORT = process.env.SERVER_PORT || 3005;

//  tanda ' || ' itu = 'atau', jika port yang kita setting sudah dipakai oleh aplikasi lain
//  kita bisa pakai port cadangan yaitu 3005

const productRouter = require('./routes/product.route')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/home", (req, res) => {
res.send('Hello World yeahhh!');

});

app.use("/api/products", productRouter)

app.listen(PORT, () => {
    console.log('Server Running in :', PORT)
});