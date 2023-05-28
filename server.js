const express = require('express');
const app = express();
const data = require('./modules/collegeData');
const cors = require('cors');
const utils = require('./modules/utils');

// const allowedDomains = [
//     'http://localhost:4200',
// ];
// let corsDomain;

// Implicit Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use('/favicon.ico', express.static('./favicon.ico'));

// Setup cors header
// app.use((req, res, next) => {
//     let domain = utils.getFullUrl(req);
//     corsDomain = allowedDomains.includes(domain) ? domain : null;
//     console.log(
//         "CorsDomain: " + corsDomain + ", " + "Domain: " + domain
//     );
//     console.log(req.subdomains)
//     next();
// });
app.use(cors({
    origin: '*'
}));

const HTTP_PORT = process.env.PORT || 8080;

// Default endpoint
app.get("/", (req, res) => {
    res.send("Your API is running fine");
});

const studentRoutes = require('./routing/studentRoutes');
const courseRoutes = require('./routing/courseRoutes');
const userEndpoints = require('./routing/userEndpoints');

/* Application Endpoints */

/* Student Endpoints */
app.use('/students', studentRoutes);

/* Course Endpoints */
app.use('/courses', courseRoutes);

/* User Endpoints */
app.use('/users', userEndpoints);

data.initialize()
.then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("App listening on port: " + HTTP_PORT);
    });
})
.catch((error) => {
    res.send(error);
});
