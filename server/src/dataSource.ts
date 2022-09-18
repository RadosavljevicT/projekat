import { DataSource } from "typeorm";
import { AnimalType } from "./entity/AnimalType";
import { User } from "./entity/User";

export const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  entities: [User, AnimalType],
  migrations: ["src/migration/**/*.ts"],
  database: "animals",
})