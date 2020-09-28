import React, { useState, createContext, useContext } from 'react'

import { Provider } from 'urql'

const ClientContext = createContext({} as any)

const ClientProvider = ({ makeClient, children }) => {
  const [client, setClient] = useState(makeClient())

  return (
    <ClientContext.Provider
      value={{
        resetClient: () => setClient(makeClient()),
      }}
    >
      <Provider value={client}>{children}</Provider>
    </ClientContext.Provider>
  )
}

const useClient = () => useContext(ClientContext)

export { ClientProvider as default, useClient }
