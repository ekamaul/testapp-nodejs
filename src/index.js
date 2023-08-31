require('dotenv').config();
const express = require('express');
const PORT = process.env.SERVER_PORT || 3005;
const cors = require('cors');
const {sequelize} = require('./models');

//  tanda ' || ' itu = 'atau', jika port yang kita setting sudah dipakai oleh aplikasi lain
//  kita bisa pakai port cadangan yaitu 3005

const productRouter = require('./routes/product.route')
const userRouter = require('./routes/user.route')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

sequelize.authenticate().then(function (error){
    console.log('database connection has successfully connected')
}).catch(function(error){
    console.log('unable to connect to database' + error)

})

// kode buat ngecek di console browser nya
// fetch('http://localhost:3003/home').then(req => req.text()).then(console.log)

app.get("/home", (req, res) => {
res.send('Hello World yeahhh!');

});

app.use("/api/products", productRouter)
app.use("/api/user", userRouter)

app.listen(PORT, () => {
    console.log('Server Running in :', 'localhost:'+ PORT)
});