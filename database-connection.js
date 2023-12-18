import { Sequelize } from "sequelize";

const sequelize = new Sequelize("firstre", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: "3307",
});
try {
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
