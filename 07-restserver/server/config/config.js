

/**
 * Puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/**
 * Vencimiento del Token
 */
// 60 seg, 60 min, 24 h, 30 dias
process.env.CADUCIDAD_TOKEN = '48h';//60 * 60 * 24 * 30;


 /**
 * SEED de autenticación
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


/**
 * BD
 */
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;



/**
 * Google Client ID
 */
process.env.CLIENT_ID = process.env.CLIENT_ID || '233558402590-uirduh6l3nctsthb013q9lgg6hpo9q4a.apps.googleusercontent.com';

