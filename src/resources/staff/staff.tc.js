import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'

import UserTC from '../user/user.tc'
import { staffs } from './staffs'

import { FilterITC } from '../../shareType'
import { schema } from './schema'

export default function() {
  const TCname = 'Staff'
  const TC = composeWithJson(TCname, schema)

  TC.addResolver({
    name: 'findById',
    type: TC,
    args: {
      id: 'Int!'
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: resolveParams => {
      return staffs.find(staff => staff.id === resolveParams.args.id)
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
      return staffs
    }
  })

  TC.addRelation('user', {
    resolver: () => {
      return UserTC().getResolver('findById')
    },
    prepareArgs: {
      id: source => {
        return source.userId
      }
    }
  })

  schemaComposer.Query.addFields({
    [`${TCname}One`]: TC.getResolver('findById'),
    [`${TCname}Many`]: TC.getResolver('find')
  })

  return TC
}
