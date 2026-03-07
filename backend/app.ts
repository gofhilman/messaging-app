import "dotenv/config";
import "./config/passport";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import chatsRouter from "./routes/chatsRouter";
// import messagesRouter from "./routes/messagesRouter";
// import usersRouter from "./routes/usersRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/auth", authRouter);
app.use("/chats", chatsRouter);
// app.use("/messages", messagesRouter);
// app.use("/users", usersRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    error: {
      code: err.statusCode || 500,
      message: err.message ? [err.message] : ["Internal Server Error"],
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}`);
});
