import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [Selection, setSelection] = React.useState('');

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Outpass for</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Selection}
          label="Outpass for"
          onChange={handleChange}
        >
          <MenuItem value={1}>Staying in hostel</MenuItem>
          <MenuItem value={2}>going to Competition</MenuItem>
          <MenuItem value={3}>Going to Home</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
