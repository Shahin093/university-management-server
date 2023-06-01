import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
const port = 5000;
async function database() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(" Database is Connected Successfully");
    app.listen(config.port, () => {
      console.log(`App Listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect database.`, error);
  }
}
database();
