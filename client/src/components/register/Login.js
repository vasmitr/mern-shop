import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import classNames from 'classnames';
import { action } from '../../store';
import { connect } from 'react-redux';
import { LOGIN } from '../../actionTypes';

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      ok: true,
      loading: false,
      errors: {}
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onFocus = (event) => {
    const {[event.target.name]: value, ...errors} = this.state.errors
    this.setState({ errors });
  }

  submit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    action(LOGIN, { email, password });
  }

  componentDidMount () {
    // Redirect if user Authorized
    if (this.props.isAuthorized) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.setState({
        errors: nextProps.user,
        ok: nextProps.ok,
        loading: nextProps.loading
      });
    }
  }

  render() {
    const ok = this.state.ok;
    const { email, password } = this.state.errors;

    const emailClasses = classNames("form__input", {
      "form__input--invalid": !ok && !!email
    });
    const passwordClasses = classNames("form__input", {
      "form__input--invalid": !ok && !!password
    });

    return (
      <form className="form" onSubmit={ this.submit }>
        <h2 className="form__header" >Sign Up</h2> 
        <hr className="form__line"></hr>
        <div className="form__fieldContainer">
            <input type="email" 
              name="email" 
              onChange={ this.onChange }
              onFocus={ this.onFocus } 
              className={ emailClasses }
              placeholder="Email"/>
              {
                !ok ? <p className="form__error">{ email }</p> : null
              }
        </div>
        <div className="form__fieldContainer">
           <input type="password"
              name="password"
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              className={ passwordClasses }
              placeholder="Password"/>
              {
                !ok ? <p className="form__error">{ password }</p> : null
              }
        </div>
        <button className="form__button">Submit</button>
      </form>
    )
  }
}

export default connect(state => state.auth)(Login);