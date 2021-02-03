// TODO: proper logging
export const log = (message, object) => {
  console.log() // New line
  console.log(message)
  if (object !== undefined) {
    console.dir(object, { depth: null })
  }
}