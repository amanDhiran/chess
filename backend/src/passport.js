import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import prisma from './db/index.js';


const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ;
const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID =
  process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET ;

const BACKEND_URL = process.env.BACKEND_URL || "";

export function initPassport() {
  if (
    !GOOGLE_CLIENT_ID ||
    !GOOGLE_CLIENT_SECRET ||
    !GITHUB_CLIENT_ID ||
    !GITHUB_CLIENT_SECRET
  ) {
    throw new Error(
      'Missing environment variables for authentication providers',
    );
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        const user = await prisma.user.upsert({
          create: {
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: 'GOOGLE',
          },
          update: {
            name: profile.displayName,
          },
          where: {
            email: profile.emails[0].value,
          },
        });

      return done(null, user);
      },
    ),
  );

  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        const res = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        const data= await res.json();
        const primaryEmail = data.find((item) => item.primary === true);

        const user = await prisma.user.upsert({
          create: {
            email: primaryEmail?.email,
            name: profile.displayName,
            provider: 'GITHUB',
          },
          update: {
            name: profile.displayName,
          },
          where: {
            email: primaryEmail?.email,
          },
        });

        done(null, user);
      },
    ),
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}