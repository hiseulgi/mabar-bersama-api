import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateFieldValidator from 'App/Validators/CreateFieldValidator'

// MODEL
import Field from 'App/Models/Field'

export default class FieldsController {
  public async index({ params, request, response }: HttpContextContract) {
    let name = ''
    let type = ''
    let venue_id = params.venue_id

    if (request.qs().name != null) name = request.qs().name
    if (request.qs().type != null) type = request.qs().type

    if (request.qs().name) {
      // QUERY BUILDER
      // let fieldsFiltered = await Database
      //   .from('fields')
      //   .where('name', 'like', `%${name}%`)
      //   .andWhere('type', 'like', `%${type}%`)
      //   .andWhere('venue_id', venue_id)
      //   .select('id', 'name', 'type', 'venue_id')

      // ORM
      let fieldsFiltered = await Field
        .query()
        .where('venue_id', venue_id)
        .andWhere('name', 'like', `${name}`)

      return response.status(200).json({
        message: 'success get fields!',
        data: fieldsFiltered
      })
    }


    // QUERY BUILDER
    // let fields = await Database
    //   .from('fields')
    //   .where('venue_id', venue_id)
    //   .select('id', 'name', 'type', 'venue_id')

    // ORM
    let fields = await Field
      .query()
      .where('venue_id', venue_id)

    return response.status(200).json({
      message: 'success get fields!',
      data: fields
    })
  }

  public async store({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(CreateFieldValidator)

      // QUERY BUILDER
      // let newId = await Database.table('fields').returning('id').insert({
      //   name: request.input('name'),
      //   type: request.input('type'),
      //   venue_id: params.venue_id
      // })

      // ORM
      let newFields = new Field()
      newFields.name = request.input('name')
      newFields.type = request.input('type')
      newFields.venue_id = params.venue_id

      await newFields.save()

      response.created({
        message: 'new fields have been created!',
        newId: newFields.id
      })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    let id = params.id
    let venue_id = params.venue_id

    // QUERY BUILDER
    // let fields = await Database
    //   .from('fields')
    //   .where('id', id)
    //   .andWhere('venue_id', venue_id)
    //   .select('id', 'name', 'type', 'venue_id')
    //   .firstOrFail()

    // ORM
    let fields = await Field.find(id)

    response.status(200).json({
      message: 'succes get field with id!',
      data: fields
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(CreateFieldValidator)

      let id = params.id
      let venue_id = params.venue_id

      // QUERY BUILDER
      // await Database
      //   .from('fields')
      //   .where('id', id)
      //   .andWhere('venue_id', venue_id)
      //   .update({
      //     name: request.input('name'),
      //     type: request.input('type')
      //   })

      // ORM
      let field = await Field.findOrFail(id)
      field.name = request.input('name')
      field.type = request.input('type')

      await field.save()

      response.status(200).json({
        message: 'field updated!',
      })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }

  }

  public async destroy({ params, response }: HttpContextContract) {
    let id = params.id
    let venue_id = params.venue_id

    // QUERY BUILDER
    // await Database
    //   .from('fields')
    //   .where('id', id)
    //   .andWhere('venue_id', venue_id)
    //   .delete()

    // ORM
    let field = await Field.findOrFail(id)

    await field.delete()

    response.status(200).json({
      message: 'field deleted!',
    })
  }
}
