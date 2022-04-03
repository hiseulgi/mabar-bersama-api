import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateBookingValidator from 'App/Validators/CreateBookingValidator'

export default class BookingsController {
  

  public async store({ request, response }: HttpContextContract){
  const payload = await request.validate(CreateBookingValidator)
  response.status(200).json({
    payload
  })
}
}
