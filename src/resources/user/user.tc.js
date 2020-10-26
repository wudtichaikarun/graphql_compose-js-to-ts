import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'
import { PubSub } from 'graphql-subscriptions'
import { withFilter } from 'graphql-subscriptions'

import { FilterITC } from '../../shareType'
import { schema } from './schema'

async function getUsers() {
  return Promise.resolve([
    {
      id: 'userId_1',
      firstName: 'romantic1',
      lastName: 'HaHa',
    },
    {
      id: 'userId_2',
      firstName: 'romantic2',
      lastName: 'HaHa2',
    },
  ])
}

export default function () {
  const TCname = 'User'
  // ## 1
  const TC = composeWithJson(TCname, schema)

  // ## 2
  // const TC = schemaComposer.createObjectTC({
  //   name: `${TCname}`,
  //   fields: {
  //     id: 'String',
  //     firstName: 'String',
  //     lastName: 'String',
  //   },
  // })

  TC.addResolver({
    name: 'findById',
    type: TC,
    args: {
      id: 'String',
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: async (resolveParams) => {
      const users = await getUsers()
      return users.find((user) => user.id === resolveParams.args.id)
    },
  })

  TC.addResolver({
    name: 'find',
    type: [TC],
    args: {
      filter: FilterITC,
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: async (resolveParams) => {
      const users = await getUsers()
      return users
    },
  })

  schemaComposer.Query.addFields({
    [`${TCname}One`]: TC.getResolver('findById'),
    [`${TCname}Many`]: TC.getResolver('find'),
  })

  return TC
}
