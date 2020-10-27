import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'

// https://github.com/graphql-compose/graphql-compose
export default function () {
  // ## 1 compose with json
  const TC = composeWithJson('Simple', { id: '', description: '', status: '' })

  // ## 2
  // Type creation https://graphql-compose.github.io/docs/basics/understanding-types.html
  // const StatusETC = schemaComposer.createEnumTC({
  //   name: 'StatusEnum',
  //   values: {
  //     NEW: { value: 'NEW' },
  //     APPROVED: { value: 'APPROVE' },
  //     DECLINED: { value: 'DECLINED' },
  //   },
  // })
  // const TC = schemaComposer.createObjectTC({
  //   name: 'Simple',
  //   fields: {
  //     id: 'String',
  //     description: 'String',
  //     status: StatusETC,
  //   },
  // })

  // ## 3 using SDL(schema definition language) for definition new ObjectType
  // schemaComposer.createEnumTC(`enum StatusEnum { NEW APPROVED DECLINED }`)
  // const TC = `type Simple {
  //   id: String
  //   description: String
  //   status: StatusEnum
  // }`

  // ## 4
  // schemaComposer.createEnumTC(`enum StatusEnum { NEW APPROVED DECLINED }`)
  // const TC = schemaComposer.createObjectTC(`
  //   type Simple {
  //     id: String
  //     description: String
  //     status: StatusEnum
  //   }
  // `)

  // ## 5
  // const TC = schemaComposer.createObjectTC({
  //   name: 'Simple',
  //   fields: {
  //     id: 'String',
  //     description: 'String',
  //     status: `enum StatusEnum { NEW APPROVED DECLINED }`,
  //   },
  // })

  // ## 6
  // let TC = composeWithJson('Simple', { id: '', description: '' })
  // TC.addFields({
  //   status: `enum StatusEnum { NEW APPROVED DECLINED }`,
  // })

  // ## 7
  // const StatusETC = schemaComposer.createEnumTC(`enum StatusEnum { NEW APPROVED DECLINED }`)
  // let TC = composeWithJson('Simple', { id: '', description: '' })
  // TC.addFields({
  //   status: StatusETC,
  // })

  schemaComposer.Query.addFields({
    SimpleQueryMany: {
      type: [TC],
      resolve: () => [
        {
          id: 'simpleId_1',
          description: 'example create query resolver',
          status: 'NEW',
          xx: 'xx',
        },
        {
          id: 'simpleId_1',
          description: 'example create query resolver',
        },
      ],
    },
    SimpleQueryOne: {
      type: TC,
      resolve: () => ({
        id: 'simpleId_1',
        description: 'example create query resolver',
        status: 'NEW',
        xx: 'xx',
      }),
    },
  })

  return TC
}
