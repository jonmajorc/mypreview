import * as React from "react"

type State = { open: boolean }
type Action = { type: "open" } | { type: "close" }
type Dispatch = (action: Action) => void

const PortalContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

function portalReducer(state: State, action: Action): State {
  switch (action.type) {
    case "open": {
      return { ...state, open: true }
    }
    case "close": {
      return { ...state, open: false }
    }
  }
}

const Portal = ({ children }) => {
  const { state } = usePortal()

  return state.open ? children : null
}

function PortalProvider({ children }) {
  const [state, dispatch] = React.useReducer(portalReducer, { open: false })
  const value = { state, dispatch }
  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

function usePortal() {
  const context = React.useContext(PortalContext)
  if (context === undefined) {
    throw new Error("usePortal must be used within a PortalProvider")
  }

  const closePortal = () => context.dispatch({ type: "close" })
  const openPortal = () => context.dispatch({ type: "open" })

  return { ...context, closePortal, openPortal }
}

export { PortalProvider, usePortal, Portal }
