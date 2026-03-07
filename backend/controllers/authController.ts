import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

function meGet(req: any, res: any) {
  const { username, name, picture } = req.user;
  res.json({ me: { username, name, picture } });
}

async function signupPost(req: any, res: any) {
  const { username, password, name, picture } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const me = await prisma.user.create({
    data: {
      username,
      name,
      picture,
      password: hashedPassword,
    },
    select: {
      username: true,
      name: true,
      picture: true,
    },
  });
  res.json({ me });
}

async function loginPost(req: any, res: any) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return jwt.sign(
        { sub: user.id },
        process.env.JWT_SECRET ??
          (() => {
            throw new Error("JWT_SECRET missing");
          })(),
        { expiresIn: "1 week" },
        (err, token) => {
          res.json({ token });
        },
      );
    }
  }
  throw new AppError("Invalid username or password", 401);
}

export { meGet, signupPost, loginPost };
