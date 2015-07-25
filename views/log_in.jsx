var React = require('react');
var Layout = require('./layout');

var LoginForm = React.createClass({


  render: function() {
    return(
      <Layout>
        {this.props.err}
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Login</h3>
            </div>
            <div className="panel-body">
              <form method="post" action="/log_in">
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Email" name="emailAddress" value={this.props.emailAddress} />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" name="password" />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
                <br/>
              </form>
              <a href="/forgot_password">Forgot your password?</a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
})

module.exports = LoginForm;
