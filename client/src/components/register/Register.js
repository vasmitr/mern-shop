import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
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
    return (
      <form className="form" onSubmit={ this.submit }>
        <h2>Sign Up</h2> 
        <div className="form__fieldContainer">
            <input type="text"
              name="name"
              onChange={this.onChange} 
              className="form__input"
              placeholder="Name"/>
              {
                !ok ? <p className="form__error">{ name }</p> : null
              }
        </div>
        <div className="form__fieldContainer">
            <input type="email" 
              name="email" 
              onChange={this.onChange} 
              className="form__input"
              placeholder="Email"/>
              {
                !ok ? <p className="form__error">{ email }</p> : null
              }
        </div>
        <div className="form__fieldContainer">
           <input type="password"
              name="password"
              onChange={this.onChange}
              className="form__input"
              placeholder="Password"/>
              {
                !ok ? <p className="form__error">{ password }</p> : null
              }
        </div>
        <div className="form__fieldContainer">
          <input type="password"
            name="password2" 
            onChange={this.onChange} 
            className="form__input"
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
