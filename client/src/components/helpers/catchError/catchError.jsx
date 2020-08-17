import React from 'react'

class CatchError extends React.Component {
  state = {
    error: null,
    info: null,
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
  }

  render() {
    if (this.state.error) {
      return <div>Oops! Something wrong :)</div>
    }

    return this.props.children
  }
}

export default CatchError
