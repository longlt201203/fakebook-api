import { Env } from "../utils/env";
import { DataSource } from "typeorm";

export const datasource = new DataSource({
    type: "mysql",
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    database: Env.DB_NAME,
    username: Env.DB_USER,
    password: Env.DB_PASS,
    entities: [__dirname + "/entities/**/*.entity{.js,.ts}"],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
});

// console.log(datasource.options);