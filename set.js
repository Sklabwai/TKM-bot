const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU080bWRvL2Zrc25ZMTJVQi9oRE1rQVR3ZituQ3UreU53VUp3b09Kc0VtWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHNMeHBRMVM5YWh5c3Ftd0RsMStmeHZqb1dIZldkWVROQVhOYjhINVJYbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXR09xbWVtUkxPbmhVak40L3FUQmpPMmt0RkVQa2Y4bnErcitMc0dOTlVVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyV1NCS1hwdWdsWjNtbnJBWmk4VFE4WVRoQU9qdlFpa3JLZWVSUVg3MmlzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktDVDFFaitSeXlLTmNydmtXQzdjY242N0gzdmtyM3lMM0FtVEs1ZTlyRzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndOYXY0OGNtR3NNMHl5MDRtQlJVNkFuVzFDaW9INC9sOWhmL1hQbi9nQVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUZoZXhNbzF2VmtWRHJnWEltcHd2bWRoVXVKMDQ5MXMwMzJOVytaUlFXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2V0bnRmWUM1SGJLRzc0bHdUeldIZTE5S1FUZG8xTGI0ZnZhVzQ3T0JBbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlDdm9McjZqVG0rMUI0Y3BZS2RocllrVkJVZzNpa3RkSnNmaGNUWFFHVnU0Nkd5YWJBMS9EdVlUTmtlSmpIY2t5dmlNRXpHRFdESFFMV0ZGelFVaWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJxM2pDcnphUndCbG1xZWYvek5Wdk1PNUszRzRTUlQ0bDhHZ2puVGpxc3AwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJaZHNnd3pGTFRSaVdrUUtuX0N0ZHl3IiwicGhvbmVJZCI6ImY4Zjg0Yjk0LWRhYzgtNGNhMS04Nzk5LTc1NzY0MmY4ZjcwOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXYjYrcTlsM25tSlZta0dHOUJnblhHeDNHNHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVFJdGljMEg4RUVuaXptcUxjdzBJN3FRSXYwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhGMVI4N0c0IiwibWUiOnsiaWQiOiIyNTY3MDg1NTg1MDk6NTFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pEWXpMc0dFSVRKMWJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjZJNUtlcFRWSDVKMkVsNmNzS0NiNmx1ZE54S25BQy9oUGlNcWZUNE9ZV1U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjErOTgwOGo2RjRHUHBUT05VNmVqdEgwNHp1eitaNEEvUTB0anJlYSt0Y0pVb0U3TldEWkFyazl3Z0FZSXNFV3NSUStPUTAxdStOT3lRRE9XVHc0ckJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIRDB3MjNBemlUby9KV1BVemtId09kL2ZDU09YSWJwTm5UQk1GVlF4R0lDMjJ5UHVFVW56b215eXRHNlplMHlYQUhnUVpTcjJFc2NpTFp6ZG9nN0ZnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NjcwODU1ODUwOTo1MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlaU9TbnFVMVIrU2RoSmVuTENnbStwYm5UY1Nwd0F2NFQ0aktuMCtEbUZsIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMDY2NjQxfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
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
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
