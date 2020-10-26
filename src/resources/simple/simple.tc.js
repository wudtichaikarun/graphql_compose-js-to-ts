import { schemaComposer } from 'graphql-compose'
import composeWithJson from 'graphql-compose-json'

export default function () {
  const TC = composeWithJson('Simple', { id: '', description: '' })

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
