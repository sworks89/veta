import * as React from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom"
import useVetaIdentity from '../contexts/VetaIdentityContext';
import { vetawallet } from "../../../declarations/vetawallet";
import { Principal } from '@dfinity/principal';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import logo from "../images/veta-logo-white.svg";
import { Paper, Card } from '@mui/material';
import QRCode from 'qrcode.react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Veta
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Onboard(props) {
  const { kycUrl } = props;
  return (
    <iframe
      class="iframe-kyc"
      src={kycUrl}
      allow="camera">
    </iframe>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();
const settings = ['Profile', 'Logout'];

function Dashboard() {
//   const [open, setOpen] = React.useState(true);
  const { signInByICProvider, signOut, principal, client, vetaWallet } = useVetaIdentity();
  // const {state} = useLocation();
  // const { uid } = state; 
  const [userData, setUserData] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [session, setSession] = React.useState(null)
  const [kycUrl, setKycUrl] = React.useState('')

  const onboard = async () => {
    await axios.get('https://us-central1-thanhpage-d.cloudfunctions.net/api/v1/identomat/getSession').then(resp => {
        setSession(resp.data);
        setKycUrl(`https://widget.identomat.com/?session_token=${resp.data}`);
    });
  }

  const getKycResult = async () => {
    await axios.get(`https://us-central1-thanhpage-d.cloudfunctions.net/api/v1/identomat/result/${session}`).then(resp => {
        console.log(resp)
    });
  }

  const getUserData = async () => {
    const res = await vetawallet.get(Principal.fromText(principal));
    console.log(res)
    setUserData(res);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              backgroundColor: '#39b54a',
              justifyContent: 'space-between'
            }}
          >
            <img src={logo} className="Header-logo" alt="logo" />
            <Box>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="primary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: '10px' }}>
                        {/* <Avatar alt="Mark Albitos"><img src="" className="avatar-image" /></Avatar> */}
                        <Avatar alt="Anonymous">?</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            
          </Toolbar>
        </AppBar>
        <MuiDrawer variant="permanent" open={true}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </MuiDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper>
                <Card>
                    <span>Onboard now to get started. </span>
                    <Button onClick={onboard}>KYC Onboarding</Button>
                    <Button onClick={getUserData}>Get User Data</Button>
                </Card>
                <Card>
                { kycUrl && <Onboard kycUrl={kycUrl}></Onboard>}
                </Card>
                <Card>
                { userData && <span>{`${userData.uid.toString()} ${userData.userName} - verified: ${userData.verified}`}</span> }
                <QRCode value="https://reactjs.org/" renderAs="canvas" />
                </Card>
            </Paper>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard