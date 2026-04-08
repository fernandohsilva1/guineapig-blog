import { drizzle } from 'drizzle-orm/better-sqlite3'
import { postsTable } from './schemas'
import Database from 'better-sqlite3'
import { dirname, resolve } from 'path'
import { mkdirSync } from 'fs'

const sqliteDatabasePath =
  process.env.SQLITE_PATH || resolve(process.cwd(), 'db.sqlite3')
mkdirSync(dirname(sqliteDatabasePath), { recursive: true })

const sqliteDatabase = new Database(sqliteDatabasePath)

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
  },
  logger: true,
})
