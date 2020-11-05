import React from 'react';
import { connect } from 'react-redux';
import { checkLogin } from '../../redux/actions/authActions';

class WithAuth extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.setAuth();
  }

  render() {
    const result = this.props.auth ? this.props.component : this.props.componentReplacement;
    return <>{result}</>;
  }
}

const mapStateToProps = (store) => ({ auth: store.auth.authorization });
const mapDispatchToProps = (dispatch) => ({ setAuth: checkLogin });

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth);
