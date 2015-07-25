var React = require('react');
var Layout = require('./layout');

var ErrorMessage = React.createClass({
  render: function() {
    return <div className="alert alert-danger" role="alert">{this.props.message}</div>;
  }
});

var ForgotPassword = React.createClass({
  render: function() {
    var errorMessage;

    if(this.props.error) {
      errorMessage = <ErrorMessage message={this.props.error} />;
    }

    return (
      <Layout>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Forgot Password</h3>
            </div>
            <div className="panel-body">
              <form method="post" action="/forgot_password">
                {errorMessage}
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Email" name="emailAddress" value={this.props.emailAddress} />
                </div>
                <button type="submit" className="btn btn-success">Send me my password</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
});

module.exports = ForgotPassword;
