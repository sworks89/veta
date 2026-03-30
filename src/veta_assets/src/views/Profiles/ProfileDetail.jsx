import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import useVetaIdentity from '../../contexts/VetaIdentityContext';
import { getVetaWalletActor } from '../../services/actor';

function getCategoryLabel(cat) {
  if (!cat) return 'unknown';
  if (typeof cat === 'string') return cat;
  return Object.keys(cat)[0] || 'unknown';
}

const ProfileDetail = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { vetaWallet, refreshWallet } = useVetaIdentity();

  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const profile = vetaWallet?.profiles?.find((p) => p.id === profileId);
  const allData = vetaWallet?.data || [];

  // Track which data IDs are attached to this profile
  const attachedIds = new Set((profile?.data || []).map((d) => d.dataId));
  const [selected, setSelected] = useState(attachedIds);

  if (!vetaWallet) {
    return <Typography>Loading...</Typography>;
  }

  if (!profile) {
    return (
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/profiles')}>
          Back to Profiles
        </Button>
        <Typography sx={{ mt: 2 }}>Profile not found.</Typography>
      </Box>
    );
  }

  const toggleItem = (dataId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(dataId)) next.delete(dataId);
      else next.add(dataId);
      return next;
    });
  };

  const hasChanges = (() => {
    if (selected.size !== attachedIds.size) return true;
    for (const id of selected) {
      if (!attachedIds.has(id)) return true;
    }
    return false;
  })();

  const handleSave = async () => {
    const actor = getVetaWalletActor();
    if (!actor) return;

    setSaving(true);
    try {
      const selectedData = allData.filter((d) => selected.has(d.dataId));
      const updatedProfile = { ...profile, data: selectedData };
      const updatedProfiles = vetaWallet.profiles.map((p) =>
        p.id === profileId ? updatedProfile : p,
      );
      await actor.update({ ...vetaWallet, profiles: updatedProfiles });
      await refreshWallet();
      setSnackbar({ open: true, message: 'Profile updated', severity: 'success' });
    } catch (e) {
      console.error(e);
      setSnackbar({ open: true, message: 'Failed to save: ' + e.message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/profiles')} sx={{ mb: 2 }}>
        Back to Profiles
      </Button>

      <Typography variant='h2' sx={{ mb: 0.5 }}>
        {profile.profileName}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {profile.isDefault && <Chip label='Default' size='small' color='primary' variant='outlined' />}
        <Chip label={`${selected.size} ${selected.size === 1 ? 'entry' : 'entries'} attached`} size='small' variant='outlined' />
      </Box>

      <Card>
        <CardContent>
          <Typography variant='h4' sx={{ mb: 1 }}>
            Attach Data Entries
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            Select which data entries to include in this profile. When you share this profile, only the attached entries will be visible.
          </Typography>

          {allData.length === 0 ? (
            <Typography color='text.secondary' sx={{ py: 2, textAlign: 'center' }}>
              No data entries in your wallet.{' '}
              <Typography
                component='span'
                color='primary'
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/dashboard/center')}>
                Add some in Data Center.
              </Typography>
            </Typography>
          ) : (
            <>
              <List disablePadding>
                {allData.map((d, idx) => {
                  const cat = getCategoryLabel(d.dataCategory);
                  const isAttached = selected.has(d.dataId);
                  return (
                    <ListItem
                      key={d.dataId || idx}
                      disablePadding
                      divider={idx < allData.length - 1}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => toggleItem(d.dataId)}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Checkbox edge='start' checked={isAttached} tabIndex={-1} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='body1' fontWeight={600}>
                              {d.dataType}
                            </Typography>
                            <Chip label={cat} size='small' variant='outlined' />
                          </Box>
                        }
                        secondary={d.dataContent}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Divider sx={{ my: 2 }} />
              <LoadingButton
                loading={saving}
                variant='contained'
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!hasChanges}>
                Save Changes
              </LoadingButton>
            </>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant='filled'>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileDetail;
