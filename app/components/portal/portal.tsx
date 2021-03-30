import * as React from "react"

type Component = React.ReactNode | undefined
type State = { open: boolean; component?: Component }
type Action = { type: "open"; component?: Component } | { type: "close"; component?: Component }
type Dispatch = (action: Action) => void

const PortalContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

function portalReducer(state: State, action: Action) {
  switch (action.type) {
    case "open": {
      return { open: true, component: action.component }
    }
    case "close": {
      return { open: false, component: undefined }
    }
  }
}

function PortalProvider({ children }) {
  const [state, dispatch] = React.useReducer(portalReducer, { open: false, component: undefined })
  const value = { state, dispatch }
  return (
    <PortalContext.Provider value={value}>
      {state.open && state.component}
      {children}
    </PortalContext.Provider>
  )
}

function usePortal() {
  const context = React.useContext(PortalContext)
  if (context === undefined) {
    throw new Error("usePortal must be used within a PortalProvider")
  }
  return context
}

export { PortalProvider, usePortal }
