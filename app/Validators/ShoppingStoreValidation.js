'use strict'

class ShoppingStoreValidation {
  get rules () {
    return {
      // validation rules
      name: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name.'
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

module.exports = ShoppingStoreValidation
