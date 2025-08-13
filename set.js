const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'TIMNASA-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVBWa3BPbytjOHIrbGVXYytnRFNHa1ZDbHpSMjM0V1ZhVXVSL3JocmIzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVG5wNHRZbUpSUm1qM2dIbGpUdU44VWM4WWowNmhLYlp4RDB3blFxOHJobz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSHg3eDA4QWRpZ05nbWdBTEFYUDl4NHpJUUp3K1pnSnJUcHRMZ2dxajA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFeFdiU3psNm1EYzJFOThyN1NTS1lJdXNHMFVIbWxIRmtDcUJXNjRTZzNnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1KcURmVnpkTkRITmV5SmhUUUJTYmVnT3pUTGNJcFFqaWJQa0xld1B1R2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iiszd2lMeVNJRk8xWXVZVCs0aDgvbFRVaVIreVZRajZCMkljdFZUT1FCVWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0FDYzRTMFQrVUtleHB0endNWmQ1WVFsVjhkNWxPRHZORlZsZ1lHZ2UyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHd0Ui9weGNtSEJYOUhNcjcvM1puVEg2OE5BUnByRExtUnNhb2UxV2hXQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdvWjNFbzIyRThMcTluMFJ6VEhuajIrTDRtZXYzaEhjVHhyR3pmcE5KbVN4TEdML29TekxRQXZMYXVlODdnQm4yaS9IeWtTejRjNFhLU0RXejV5WWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjExLCJhZHZTZWNyZXRLZXkiOiJwYXBzaVBBMjRzaUdoL1g3WjR4a0cyZUl6aVVZQ1I5aXBXRW0xMEJGVFo4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcwODQzMDM2MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RkNCOTdDMTI0NkIzQzBEM0U1MEQyQkU4QjQ4NjBEQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU1MDY4Nzg2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MDg0MzAzNjJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTJEMTgxMTRFRUI5RDBFNkJBNjcyMzRDNkM5N0U3RTUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTA2ODgwOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNUZCUTlHUkIiLCJtZSI6eyJpZCI6IjI1NDcwODQzMDM2Mjo3NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJUaGUgS2luZydzIFNvbiIsImxpZCI6IjE0MDAyMTgwNjIwNDAxOjc2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSXVFMDhJQ0VOUHk4TVFHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoib0xzZkd5Tmo5RWNPSVhYa3ZnU1NPRWZRM2tMdTV3T0NWeEZJUTFDdzVrMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoic3gvTHE3NUxTNWtCVjB2ZGpRd2ZtRWM4bENqUEY5dzhsM1lodC9SMGJGUEViM3RGL1ZxZ3ZVM2ViU0krYkowejErY2dSZGx2eFFmOEU1SUNPcjZ0RGc9PSIsImRldmljZVNpZ25hdHVyZSI6IisvVUdpczlSZ21nUElGeEhIdkJxY1ZqaG93ZGpkT1pPQXJNYWNyQXd1WjRYTUNpZHVyZXZpVlB2RkVPZGdsQUZ4eGJHakpZdGZpdFpxYzRvaEtUZmlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzA4NDMwMzYyOjc2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFDN0h4c2pZL1JIRGlGMTVMNEVramhIME41Qzd1Y0RnbGNSU0VOUXNPWk4ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NTA2ODc3MCwibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKN0kifQ==',
    PREFIXE: process.env.PREFIX || ",",
    GITHUB : process.env.GITHUB|| 'https://files.catbox.moe/xtkghn.jpg',
    OWNER_NAME : process.env.OWNER_NAME || "Ravin ke tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254708430362", 
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
   AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    URL: process.env.URL || "https://files.catbox.moe/xtkghn.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "yes",
    AUDIO_REPLY: process.env.AUDIO_REPLY || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by timnasa tmd',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_MESSAGE || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
    CAPTION : process.env.CAPTION || "TIMNASA-TMD",
    BOT : process.env.BOT_NAME || 'TIMNASA-TMD⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'yes',              
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
