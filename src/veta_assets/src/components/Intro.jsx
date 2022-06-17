import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useVetaIdentity from '../contexts/VetaIdentityContext';
import { AppBar, Toolbar, Button, Typography, Card, Avatar } from '@mui/material'
import { Auth } from "./Auth"
import { veta } from "../../../declarations/veta";
import logo from "../images/veta-logo.svg"
import dfinityLogo from "../images/infinity_logo.svg"
import background1 from "../images/background1.jpg"
import background2 from "../images/background2.png"
import background3 from "../images/background3.jpg"
import background4 from "../images/background4.jpg"
import thanhPic from "../images/thanh.png"
import markPic from "../images/mark.jpeg"
import { Handshake, HowToReg, Sync, Insights, FactCheck, ConnectWithoutContact, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

export function Intro() {
  const { signInByICProvider, signOut, principal, client, vetaWallet } = useVetaIdentity();
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
      <AppBar position="sticky"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                color: '#fff',
                padding: '0 24px'
              }}>
        <img src={logo} className="App-logo" alt="logo" />
        <Toolbar>{/* content */}</Toolbar>
        <Button variant='text' color='inherit' onClick={signInByICProvider}>
          <img src={dfinityLogo} alt="logo" style={{ width: '24px', marginRight: '5px' }} />
          <strong className='align-self-end mt-1'>Login</strong>
        </Button>
      </AppBar>
      <section style={{ height: '80vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundImage: `url(${background1})`, backgroundSize: 'cover' }}>
        {/* <img src={background1} style={{ width: '100%', position: 'absolute', top: '64px' }}/> */}
        <Typography
						component='h2'
						variant='h2'
						sx={{
              position: 'relative',
              left: '200px',
              fontWeight: '400'
						}}>
						OWN YOUR DATA
            <span style={{height: '5px',
              width: '116px',
              display: 'block',
              margin: '0 auto 0',
              backgroundColor: '#39b54a',
              position: 'relative',
              right: '2px'
            }}></span>
					</Typography>
      </section>
      <section style={{ padding: '24px', height: '80vh', display: 'flex', flexDirection: 'column', color: '#000', backgroundImage: `url(${background2})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <Typography
          component='h3'
          variant='h3'
          sx={{

          }}>
          WHAT IS VETA
        </Typography>
      </section>
      <section style={{ height: '80vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundImage: `url(${background4})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        {/* <img src={background1} style={{ width: '100%', position: 'absolute', top: '64px' }}/> */}
        <Typography
						component='h3'
						variant='h3'
						sx={{
              position: 'relative',
              left: '34%',
              fontWeight: '400',
              width: '500px'
						}}>
						CONNECT YOUR IDENTITY TO THE DIGITAL WORLD
					</Typography>
      </section>
      <section style={{ padding: '24px', height: '80vh', display: 'flex', flexDirection: 'column', color: '#000', backgroundImage: `url(${background2})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <Typography
          component='h3'
          variant='h3'
          sx={{

          }}>
          HOW DOES IT WORK
        </Typography>
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{ height: '100%'}}></div>
          <div style={{ height: '100%', width: '100%', maxWidth: '1200px'}}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <div style={{ maxWidth: '150px', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <HowToReg sx={{ fontSize: 90 }}/>
                <Typography
                  component='h5'
                  variant='h5'>
                  1. Onboard
                </Typography>
                <span>User logins to wallet and onboards through KYC</span>
              </div>
              <div style={{ maxWidth: '150px', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Handshake sx={{ fontSize: 90 }}/>
                <Typography
                  component='h5'
                  variant='h5'>
                  2. Connect
                </Typography>
                <span>User connects wallet to data platforms</span>
              </div>
              <div style={{ maxWidth: '150px', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Sync sx={{ fontSize: 90 }}/>
                <Typography
                  component='h5'
                  variant='h5'>
                  3. Sync
                </Typography>
                <span>User manages data and syncs wallet to platform</span>
              </div>
              <div style={{ maxWidth: '150px', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ConnectWithoutContact sx={{ fontSize: 90 }}/>
                <Typography
                  component='h5'
                  variant='h5'>
                  4. Share
                </Typography>
                <span>User shares data to verifiers and consumers</span>
              </div>
              <div style={{ maxWidth: '150px', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <FactCheck sx={{ fontSize: 90 }}/>
                <Typography
                  component='h5'
                  variant='h5'>
                  5. Verify
                </Typography>
                <span>Consumers verify data credibility through cryptographic signatures</span>
              </div>
              <div style={{ maxWidth: '150px', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Insights sx={{ fontSize: 90 }}/>
                <Typography
                  component='h5'
                  variant='h5'>
                  6. Process
                </Typography>
                <span>Consumers or Verifiers process verifiable data</span>
              </div>
            </div>
          </div>
          <div style={{ height: '100%'}}></div>
        </div>
      </section>
      <section style={{ height: '80vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundImage: `url(${background3})`, backgroundSize: 'cover' }}>
      <Typography
          component='h2'
          variant='h2'
          sx={{

          }}>
          AN ECOSYSTEM OF TRUST
        </Typography>
      </section>
      <section style={{ padding: '24px', height: '80vh', display: 'flex', flexDirection: 'column', color: '#000', backgroundImage: `url(${background2})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <Typography
          component='h3'
          variant='h3'
          sx={{

          }}>
          MEET THE TEAM
        </Typography>
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '410px', backgroundColor: 'rgba(0, 0, 0, 0.87)', color: '#fff', padding: '30px', marginRight: '30px'}}>
            <Avatar alt="Mark Albitos" src={markPic} style={{ width: '200px', height: '200px', border: '2px solid', marginBottom: '30px'}}/>
            <Typography
              component='h4'
              variant='h4'>
              Mark Albitos
            </Typography>
            <Typography
              component='h5'
              variant='h5'>
              Founder / Developer
            </Typography>
            <div style={{width: '136px', display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
              <Twitter/>
              <LinkedIn/>
              <GitHub/>
            </div>
          </Card>
          <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '410px', backgroundColor: 'rgba(0, 0, 0, 0.87)', color: '#fff', padding: '30px'}}>
            <Avatar alt="Thanh Tran" src={thanhPic} style={{ width: '200px', height: '200px', border: '2px solid', marginBottom: '30px'}}/>
            <Typography
              component='h4'
              variant='h4'>
              Thanh Tran
            </Typography>
            <Typography
              component='h5'
              variant='h5'>
              Co-Founder / Developer
            </Typography>
            <div style={{width: '136px', display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
              <Twitter/>
              <LinkedIn/>
              <GitHub/>
            </div>
          </Card>
        </div>
      </section>
      <footer>

      </footer>
    </>
  )
}