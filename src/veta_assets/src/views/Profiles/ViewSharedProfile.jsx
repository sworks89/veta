import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import User1 from '../../_assets/images/users/user-round.svg';
import * as VetaWalletServices from '../../services/VetaWalletServices.ic';

function getCategoryLabel(cat) {
  if (!cat) return 'unknown';
  if (typeof cat === 'string') return cat;
  return Object.keys(cat)[0] || 'unknown';
}

const ViewSharedProfile = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileId) fetchProfile(profileId);
  }, [profileId]);

  const fetchProfile = async (id) => {
    try {
      const result = await VetaWalletServices.getSharedProfile(id);
      // Candid opt returns [value] or []
      const found = Array.isArray(result) ? result[0] : result;
      setProfile(found || false);
    } catch (e) {
      console.warn('Failed to fetch shared profile:', e);
      setProfile(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
        <Typography variant='h4' color='text.secondary'>
          Profile not found
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
          This profile may not exist or hasn't been shared yet.
        </Typography>
      </Box>
    );
  }

  const { profileName, data = [], verified } = profile;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}>
      <Card sx={{ maxWidth: 480, width: '100%' }}>
        <CardContent sx={{ textAlign: 'center', pt: 4 }}>
          {/* Avatar */}
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <Avatar src={User1} sx={{ width: 96, height: 96 }} />
            {verified && (
              <CheckCircleIcon
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: -4,
                  color: '#2f7dff',
                  bgcolor: 'background.paper',
                  borderRadius: '50%',
                  fontSize: 28,
                }}
              />
            )}
          </Box>

          {/* Name */}
          <Typography variant='h3' sx={{ mb: 1 }}>
            {profileName}
          </Typography>

          {verified && (
            <Chip
              icon={<VerifiedUserIcon />}
              label='Verified Identity'
              size='small'
              color='primary'
              variant='outlined'
              sx={{ mb: 2 }}
            />
          )}

          {/* Data entries */}
          {data.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h5' sx={{ mb: 1, textAlign: 'left' }}>
                Shared Data
              </Typography>
              <List disablePadding>
                {data.map((d, idx) => (
                  <ListItem key={d.dataId || idx} divider={idx < data.length - 1} sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant='body2' fontWeight={600}>
                            {d.dataType}
                          </Typography>
                          <Chip label={getCategoryLabel(d.dataCategory)} size='small' variant='outlined' />
                        </Box>
                      }
                      secondary={d.dataContent}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {data.length === 0 && (
            <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
              No data attached to this profile.
            </Typography>
          )}
        </CardContent>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', pb: 2 }}>
          <Typography variant='caption' color='text.secondary'>
            Shared via Veta Data Wallet
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ViewSharedProfile;
