import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'

import { users } from './users'

import { FilterITC } from '../../shareType'
/** json schema value
 * boolean -> {"a_boolean": true}
 * string -> {"a_string": ""}
 * json -> {"a_json": null}
 * array => {"a_array": []}
 */
import jsonSchema from './schema.json'

export default function() {
  const TCname = 'User'
  const TC = composeWithJson(TCname, jsonSchema)

  TC.addResolver({
    name: 'findById',
    type: TC,
    args: {
      id: 'Int!'
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: resolveParams => {
      return users.find(user => user.id === resolveParams.args.id)
    }
  })

  TC.addResolver({
    name: 'find',
    type: [TC],
    args: {
      filter: FilterITC
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: resolveParams => {
      return users
    }
  })

  schemaComposer.Query.addFields({
    [`${TCname}One`]: TC.getResolver('findById'),
    [`${TCname}Many`]: TC.getResolver('find')
  })

  return TC
}
