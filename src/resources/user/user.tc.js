import { schemaComposer } from 'graphql-compose'
import { FilterITC } from '../../shareType'
import { users } from './users'

export default function() {
  const TCname = 'User'
  const TC = schemaComposer.createObjectTC({
    name: `${TCname}`,
    fields: {
      id: 'Int!',
      firstName: 'String',
      lastName: 'String'
    }
  })

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
