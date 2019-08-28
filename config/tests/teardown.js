module.exports = async function() {
  await global.__DB__.sync({force: true})
  await global.__DB__.close()
}
