import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import useVetaIdentity from '../../contexts/VetaIdentityContext';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';

const StatCard = ({ title, value, icon, color = 'primary.main' }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='body2' color='text.secondary'>
            {title}
          </Typography>
          <Typography variant='h3' sx={{ mt: 0.5, color }}>
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 48, height: 48, opacity: 0.8 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

const CATEGORY_COLORS = {
  personal: 'primary',
  social: 'secondary',
  financial: 'success',
};

function getCategoryLabel(cat) {
  if (!cat) return 'unknown';
  if (typeof cat === 'string') return cat;
  // Candid variant: { personal: null } → "personal"
  const keys = Object.keys(cat);
  return keys[0] || 'unknown';
}

function Dashboard() {
  const { principal, vetaWallet } = useVetaIdentity();
  const { gridSpacing } = useMainLayout();
  const navigate = useNavigate();

  const data = vetaWallet?.data || [];
  const profiles = vetaWallet?.profiles || [];
  const name = vetaWallet?.name || '';
  const verified = vetaWallet?.verified || false;

  // Category breakdown
  const categories = {};
  data.forEach((d) => {
    const cat = getCategoryLabel(d.dataCategory);
    categories[cat] = (categories[cat] || 0) + 1;
  });

  // Recent entries (last 10)
  const recentData = [...data].reverse().slice(0, 10);

  return (
    <Box>
      <Typography variant='h2' sx={{ mb: 0.5 }}>
        {name ? `Welcome back, ${name}` : 'Dashboard'}
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        {principal
          ? `${principal.toString().substring(0, 8)}...${principal.toString().slice(-5)}`
          : ''}
      </Typography>

      {/* Stats */}
      <Grid container spacing={gridSpacing} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Data Entries'
            value={data.length}
            icon={<StorageIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Profiles'
            value={profiles.length}
            icon={<PersonIcon />}
            color='secondary.main'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Categories'
            value={Object.keys(categories).length}
            icon={<ShareIcon />}
            color='success.main'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Status'
            value={verified ? 'Verified' : 'Unverified'}
            icon={<VerifiedUserIcon />}
            color={verified ? 'success.main' : 'warning.main'}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/center')}>
          Add Data
        </Button>
        <Button
          variant='outlined'
          startIcon={<PersonIcon />}
          onClick={() => navigate('/dashboard/profiles')}>
          Manage Profiles
        </Button>
      </Box>

      <Grid container spacing={gridSpacing}>
        {/* Recent Data */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant='h4' sx={{ mb: 2 }}>
                Recent Data Entries
              </Typography>
              {recentData.length === 0 ? (
                <Typography color='text.secondary' sx={{ py: 3, textAlign: 'center' }}>
                  No data yet. Go to{' '}
                  <Typography
                    component='span'
                    color='primary'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate('/dashboard/center')}>
                    Data Center
                  </Typography>{' '}
                  to add your first entry.
                </Typography>
              ) : (
                <TableContainer component={Paper} variant='outlined'>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Category</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentData.map((d, idx) => {
                        const cat = getCategoryLabel(d.dataCategory);
                        return (
                          <TableRow key={d.dataId || idx}>
                            <TableCell>
                              <Typography variant='body2' fontWeight={600}>
                                {d.dataType}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant='body2'
                                sx={{
                                  maxWidth: 300,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}>
                                {d.dataContent}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={cat}
                                size='small'
                                color={CATEGORY_COLORS[cat] || 'default'}
                                variant='outlined'
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Category Breakdown */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant='h4' sx={{ mb: 2 }}>
                By Category
              </Typography>
              {Object.keys(categories).length === 0 ? (
                <Typography color='text.secondary' sx={{ py: 3, textAlign: 'center' }}>
                  No data yet.
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {Object.entries(categories).map(([cat, count]) => (
                    <Box
                      key={cat}
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
                        {cat}
                      </Typography>
                      <Chip
                        label={count}
                        size='small'
                        color={CATEGORY_COLORS[cat] || 'default'}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Profiles summary */}
          <Card sx={{ mt: gridSpacing }}>
            <CardContent>
              <Typography variant='h4' sx={{ mb: 2 }}>
                Profiles
              </Typography>
              {profiles.length === 0 ? (
                <Typography color='text.secondary' sx={{ textAlign: 'center' }}>
                  No profiles yet.
                </Typography>
              ) : (
                profiles.map((p, idx) => (
                  <Box
                    key={p.id || idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 0.5,
                    }}>
                    <Typography variant='body2'>{p.profileName}</Typography>
                    {p.isDefault && <Chip label='Default' size='small' variant='outlined' />}
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
