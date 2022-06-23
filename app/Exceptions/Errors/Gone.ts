import StandardError from './StandardError'

export default class Gone extends StandardError {
  constructor(public message: string) {
    super(420, 'GONE', message)
  }
}
