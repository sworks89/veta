import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import useVetaIdentity from '../contexts/VetaIdentityContext';

const SessionExpiredDialog = () => {
  const { sessionExpired, signInByICProvider } = useVetaIdentity();

  if (!sessionExpired) return null;

  const handleReLogin = () => {
    signInByICProvider(() => {
      // Session restored
    });
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Dialog open={true} maxWidth='xs' fullWidth>
      <DialogTitle>
        <Typography variant='h3'>Session Expired</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          Your session has expired. Please log in again to continue.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReload}>Reload</Button>
        <Button variant='contained' onClick={handleReLogin}>
          Log In Again
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiredDialog;
