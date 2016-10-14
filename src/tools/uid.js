import uuid from 'uuid'

export let uid = () => {
  return uuid.v1()
}
