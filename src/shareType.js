import { schemaComposer } from 'graphql-compose'

export const FilterITC = schemaComposer.createInputTC({
  name: 'Filter',
  fields: {
    sort: 'JSON',
    search: 'JSON',
    limit: {
      type: 'Int',
      defaultValue: 9999
    },
    page: 'Int',
    populate: 'JSON'
  }
})
