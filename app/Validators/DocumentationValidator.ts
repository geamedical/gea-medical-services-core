import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export class DocumentationValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    title: schema.string(),
    desc: schema.string(),
    listep: schema.array().members(
      schema.object().members({
        id: schema.number(),
        title: schema.string(),
        desc: schema.string(),
      })
    ),
    mapstep: schema.array().members(
      schema.object().members({
        id: schema.number(),
        step: schema.number(),
        text: schema.string(),
      })
    ),
    flowchart: schema.object().members({
      chart: schema.array().members(schema.object().members({
        id: schema.string(),
        x: schema.number(),
        y: schema.number(),
        width: schema.number(),
        height: schema.number(),
        name: schema.string(),
        type: schema.string(),
        shape: schema.string(),
      })),
      flow: schema.array().members(schema.object().members({
        source: schema.object().members({
          id: schema.string(),
          position: schema.string()
        }),
        destination: schema.object().members({
          id: schema.string(),
          position: schema.string()
        }),
        type: schema.string(),
        style: schema.object().members({
          borderColor: schema.string(),
          borderWidth: schema.string()
        }),
        markerEnd: schema.string(),
      }))
    }),
  })
}
