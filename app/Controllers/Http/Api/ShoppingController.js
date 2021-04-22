'use strict'

const Shopping = use('App/Models/Shopping')
const ExceptionHandler = use('App/Exceptions/Handler')
const Helpers = use('Helpers')
const Env = use('Env')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class ShoppingController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let search_term = request.input('search')
      let page = (request.input('page') != null) ? request.input('page') : 1
      let limit = (request.input('limit') != null) ? request.input('limit') : 10
      let sort = (request.input('sort') != null) ? request.input('sort') : 'shoppings.updated_at'
      let order = (request.input('order') != null) ? request.input('order') : 'DESC'
      let conditions = '1 = 1'

      if (search_term != null) {
        conditions += " AND shoppings.name LIKE '%" + search_term + "%'"
      }

      let paged = await Shopping.query().whereRaw(conditions).orderBy(sort, order).paginate(page, limit)

      return response.status(200).send({
        status: 200,
        meta: {
          api_version: '1.0.1',
          object: "Index Shopping",
          method: request.method(),
          url: request.hostname() + request.originalUrl(),
        },
        paged
      })
    } catch (e) {
      throw new ExceptionHandler()
    }
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      let item = await Shopping.findOrFail(params.id)

      return response.status(200).send({
        status: 200,
        meta: {
          api_version: '1.0.1',
          object: "Show Shopping",
          method: request.method(),
          url: request.hostname() + request.originalUrl(),
        },
        data: item
      })
    } catch (e) {
      let errException = {
        status: e.status,
        meta: {
          api_version: '1.0.1',
          object: "Show Shopping",
          method: request.method(),
          url: request.hostname() + request.originalUrl(),
        },
        error: e.name,
        message: e.message
      }
      return response.status(e.status).send(errException)
    }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
