import React from 'react';
import { Box, IconButton, Input, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

interface ColorInputProps {
  colorValue: string;
  setIsColorPicker: Function;
}

const ColorInput: React.FC<ColorInputProps> = ({ colorValue, setIsColorPicker }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        my: '1rem',
        ml: '2rem',
      }}
    >
      <Input id="habitColor" name="habitColor" type="text" value={colorValue} style={{ display: 'none' }} />
      <IconButton onClick={() => setIsColorPicker(true)}>
        <CircleIcon sx={{ color: colorValue, fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default ColorInput;
