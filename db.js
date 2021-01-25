const Sequelize = require('sequelize');

const sequelize = new Sequelize('workout-log-server', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate().then(
    function () {
        console.log("Connected to the workout-log database!");
    },
    function (err) {
        console.log(err);
    }
);

    module.exports = sequelize;