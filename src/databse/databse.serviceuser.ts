import { Injectable, OnModuleInit } from "@nestjs/common";
import { DatabaseService } from "./databse.service";

@Injectable()
export class DatabaseUserService implements OnModuleInit {
    constructor(private readonly databaseService: DatabaseService) {}

    async onModuleInit() {
        const pool = this.databaseService.getPool();
        // const pool = await connection.getConnection();

        try {
            await pool.query('USE nest')
            const [tables]: any = await pool.query("SHOW TABLES LIKE 'users'");
            
            if (tables.length === 0) {
                await pool.query(`
                    CREATE TABLE users (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `);
                console.log("Users table created successfully");
            } else {
                console.log("Users table already exists");
            }
        } catch (err) {
            console.error("Error checking/creating users table:", err);
        } finally {
            // pool.release();
        }
    }
} 