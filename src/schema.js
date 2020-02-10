import path from 'path'
import { schemaComposer } from 'graphql-compose'
import fileLoader from './libraries/load/file'

export async function buildSchema() {
  const TypeComposers = fileLoader(path.resolve(__dirname, 'resources'), 'tc')

  // build schema
  await Promise.all(
    Object.keys(TypeComposers)
      .filter(key => key !== 'base' && key !== 'baseEs')
      .map(key => TypeComposers[key].default())
  )

  const schemas = [schemaComposer.buildSchema()]

  return schemas
}
