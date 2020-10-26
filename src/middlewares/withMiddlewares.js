import R from 'ramda'
/**
 * @param {*} middelwares [middleware]
 * @param {*} schemaComposer schemaComposer.Mutation or schemaComposer.Query
 * @param {} resolvers { resolverName: Resolver}
 */
export function withMiddlewares(middelwares, schemaComposer, resolvers) {
  const resolverWithAuthentications = {}
  Object.keys(resolvers).forEach(async (resolverName) => {
    resolverWithAuthentications[resolverName] = resolvers[resolverName].withMiddlewares(middelwares)
  })

  const allResolver = R.mergeAll(resolverWithAuthentications)
  schemaComposer.addFields(allResolver)
}
