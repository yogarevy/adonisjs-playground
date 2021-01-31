'use strict'

class RegisterValidation {
  get rules () {
    return {
      // validation rules
      name: 'required|max:150|min:2',
      email: 'required|email|unique:users',
      password: 'required|min:8'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'password.min': 'Password must be 8 characters or more.'
    }
  }

  /**
   * Handle error return during the validation
   *
   * @method handle
   *
   *
   */
  async fails (errorMessages) {
    return this.ctx.response.status(422).send({
      meta: {
        api_version: '1.0.1'
      },
      status: 422,
      errors: errorMessages
    })
  }
}

module.exports = RegisterValidation
