require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sequelize =
  //new Sequelize(`postgres://videogames_database_user:jvfutK2l1r5DOO7hitZel9e8yGeTEIiy@dpg-cg09fi64dad93e10u9f0-a.oregon-postgres.render.com:5432/videogames_database`, {
  new Sequelize({
    database: 'videogames_database', 
    user: 'videogames_database_user', 
    password: 'jvfutK2l1r5DOO7hitZel9e8yGeTEIiy',   
    host: 'dpg-cg09fi64dad93e10u9f0-a.oregon-postgres.render.com',
    port: '5432',  
    dialect: 'postgres', // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre, Platform } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, {through: "videogameGenre", timestamps: false});
Genre.belongsToMany(Videogame, {through: "videogameGenre", timestamps: false});
Videogame.belongsToMany(Platform, {through: "videogamePlatform", timestamps: false});
Platform.belongsToMany(Videogame, {through: "videogamePlatform", timestamps: false});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
