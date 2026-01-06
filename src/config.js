const isProd = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';
const COOKIE_SAMESITE = process.env.COOKIE_SAMESITE || 'lax';
const COOKIE_SECURE = (process.env.COOKIE_SECURE || '').toLowerCase() === 'true' || isProd;

const sessionCookieOptions = {
    httpOnly: true,
    sameSite: COOKIE_SAMESITE,
    secure: COOKIE_SECURE,
};

const authCookieOptions = {
    httpOnly: true,
    sameSite: COOKIE_SAMESITE,
    secure: COOKIE_SECURE,
    maxAge: 1000 * 60 * 60, // 1 hour
};

const themeCookieOptions = {
    sameSite: COOKIE_SAMESITE,
    secure: COOKIE_SECURE,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};

module.exports = {
    PORT,
    SESSION_SECRET,
    JWT_SECRET,
    COOKIE_SECURE,
    COOKIE_SAMESITE,
    sessionCookieOptions,
    authCookieOptions,
    themeCookieOptions,
};
