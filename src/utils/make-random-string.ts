export const makeRandomString = () => {
  return crypto.randomUUID().slice(0, 8)
}
