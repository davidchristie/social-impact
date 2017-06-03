import ApolloClient, { createNetworkInterface } from 'apollo-client'

function addAuthenticationToken (request) {
  const token = window.localStorage.getItem('token')
  if (token) {
    if (!request.options.headers) {
      request.options.headers = {}
    }
    request.options.headers.Authorization = `Bearer ${token}`
  }
}

export default function createApolloClient () {
  const networkInterface = createNetworkInterface({
    uri: 'https://us-west-2.api.scaphold.io/graphql/social-impact'
  })
  networkInterface.use([{
    applyMiddleware (request, next) {
      addAuthenticationToken(request)
      next()
    }
  }])
  return new ApolloClient({networkInterface})
}
