import { Sequelize } from 'sequelize';
import dotenv from "dotenv"

dotenv.config()

const dbUser = process.env.DB_USER as string 
const dbPassword = process.env.DB_PASSWORD 
const dbHost = process.env.DB_HOST  
const dbName = process.env.DB_NAME  

// Conectar ao MySQL sem especificar o banco de dados
const sequelize = new Sequelize(`mysql://${dbUser}:${dbPassword}@${dbHost}:3306`);

const dropDatabase = async () => {
  try {
    await sequelize.query(`DROP DATABASE \`${dbName}\`;`);
    console.log(`Database ${dbName} droped`);
  } catch (error) {
    console.error('Error drop database:', error);
  } finally {
    await sequelize.close();
  }
};

dropDatabase();