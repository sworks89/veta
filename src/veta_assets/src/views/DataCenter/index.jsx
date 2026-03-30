import { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidV4 } from 'uuid';
import MainCard from '../../ui-component/cards/MainCard';
import * as Crypto from '../../utils/crypto';
import { getVetaWalletActor } from '../../services/actor';
import useVetaIdentity from '../../contexts/VetaIdentityContext';

const DATA_TYPES = {
  personal: ['Name', 'Email', 'Phone', 'Address', 'Date of Birth', 'Nationality', 'ID Number'],
  social: ['Username', 'Bio', 'Website', 'Followers', 'Posts'],
  financial: ['Balance', 'Transaction', 'Account Number', 'Credit Score'],
};

const DataCenter = () => {
  const { principal, vetaWallet, refreshWallet } = useVetaIdentity();

  // Platform management (frontend-only for MVP)
  const [platforms, setPlatforms] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('veta_platforms') || '[]');
    } catch {
      return [];
    }
  });
  const [newPlatformId, setNewPlatformId] = useState('');
  const [newPlatformName, setNewPlatformName] = useState('');

  // Data entry form
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dataContent, setDataContent] = useState('');
  const [saving, setSaving] = useState(false);

  // Feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showMessage = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddPlatform = () => {
    const id = newPlatformId.trim();
    const name = newPlatformName.trim();
    if (!id || !name) {
      showMessage('Please enter both a Principal and Name', 'warning');
      return;
    }
    const updated = [...platforms, { id, name }];
    setPlatforms(updated);
    localStorage.setItem('veta_platforms', JSON.stringify(updated));
    setNewPlatformId('');
    setNewPlatformName('');
    showMessage(`Platform "${name}" added`);
  };

  const handleGenerate = async () => {
    if (!selectedCategory || !selectedType || !dataContent.trim()) {
      showMessage('Please fill in all fields', 'warning');
      return;
    }

    const actor = getVetaWalletActor();
    if (!actor || !principal || !vetaWallet) {
      showMessage('Not connected. Please log in.', 'error');
      return;
    }

    setSaving(true);
    try {
      const content = dataContent.trim();
      const signature = Crypto.signData(content);
      const now = BigInt(Date.now()) * BigInt(1_000_000); // ms → nanoseconds

      const newData = {
        dataId: uuidV4(),
        uid: principal,
        platformId: principal, // default to self if no platform selected
        signature,
        date: now,
        dataCategory: { [selectedCategory]: null },
        dataType: selectedType,
        dataContent: content,
      };

      // If a platform is selected, use its principal
      if (selectedPlatform) {
        try {
          // Platform ID is stored as text — the IDL will encode it
          newData.platformId = selectedPlatform;
        } catch {
          // keep default
        }
      }

      const updatedData = [...(vetaWallet.data || []), newData];
      const updatedUser = { ...vetaWallet, data: updatedData };
      await actor.update(updatedUser);
      await refreshWallet();

      // Reset form
      setDataContent('');
      setSelectedType('');
      showMessage('Data entry created and signed');
    } catch (e) {
      console.error('Failed to generate data:', e);
      showMessage('Failed to create data entry: ' + e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const typeOptions = selectedCategory ? DATA_TYPES[selectedCategory] || [] : [];

  return (
    <MainCard>
      <Typography variant='h2' sx={{ mb: 3 }}>
        Data Center
      </Typography>

      {/* Add Platform Section */}
      <Typography variant='h4' sx={{ mb: 1 }}>
        Platforms
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Register external platforms that provide your data.
      </Typography>
      <Grid container spacing={2} alignItems='flex-end' sx={{ mb: 1 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Principal ID'
            variant='standard'
            value={newPlatformId}
            onChange={(e) => setNewPlatformId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Platform Name'
            variant='standard'
            value={newPlatformName}
            onChange={(e) => setNewPlatformName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant='contained' startIcon={<AddIcon />} onClick={handleAddPlatform}>
            Add Platform
          </Button>
        </Grid>
      </Grid>
      {platforms.length > 0 && (
        <Typography variant='caption' color='text.secondary' sx={{ mb: 2, display: 'block' }}>
          Registered: {platforms.map((p) => p.name).join(', ')}
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Generate Data Section */}
      <Typography variant='h4' sx={{ mb: 1 }}>
        Add Data Entry
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Create a new signed data entry in your wallet.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Platform (optional)</InputLabel>
            <Select
              value={selectedPlatform}
              label='Platform (optional)'
              onChange={(e) => setSelectedPlatform(e.target.value)}>
              <MenuItem value=''>
                <em>Self</em>
              </MenuItem>
              {platforms.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category *</InputLabel>
            <Select
              value={selectedCategory}
              label='Category *'
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedType('');
              }}>
              <MenuItem value='personal'>Personal</MenuItem>
              <MenuItem value='social'>Social</MenuItem>
              <MenuItem value='financial'>Financial</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled={!selectedCategory}>
            <InputLabel>Data Type *</InputLabel>
            <Select
              value={selectedType}
              label='Data Type *'
              onChange={(e) => setSelectedType(e.target.value)}>
              {typeOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Content *'
            placeholder='e.g. alice@example.com'
            value={dataContent}
            onChange={(e) => setDataContent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            inputProps={{ maxLength: 10240 }}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={saving}
            variant='contained'
            size='large'
            onClick={handleGenerate}
            disabled={!selectedCategory || !selectedType || !dataContent.trim()}>
            Generate & Sign
          </LoadingButton>
        </Grid>
      </Grid>

      {/* Data count */}
      {vetaWallet?.data?.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant='body2' color='text.secondary'>
            You have {vetaWallet.data.length} data {vetaWallet.data.length === 1 ? 'entry' : 'entries'} in your wallet.
          </Typography>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant='filled'>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default DataCenter;
