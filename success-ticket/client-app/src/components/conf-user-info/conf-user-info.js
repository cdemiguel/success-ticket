import React, { Component } from "react"
import api_client from "./../api-client"

class UserInfo extends Component {
  constructor() {
    super()
    this.state = {
      user: ""
    }
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token")

    api_client.getUserById(token).then(user => {
      this.setState({ user })

      const userName = this.state.user.name
      const role = this.state.user.role
      const emailUser = this.state.user.email

      this.props.sendUserInfo(userName, role, emailUser)
    })
  }

  render() {
    const { name, email, role } = this.state.user

    return (
      <div className="col-12 user-info-section">
        <p>
          <span>username: </span>
          <span>{name}</span>
        </p>
        <p>
          <span>email: </span>
          <span>{email}</span>
        </p>
        <p>
          <span>user type: </span>
          <span>{role}</span>
        </p>
      </div>
    )
  }
}

export default UserInfo
