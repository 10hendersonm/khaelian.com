export default class Player {
  constructor(name, role) {
    this.name = name
    this.judge = role !== 'player'
  }
  name = ''
  score = 0
  article = null
  judge = false
}