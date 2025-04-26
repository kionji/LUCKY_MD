const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUlxRUU5Z2RSNlFWWTgvM0h6aGdSVTYwdzFRWXl1cnFtY0JRRGJubW4xVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXRIbFB5VEZNVGlqcXgyMVZkNG45QkZQcWlWR0dVb1ByVXpLZ0JQN2lrQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTFJMR012ZHBZY2FVZG5GM1VsK3hBTE9rR2pyRGNraXhmbTNvSVdpbkgwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJia09oaklWUmtjRGVGc01vMjBuNFVGR3Izd2c2d0hEOUhXUUZjd3dZOGhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNENnlxUi9SeDVDQ0N0ZE4wRDVpeGNrTjNXWHA4aDFpUGYzckFaVnhaM1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBYbUNTMEZUM1RkNjBFOUVqVTlFVGVjV0J2UjE0OGFBK3kwLzRqcTErQkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0x3dy9sYTdMQWNSSFRrM0tobDlQN2FkZWlqSHBrbk14WVViWFlNVnNYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHNBSS8xSVpudHlqSFB3dFRlVTliNk16U0IzZ3ZIS3g3S0luM1BjU2FoYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVVQkFYREVRN1pWMnd1YmVIMnBzRmlhejdiK0Joc0dZYjdvcFJaSHFFOS8xUmE2UFN1ZnoyOWs5bzhmOVBPWGRzTGZ3SDNIcmJaOC9iQkVMQ0N0cEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6IlkraFVsUllNaS84QXZIKytOZjZWd2pMZzFPbFd6cjV0MWg0LzV5WXJCVXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzc4NjIwOTYxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjI0RDYzRTIzMDhFODYxOTZEQzkwQTk1NDYxRTMwQzI4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDQ3NTQ1NTN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc3ODYyMDk2MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1MDRBQjFDRjFCMTM4QjI1QzU5Nzg1NzNFMDMyNUE0NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0NzU0NTU0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWaFBJVDRWNVQwbW4yOE55dGNYRkp3IiwicGhvbmVJZCI6IjY3OTAyZjI0LTJhYzEtNGFmNS1iZTc1LWIzMDMwOGY1MDMxNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIR2J6WmFUTTEwZU5ybG9lQVl4cGZUdDMxMXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXJ3a3h0Q1lIMGZlVndkYmJZemdOU3Nseko0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhQWDVNMlhLIiwibWUiOnsiaWQiOiIyNTQ3Nzg2MjA5NjE6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLimIXhjq/imLzvuI7ihJLimLzvuI7ihJLinKnihLDinKvihJXimasifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ056WXpzZ0VFT3F1Kzc4R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldHQTlYUEJxSGVzY2l3NDNHTnEyOXU4U2VYM1hDUTdqYWlwVkk2Tm9HWHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IllCZEpKWWl0ZnlzTzF4Slcybyt1RWJweW84UWNueUdKWWpKYWJCWkVzaExzRXdGL21aek9uWGxvZkpIY2xHaGtXNzlzTG5qZ3ozSjdDSGJ6bDBPd0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwVWZQMnN2YzR5UEhjMyswQ0tTOTdBa2grWDVrNHIyRitmSmlJRmI1Y1JjQnZEemd6b0hhYzRuSHczM1djNHlIUjJnYmo4VjM5M1dYSXlHUndPZTdCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc3ODYyMDk2MToyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZoZ1BWendhaDNySElzT054amF0dmJ2RW5sOTF3a080Mm9xVlNPamFCbDcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDQ3NTQ1NTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTkxYIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254778620961",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://i.ibb.co/cXrVMRgL/file-1131.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

