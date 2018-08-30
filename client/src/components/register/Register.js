import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import classNames from 'classnames';
import { action } from '../../store';
import { connect } from 'react-redux';
import { REGISTER_USER } from '../../actionTypes';

class Register extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
    const { name, email, password, password2 } = this.state;
    action(REGISTER_USER, { name, email, password, password2 });
  }

  componentWillReceiveProps(nextProps) {
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
    const { name, email, password, password2 } = this.state.errors;

    const nameClasses = classNames("form__input", {
      "form__input--invalid": !ok && !!name
    });
    const emailClasses = classNames("form__input", {
      "form__input--invalid": !ok && !!email
    });
    const passwordClasses = classNames("form__input", {
      "form__input--invalid": !ok && !!password
    });
    const password2Classes = classNames("form__input", {
      "form__input--invalid": !ok && !!password2
    });

    return (
      <form className="form" onSubmit={ this.submit }>
        <h2 className="form__header" >Sign Up</h2> 
        <hr className="form__line"></hr>
        <div className="form__fieldContainer">
            <input type="text"
              name="name"
              onChange={ this.onChange }
              onFocus={ this.onFocus } 
              className={ nameClasses }
              placeholder="Name"/>
              {
                !ok ? <p className="form__error">{ name }</p> : null
              }
        </div>
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
        <div className="form__fieldContainer">
          <input type="password"
            name="password2" 
            onChange={ this.onChange }
            onFocus={ this.onFocus } 
            className={ password2Classes }
            placeholder="Confirm password"/>
            {
                !ok ? <p className="form__error">{ password2 }</p> : null
            }
        </div>
        <button className="form__button">Submit</button>
      </form>
    )
  }
}

export default connect(state => state.register)(Register);
