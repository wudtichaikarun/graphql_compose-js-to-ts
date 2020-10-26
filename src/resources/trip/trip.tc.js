import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'
import { PubSub } from 'graphql-subscriptions'
import { withFilter } from 'graphql-subscriptions'

import StaffTC from '../staff/staff.tc'

import { FilterITC } from '../../shareType'
import { schema } from './schema'

async function getTrips() {
  return Promise.resolve([
    {
      id: 'tripId_1',
      staffId: 'staffId_1',
      orderId: 'orderId_1',
      status: 'DONE',
    },
    {
      id: 'tripId_2',
      staffId: 'staffId_2',
      orderId: 'orderId_2',
      status: 'DONE',
    },
    {
      id: 'tripId_3',
      staffId: 'staffId_1',
      orderId: 'orderId_3',
      status: 'DONE',
    },
    {
      id: 'tripId_4',
      staffId: 'staffId_2',
      orderId: 'orderId_4',
      status: 'DONE',
    },
  ])
}

export default function () {
  const TCname = 'Trip'
  const TC = composeWithJson(TCname, schema)

  TC.addResolver({
    name: 'findById',
    type: TC,
    args: {
      id: 'String',
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: async (resolveParams) => {
      const trips = await getTrips()
      return trips.find((trip) => trip.id === resolveParams.args.id)
    },
  })

  TC.addResolver({
    name: 'findByOrderId',
    type: [TC],
    args: {
      orderId: 'String',
    },
    // `resolveParams` consist from { source, args, context, info, projection }
    resolve: async (resolveParams) => {
      const trips = await getTrips()
      return trips.filter((trip) => trip.orderId === resolveParams.args.orderId)
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
      const trips = await getTrips()
      return trips
    },
  })

  TC.addRelation('staff', {
    resolver: () => {
      return StaffTC().getResolver('findById')
    },
    prepareArgs: {
      id: (source) => {
        return source.staffId
      },
    },
  })

  schemaComposer.Query.addFields({
    [`${TCname}One`]: TC.getResolver('findById'),
    [`${TCname}Many`]: TC.getResolver('find'),
  })

  return TC
}
