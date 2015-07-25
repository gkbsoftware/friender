var React = require('react');
var Layout = require('./layout');

var Homepage = React.createClass({
  render: function() {

    if (this.props.userEmail == null) {
      return (
        <Layout>
        <h1>Welcome</h1>
          <LoginPanel userEmail={this.props.userEmail} />
        </Layout>
      );
    }
    else {
      return (
        <Layout>
        <h1>Welcome</h1>
          <LogoutPanel userEmail={this.props.userEmail} />
        </Layout>
      );
    }
  }
})

var LoginPanel = React.createClass({
  render: function(){
    return (
      <div className="login_panel">
        <a href="/log_in">Log In</a>
        <b> or </b>
        <a href="/sign_up">Sign Up</a>
      </div>
    )
  }
})

var LogoutPanel = React.createClass({
  render: function(){
    return (
      <div className="logout_panel">
        <em>Logged in as: {this.props.userEmail} </em>
        <a href="/log_out">Logout</a>
        <br/>
      </div>
    )
  }
})

module.exports = Homepage;
