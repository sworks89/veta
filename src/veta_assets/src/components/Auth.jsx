import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthClient } from "@dfinity/auth-client"
import { veta } from "../../../declarations/veta";
import dfinityLogo from "../images/logo.png"

// Note: This is just a basic example to get you started
function Auth() {
  const [signedIn, setSignedIn] = useState(false)
  const [principal, setPrincipal] = useState("")
  const [client, setClient] = useState()
  const navigate = useNavigate()

  const initAuth = async () => {
    const client = await AuthClient.create()
    const isAuthenticated = await client.isAuthenticated()

    setClient(client)

    if (isAuthenticated) {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal().toString()
      setSignedIn(true)
      setPrincipal(principal)
    }
  }

  const signIn = async () => {
    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: async () => {
          const identity = client.getIdentity()
          const principal = identity.getPrincipal();
          resolve({ identity, principal })
          let vetaProfile = {
            uid: principal,
            userName: 'Anon',
            verified: false,
          }
          await veta.registerUser(vetaProfile);
          navigate('/dashboard', {state:{ uid: principal.toString()}});
        },
        onError: reject,
      })
    })
    setSignedIn(true)
    setPrincipal(principal.toString())
  }

  const signOut = async () => {
    await client.logout()
    setSignedIn(false)
    setPrincipal("")
  }

  useEffect(() => {
    initAuth()
  }, [])

  return (
    <div className="auth-section">

      {!signedIn && client ? (
        <button onClick={signIn} className="auth-button">
          Sign in
          <img style={{ width: "33px", marginRight: "-1em", marginLeft: "0.7em" }} src={dfinityLogo} />
        </button>
      ) : null}

      {signedIn ? (
        <>
          <p>Signed in as: {principal}</p>
          <button onClick={signOut} className="auth-button">Sign out</button>
        </>
      ) : null}

    </div>
  )
}

export { Auth }
