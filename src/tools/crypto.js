import bcrypt from 'bcryptjs'

export let encrypt = (text) => {
  return bcrypt.hashSync(text.toLowerCase(), 10)
}

export let validate = (text, hash) => {
  return bcrypt.compareSync(text.toLowerCase(), hash)
}
