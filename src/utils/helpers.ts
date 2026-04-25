const VERBOSE = false
export const vlog = (message: string) => {
  if (VERBOSE) {
    console.log(message)
  }
}
