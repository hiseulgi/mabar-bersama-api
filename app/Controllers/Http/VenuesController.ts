import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateVenueValidator from 'App/Validators/CreateVenueValidator'

// MODEL
import Venue from 'App/Models/Venue'

export default class VenuesController {
  public async index({ request, response }: HttpContextContract) {
    let name = ''
    let address = ''
    let phone = ''
    
    if (request.qs().name != null) name = request.qs().name
    if (request.qs().address != null) address = request.qs().address
    if (request.qs().phone != null) phone = request.qs().phone
    
    if (request.qs().name) {
      // QUERY BUILDER
      // let venuesFiltered = await Database
      //   .from('venues')
      //   .where('name', 'like', `%${name}%`)
      //   .andWhere('address', 'like', `%${address}%`)
      //   .andWhere('phone', 'like', `%${phone}%`)
      //   .select('id', 'name', 'address', 'phone')

      // ORM
      let venuesFiltered = await Venue.findBy('name', name)
      console.log(venuesFiltered);
      
      return response.status(200).json({
        message: 'success get venues!',
        data: venuesFiltered
      })
    }
    // QUERY BULDER
    // let venues = await Database.from('venues').select('id', 'name', 'address', 'phone')

    // ORM
    let venues = await Venue.all()

    return response.status(200).json({
      message: 'success get venues!',
      data: venues
    })
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateVenueValidator)

      // QUERY BUILDER
      // let newId = await Database.table('venues').returning('id').insert({
      //   name: request.input('name'),
      //   address: request.input('address'),
      //   phone: request.input('phone')
      // })

      // ORM
      let newVenue = new Venue()
      newVenue.name = request.input('name')
      newVenue.address = request.input('address')
      newVenue.phone = request.input('phone')

      await newVenue.save()

      response.created({
        message: 'new venues have been created!',
        newId: newVenue.id
      })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    let id = params.id

    // QUERY BULDER
    // let venues = await Database.from('venues').where('id', id).select('id', 'name', 'address', 'phone').firstOrFail()\

    // ORM
    let venues = await Venue.find(id)

    response.status(200).json({
      message: 'succes get venue with id!',
      data: venues
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(CreateVenueValidator)

      let id = params.id

      // QUERY BUILDER
      // await Database.from('venues').where('id', id).update({
      //   name: request.input('name'),
      //   address: request.input('address'),
      //   phone: request.input('phone')
      // })

      // ORM
      let venue = await Venue.findOrFail(id)
      venue.name = request.input('name')
      venue.address = request.input('address')
      venue.phone = request.input('phone')

      await venue.save()

      response.status(200).json({
        message: 'venue updated!',
      })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }

  }

  public async destroy({ params, response }: HttpContextContract) {
    let id = params.id

    // QUERY BUILDER
    // await Database.from('venues').where('id', id).delete()

    // ORM
    let venue = await Venue.findOrFail(id)

    await venue.delete()

    response.status(200).json({
      message: 'venue deleted!',
    })
  }
}
