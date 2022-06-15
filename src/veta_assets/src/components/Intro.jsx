import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from '@mui/material'
import { Auth } from "./Auth"
import { veta } from "../../../declarations/veta";
import logo from "../images/veta-logo.svg"

export function Intro() {
  const [count, setCount] = useState()
  const [profile, setProfile] = useState()

  const refreshCounter = async () => {
    const res = await veta.getValue()
    setCount(res.toString())
  }

  const refreshProfile = async () => {
    const res = await veta.find("mark")
    setProfile(res.toString())
  }

  const addCounter = async () => {
    await veta.increment();
    refreshCounter();
  }

  const sign = async () => {
    await veta.insert("mark",count,"Deira");
    refreshProfile();
  }

  useEffect(() => {
    refreshCounter()
    refreshProfile()
  }, [])

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ fontSize: "2em", marginBottom: "0.5em" }}>Own your data</p>
        <div style={{
          display: "flex",
          fontSize: "0.7em",
          textAlign: "left",
          padding: "2em",
          borderRadius: "30px",
          flexDirection: "column",
          background: "rgb(220 218 224 / 25%)",
        }}>
          <div>
            <Auth />
          </div>
        </div>
      </header>
      <Link to="/dashboard">{count}</Link>
      <Button onClick={addCounter}>ADD</Button>
      <Button onClick={sign}>SIGN IN</Button>
      <span>welcome {profile}</span>
    </>
  )
}