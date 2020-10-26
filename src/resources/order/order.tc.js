import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'

import TripTC from '../trip/trip.tc'

import { FilterITC } from '../../shareType'
import { schema } from './schema'

async function getOrders() {
  return Promise.resolve([
    {
      id: 'orderId_1',
      status: 'DONE',
    },
    {
      id: 'orderId_2',
      status: 'DONE',
    },
    {
      id: 'orderId_3',
      status: 'DONE',
    },
    {
      id: 'orderId_4',
      status: 'FAILED',
    },
  ])
}

export default function () {
  const TCname = 'Order'
  const TC = composeWithJson(TCname, schema)

  TC.addResolver({
    name: 'findById',
    type: TC,
    args: {
      id: 'String',
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: async (resolveParams) => {
      const orders = await getOrders()
      return orders.find((order) => order.id === resolveParams.args.id)
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
      const orders = await getOrders()
      return orders.slice(0, filter.limit || staffs.length)
    },
  })

  TC.addRelation('trip', {
    resolver: () => {
      return TripTC().getResolver('findByOrderId')
    },
    prepareArgs: {
      orderId: (source) => {
        return source.id
      },
    },
  })

  schemaComposer.Query.addFields({
    [`${TCname}One`]: TC.getResolver('findById'),
    [`${TCname}Many`]: TC.getResolver('find'),
  })

  return TC
}
