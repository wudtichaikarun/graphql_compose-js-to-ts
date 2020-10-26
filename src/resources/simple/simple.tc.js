import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'

export default function () {
  // ## 1 compose with json
  const TC = composeWithJson('Simple', { id: '', description: '' })

  // ## 2
  // Type creation https://graphql-compose.github.io/docs/basics/understanding-types.html
  // const TC = schemaComposer.createObjectTC({
  //   name: 'Simple',
  //   fields: {
  //     id: 'String',
  //     description: 'String',
  //   },
  // })

  // ## 3 using SDL for definition new ObjectType
  // const TC = `type Simple {
  //   id: String
  //   description: String
  // }`

  // ## 4 using standard GraphQL Type

  schemaComposer.Query.addFields({
    SimpleQuery: {
      type: TC,
      resolve: () => ({
        id: 'simpleId_1',
        description: 'example create query resolver',
      }),
    },
  })

  return TC
}
