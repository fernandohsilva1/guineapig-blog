import { JsonPostRepository } from '@/repositories/post/json-post-repository'
import { drizzleDb } from '.'
import { postsTable } from './schemas'
;(async () => {
  const jsonRepository = new JsonPostRepository()
  const posts = await jsonRepository.findAll()

  try {
    await drizzleDb.delete(postsTable)

    await drizzleDb.insert(postsTable).values(posts)
  } catch (e) {
    console.log('Ocorreu um erro...', e)
  }
})()
