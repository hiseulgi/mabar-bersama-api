import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'


import User from 'App/Models/User'

import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator)

      const newUser = await User.create(data)

      return response.created({ message: 'registered' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.message })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const userSchema = schema.create({
        email: schema.string(),
        password: schema.string()
      })

      
      await request.validate({ schema: userSchema })
      const email = request.input('email')
      const password = request.input('password')

      const token = await auth.use('api').attempt(email, password)

      return response.ok({ message: 'login succes', token })
    } catch (error) {
      if (error.guard) {
        return response.badRequest({ message: 'login error', error: error.message })
      } else {
        return response.badRequest({ message: 'login error', error: error.messages })
      }
    }
  }
}
