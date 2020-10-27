export async function logResolveParams(resolver, source, args, context, info) {
  console.dir(
    {
      source,
      args,
      context,
      info,
    },
    { depth: 3 }
  )

  return resolver(source, args, context, info)
}
