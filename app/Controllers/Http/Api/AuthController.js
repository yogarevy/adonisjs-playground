'use strict'

const User = use('App/Models/User')
const { v4: uuidv4 } = require('uuid');
const ExceptionHandler = use('App/Exceptions/Handler')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  /**
   * Create/save a new auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async register({ request, auth, response }) {
    try {
      //getting data passed within the request
      const data = request.only([
        "name",
        "email",
        "password",
        "username",
        "phone",
        "address",
        "country",
        "city",
        "postcode",
      ])

      let dataUser = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
        phone: data.username,
        address: data.address,
        country: data.country,
        city: data.city,
        postcode: data.postcode,
      };

      const user = await User.create(dataUser)

      let accessToken = await auth.generate(user)
      return response.status(200).send({
        status: 200,
        meta: {
          api_version: '1.0.1',
          object: "register",
          method: request.method(),
          url: request.hostname() + request.originalUrl(),
        },
        message: "Success registered new user",
        email: data.email,
        access_token: accessToken,
      })
    } catch (error) {
      throw new ExceptionHandler()
    }
  }

  /**
   * Login auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // @ts-ignore
  async login({ request, auth, response }) {
    try {
      //getting data passed within the request
      const data = request.only(["email", "password"])

      if (
        await auth
          .authenticator("jwt")
          .withRefreshToken()
          .attempt(data.email, data.password)
      ) {
        let user = await User.findBy("email", data.email)
        let accessToken = await auth
          .withRefreshToken()
          .attempt(data.email, data.password)

        return response.status(200).send({
          status: 200,
          meta: {
            api_version: '1.0.1',
            object: "login",
            method: request.method(),
            url: request.hostname() + request.originalUrl(),
          },
          message: "Succesfully Login",
          access_token: accessToken,
          user: user
        })
      }
    } catch (error) {
      let errException = {
        status: error.status,
        meta: {
          api_version: '1.0.1',
          object: "login",
          method: request.method(),
          url: request.hostname() + request.originalUrl(),
        },
        error: error.name,
        message: error.message
      }
      return response.status(error.status).send(errException)
    }
  }
}

module.exports = AuthController
