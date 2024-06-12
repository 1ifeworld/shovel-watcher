import { pgTable, text, numeric, timestamp } from 'drizzle-orm/pg-core'


export const usersTable = pgTable('users', {
  id: numeric('id').primaryKey(),
  to: text('to'),
  recovery: text('recovery'),
  timestamp: timestamp('timestamp'),
  log_addr: text('log_addr'),
  block_num: numeric('block_num'),
});

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const sessionsTable = pgTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('userId').notNull().references(() => usersTable.id),
    session: text('session'),
    created: timestamp('created'),
    expiresAt: timestamp('expiresAt').notNull(),
    deviceId: text('deviceId').notNull(),
  })
  
export type InsertSession = typeof sessionsTable.$inferInsert
export type SelectSession = typeof sessionsTable.$inferSelect

export const hashesTable = pgTable('hashes', {
    userId: text('userId').notNull().references(() => usersTable.id),
    custodyAddress: text('custodyAddress').notNull(),
    deviceId: text('deviceId').notNull(),
    encryptedpublickey: text('encryptedpublickey').notNull(),
    encryptedprivatekey: text('encryptedprivatekey').notNull(),
  }, (table) => ({
    primaryKey: [table.userId, table.custodyAddress, table.deviceId],
  }))
  
  export type InsertHash = typeof hashesTable.$inferInsert
  export type SelectHash = typeof hashesTable.$inferSelect