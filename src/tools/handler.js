export let handler = (promise, res) => {
  promise.then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}
