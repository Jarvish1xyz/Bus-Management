require('dotenv').config();
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const url = process.env.MONGOURL;
const Bus = require('./routes/bus.route');
const Driver = require('./routes/driver.route');
const universityRouter = require('./routes/university.route');
const adminRouter = require('./routes/admin.route');
const studentRouter = require('./routes/student.route');
const busRouter = require('./routes/bus.route');
const driverRouter = require('./routes/driver.route');
const placeRouter = require('./routes/place.route');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

mongoose.connect(url).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});


app.use('/auth', authRouter);
app.use('/api/bus', busRouter);
app.use('/api/driver', driverRouter);
// console.log("Request is in index")
app.use('/api/university', universityRouter);
app.use('/api/admin', adminRouter);
app.use('/api/student', studentRouter);
app.use('/api/place', placeRouter);
app.use('/api', adminRouter);

app.listen(5001, '0.0.0.0', () => {
    console.log("Server started @ 5001")
})