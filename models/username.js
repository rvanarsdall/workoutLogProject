module.exports = (sequelize, DataTypes) => {
    const Username = sequelize.define('username', {
        username: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Username;
}