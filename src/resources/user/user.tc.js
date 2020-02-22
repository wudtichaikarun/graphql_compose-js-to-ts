import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'
import { PubSub } from 'graphql-subscriptions'
import { withFilter } from 'graphql-subscriptions'

import { users } from './users'

import { FilterITC } from '../../shareType'
import { schema } from './schema'

export default function() {
  const TCname = 'User'
  const TC = composeWithJson(TCname, schema)

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
