import passport from "passport"; //Libreria de autenticación
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; //Trabaja con JWT
import { UserModel } from "../models/user.model.js"; //Modelo de usuarios de BD

const JWT_SECRET = "jenyferclave"; //Clave de tokens

export const initPassport = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  };

  passport.use(
    "jwt",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UserModel.findById(jwt_payload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
