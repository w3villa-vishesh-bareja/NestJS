import { Injectable  , OnModuleInit , OnModuleDestroy} from '@nestjs/common';
import * as mysql from 'mysql2/promise';

export class DatabaseService {
    private pool : mysql.Pool;

    async onModuleInit(){
        this.pool = mysql.createPool({
            host: 'localhost',
            user:'root',
            password : 'password',
            connectionLimit:10,
            queueLimit:0,
            waitForConnections : true,

        });

        await this.switchToNestDatabase();
    }
    private async switchToNestDatabase(){
        const connection = await this.pool.getConnection();
        try {
          // Ensure you're switching to the correct database
          await connection.query('USE nest');
          console.log('Switched to "nest" database');
        } catch (error) {
          if (error.code === 'ER_BAD_DB_ERROR') {
            console.log('Database "management" does not exist, creating it...');
            await connection.query('CREATE DATABASE nest');
            console.log('Database "nest" created');
            await connection.query('USE nest');
            console.log('Switched to "nest" database');
          } else {
            console.error('Error connecting to database:', error);
            throw error;
          }
        } finally {
          connection.release();
        }
    }
    getPool(){
        return this.pool;
    }
}
