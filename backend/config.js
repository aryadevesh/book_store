const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

export const PORT = 5000;

export const mongoURL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.mo1uo.mongodb.net/dbTest`;