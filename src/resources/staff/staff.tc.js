import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'

import UserTC from '../user/user.tc'

import { FilterITC } from '../../shareType'
import { schema } from './schema'

function getStaffs() {
  return Promise.resolve([
    {
      id: 'staffId_1',
      userId: 'userId_1',
      status: 'ONLINE',
    },
    {
      id: 'staffId_2',
      userId: 'userId_2',
      status: 'ONLINE',
    },
    {
      id: 'staffId_3',
      userId: 'userId_3',
      status: 'OFFLINE',
    },
  ])
}

export default function () {
  const TCname = 'Staff'
  // ## 1
  const TC = composeWithJson(TCname, schema)

  // ## 2
  // const TC = schemaComposer.createObjectTC({
  //   name: `${TCname}`,
  //   fields: {
  //     id: 'String',
  //     userId: 'String',
  //     status: 'String'
  //   }
  // })

  TC.addResolver({
    name: 'findById',
    type: TC,
    args: {
      id: 'String',
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: async (resolveParams) => {
      const staffs = await getStaffs()
      return staffs.find((staff) => staff.id === resolveParams.args.id)
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
      const { filter } = resolveParams.args
      const staffs = await getStaffs()
      return staffs.slice(0, filter.limit || staffs.length)
    },
  })

  TC.addRelation('user', {
    resolver: () => {
      return UserTC().getResolver('findById')
    },
    prepareArgs: {
      id: (source) => {
        return source.userId
      },
    },
  })

  schemaComposer.Query.addFields({
    [`${TCname}One`]: TC.getResolver('findById'),
    [`${TCname}Many`]: TC.getResolver('find'),
  })

  return TC
}
