import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getVetaWalletActor } from '../services/actor';
import useVetaIdentity from '../contexts/VetaIdentityContext';

const OnboardingDialog = () => {
  const { principal, vetaWallet, refreshWallet } = useVetaIdentity();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Show only for authenticated users with no name (new accounts)
  const isNewUser = principal && vetaWallet && vetaWallet.name === '';
  if (!isNewUser) return null;

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name');
      return;
    }
    if (trimmed.length > 128) {
      setError('Name must be 128 characters or less');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const actor = getVetaWalletActor();
      if (!actor) throw new Error('Not connected to canister');

      await actor.create({
        id: principal,
        name: trimmed,
        verified: false,
        profiles: [],
        data: [],
      });
      await refreshWallet();
    } catch (e) {
      console.error('Account creation failed:', e);
      setError('Failed to create account. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={true} maxWidth='xs' fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountBalanceWalletIcon color='primary' />
          <Typography variant='h3'>Welcome to Veta</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1' sx={{ mb: 2 }}>
          Set up your data wallet to get started. Choose a display name for your account.
        </Typography>
        <TextField
          autoFocus
          fullWidth
          label='Display Name'
          placeholder='e.g. Alice'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          error={!!error}
          helperText={error}
          inputProps={{ maxLength: 128 }}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={saving}
          variant='contained'
          onClick={handleCreate}
          disabled={!name.trim()}>
          Create Account
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default OnboardingDialog;
