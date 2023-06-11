import express from "express";
import cors from "cors";
//import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import mongoose from "mongoose";
import cfg from "./config/config.js";
import { postRouter } from "./routes/post.routes.js";
import { userRouter } from "./routes/user.routes.js";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoURL = `mongodb://${cfg.MONGO_USER}:${cfg.MONGO_PASSWORD}@${cfg.MONGO_IP}:${cfg.MONGO_PORT}/?authSource=admin`;

const redisClient = createClient({
  socket: {
    host: cfg.REDIS_URL,
    port: cfg.REDIS_PORT,
  },
});

redisClient.connect();
redisClient.on("connect", () => console.log("Redis connected successfully!"));
redisClient.on("error", (e) => console.log(e));

const app = express();

/**
 * * syntax: mongodb://username:password@ip-address:port
 * * username,password: from docker-compose mongo environment!
 * *port - default mongodb port: 27017
 *! @mongo: this is  the service from docker-compose file! (line 9)
 * */
const connectWithRetry = () =>
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log(`The Database connected successfully!`);
      appConnectWithRetry();
      console.log("App is working!");
    })
    .catch((e) => {
      console.error(e);
      setTimeout(connectWithRetry, 5000);
    });

const appConnectWithRetry = () =>
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.error(err);
      setTimeout(appConnectWithRetry, 5000);
    }
    console.log(`App is running on port ${process.env.PORT}`);
  });
connectWithRetry();
//! enable proxy: added after scaling with nginx
app.enable("trust proxy");
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    secret: cfg.SESSION_SECRET,

    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60,
    },
  })
);

app.use(cors(/*{ origin: "https://www.getpostman.com", credentials: true }*/));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1", (req, res) => {
  res.send("<h1>Hello world!</h1>");
  console.log("got console log!");
});
app.use("/api/v1/posts/", postRouter);
app.use("/api/v1/users/", userRouter);
app.use(express.static(path.resolve(__dirname, "public")));
