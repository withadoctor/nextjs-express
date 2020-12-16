import React from 'react'
import axios from 'axios'

export default class Index extends React.Component {
  static async getInitialProps({ req, query }) {
    let props = {}
    try {
      const ttext = await axios
        .get('http://localhost:3000/api', { responseType: 'json', })
        .then(res => res.data.response)
        .catch(Error)
      props.ttext = ttext
    } catch (err) {
      console.error('ttext.js:', err)
    }
    return props
  }

  render() {
    return (
      <div>
        <p>hello 안녕? ㅎㅎ</p>
        {this.props.ttext === null ? <p></p> :
          <p>{this.props.ttext}</p>
        }
      </div>
    )
  }
}
