import React from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { InputValuesFormat, TargetDay } from '../../../types/inputTypes';
import { daysOfWeekLong } from '../../../utils/dateUtils';

interface TargetDaysInputProps {
  targetDaysValue: TargetDay;
  setInputValues: Function;
}

const TargetDaysInput: React.FC<TargetDaysInputProps> = ({ targetDaysValue, setInputValues }) => {
  const handleTargetDaysInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dayIndex = Number(event.target.name);
    setInputValues((prevState: InputValuesFormat) => ({
      ...prevState,
      targetDaysValue: {
        ...prevState.targetDaysValue,
        [dayIndex]: event.target.checked,
      },
    }));
  };

  return (
    <Box sx={{}}>
      <Typography variant="h1" sx={{ fontSize: '2rem', mb: '2rem' }}>
        I am planning to do it on
      </Typography>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup sx={{ flexDirection: 'row' }}>
          {daysOfWeekLong.map((day, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox checked={targetDaysValue[index]} onChange={handleTargetDaysInput} name={index.toString()} />
              }
              label={day}
              labelPlacement="top"
            />
          ))}
        </FormGroup>
      </FormControl>
      <Typography variant="h1" sx={{ fontSize: '2rem', mb: '2rem' }}>
        But I can move it around at any time to suit my schedule.
      </Typography>
    </Box>
  );
};

export default TargetDaysInput;
