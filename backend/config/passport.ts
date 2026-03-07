import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { prisma } from "../lib/prisma";
import { Strategy as AnonymousStrategy } from "passport-anonymous";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:
    process.env.JWT_SECRET ??
    (() => {
      throw new Error("JWT_SECRET missing");
    })(),
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.sub },
        select: {
          id: true,
          username: true,
          name: true,
          picture: true,
          online: true,
        },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(new AnonymousStrategy());
