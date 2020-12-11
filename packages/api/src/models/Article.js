export default class Article {
  constructor(props) {
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        this[key] = value
      })
    }
  }
  title = ''
  link = ''
}
