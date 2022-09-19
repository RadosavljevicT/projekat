import { DataSource } from "typeorm";
import { AnimalType } from "./entity/AnimalType";
import { Comment } from "./entity/Comment";
import { Message } from "./entity/Message";
import { Post } from "./entity/Post";
import { User } from "./entity/User";

export const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  entities: [User, AnimalType, Post, Comment, Message],
  migrations: ["src/migration/**/*.ts"],
  database: "animals",
})