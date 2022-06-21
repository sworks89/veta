import { useEffect, useState } from 'react';
// material-ui
import { Typography, Button, TextField, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

// ==============================|| D ATA CENTERPAGE ||============================== //

const DataCenter = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

      return (
      <MainCard>
        <Typography variant="h2">
            Veta Center
        </Typography>
        <div>
            <Typography variant="h3">
            Add Platform
            </Typography>
            <div>
                <TextField id="platform-id" label="Principal" variant="standard" />
                <TextField id="platform-id" label="Name" variant="standard" />
                <Button variant="contained">ADD</Button>
            </div>
        </div>
        <div>
            <Typography variant="h3">
            Generate Data
            </Typography>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedPlatform}
                        label="Platform"
                        onChange={handlePlatformChange}
                    >
                        <MenuItem value={'2m7c3-hjs6a-gjc25-gelpg-qwd2v-7tno3-2uefb-f4ixc-xzuib-kwop6-pae'}>2m7c3-hjs6a-gjc25-gelpg-qwd2v-7tno3-2uefb-f4ixc-xzuib-kwop6-pae</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Data Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCategory}
                        label="Data Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value={'personal'}>Personal Data</MenuItem>
                        <MenuItem value={'social'}>Social Data</MenuItem>
                        <MenuItem value={'financial'}>Financial Data</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedType}
                        label="Data Type"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value={''}></MenuItem>
                    </Select>
                </FormControl>
                <TextField id="platform-id" label="User" variant="standard" />
                <TextField id="platform-id" label="Data Content" variant="standard" />
                <Button variant="contained">GENERATE</Button>
            </div>
        </div>
        <div>
            <Typography variant="h3">
                Query Data
            </Typography>
            <div>
                <Button variant="contained">QUERY</Button>
            </div>
        </div>
        <div>
            <Typography variant="h3">
                Validate Data
            </Typography>
            <div>
                {/* <DatePicker
                    label="Transaction Date"
                    value={selectedDate}
                    onChange={(newValue) => {
                    setSelectedDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /> */}
                <TextField id="platform-id" label="Data Platform" variant="standard" />
                <TextField id="platform-id" label="Data Owner" variant="standard" />
                <TextField id="platform-id" label="Data Content" variant="standard" />
                <Button variant="contained">Validate</Button>
            </div>
        </div>
    </MainCard>
    )
};

export default DataCenter;
