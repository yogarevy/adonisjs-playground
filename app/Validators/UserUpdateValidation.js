'use strict'

class UserUpdateValidation {
  get rules () {
    const userId = this.ctx.params.id
    return {
      // validation rules
      name: 'required|max:150|min:2',
      email: `required|email|unique:users,email,id,${userId}`,
      phone: 'number|min:10|max:15|unique:users',
      password: 'min:8',
      status: 'boolean'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.min': 'Password minimal 8 characters or more.',
      'phone.number': 'Phone must be a number.',
      'phone.unique': 'This phone is already registered.',
      'phone.min': 'Phone number minimum 10 numbers.',
      'phone.max': 'Phone number maximum 15 numbers.',
      'status.boolean': 'Status must be 1 or 0.'
    }
  }

  /**
   * Handle error return during the validation
   *
   * @method handle
   *
   * @param  {Object} request
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

module.exports = UserUpdateValidation
