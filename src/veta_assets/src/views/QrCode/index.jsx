import { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import MainCard from '../../ui-component/cards/MainCard';
import useVetaIdentity from '../../contexts/VetaIdentityContext';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';
import * as VetaWalletServices from '../../services/VetaWalletServices.ic';
import LoadingButton from '@mui/lab/LoadingButton';

const QrCodePage = () => {
  const { vetaWallet } = useVetaIdentity();
  const { gridSpacing } = useMainLayout();
  const [sharingId, setSharingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const profiles = vetaWallet?.profiles || [];

  const getShareUrl = (profileId) =>
    `${window.location.origin}${window.location.pathname}#/profile/${profileId}`;

  const handleCopy = (profileId) => {
    navigator.clipboard?.writeText(getShareUrl(profileId));
    setSnackbar({ open: true, message: 'Link copied to clipboard', severity: 'info' });
  };

  const handleShare = async (profile) => {
    setSharingId(profile.id);
    try {
      await VetaWalletServices.shareProfile(profile);
      setSnackbar({ open: true, message: `"${profile.profileName}" shared publicly`, severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to share', severity: 'error' });
    } finally {
      setSharingId(null);
    }
  };

  return (
    <MainCard title='QR Codes'>
      {profiles.length === 0 ? (
        <Typography color='text.secondary' sx={{ py: 4, textAlign: 'center' }}>
          No profiles yet. Create a profile first to generate QR codes.
        </Typography>
      ) : (
        <>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            Share your profiles by scanning QR codes or copying the link. Profiles must be shared before they are publicly visible.
          </Typography>
          <Grid container spacing={gridSpacing}>
            {profiles.map((profile) => (
              <Grid item xs={12} sm={6} md={4} key={profile.id}>
                <Card variant='outlined'>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ mb: 2 }}>
                      {profile.profileName}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <QRCodeSVG value={getShareUrl(profile.id)} size={160} />
                    </Box>
                    <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1.5, wordBreak: 'break-all' }}>
                      {getShareUrl(profile.id)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        size='small'
                        startIcon={<ContentCopyIcon />}
                        onClick={() => handleCopy(profile.id)}>
                        Copy
                      </Button>
                      <LoadingButton
                        size='small'
                        variant='contained'
                        startIcon={<ShareIcon />}
                        loading={sharingId === profile.id}
                        onClick={() => handleShare(profile)}>
                        Share
                      </LoadingButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant='filled'>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default QrCodePage;
