import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  useFetchHabits,
  useMarkDayAsCompleted,
  useUnmarkDayAsCompleted,
  useUpdateTargetDays,
} from '../../../../hooks/habitApiHooks';
import { containsDate } from '../../../../utils/dateUtils';
import DisabledEmptyIcon from './DisabledEmptyIcon';
import FutureDefaultTargetIcon from './FutureDefaultTargetIcon';
import DisabledTargetIcon from './DisabledTargetIcon';
import DisabledCheckedIcon from './DisabledCheckedIcon';
import ActiveCheckedIcon from './ActiveCheckedIcon';
import ActiveTargetIcon from './ActiveTargetIcon';
import ActiveEmptyIcon from './ActiveEmptyIcon';
import {
  isCurrentChecked,
  isCurrentTarget,
  isFutureDefaultTarget,
  isPastChecked,
  isPastOrFutureTarget,
  isPastOrFutureUnchecked,
} from '../../../../helpers/dailyHabitIconsConditions';

export interface DailyHabitIconsProps {
  id: string;
  targetDays: Date[];
  targetDaysDefault: number[];
  completedDays: Date[];
  weekDates: Date[];
  setFetchedHabits: Function;
}

const DailyHabitIcons: React.FC<DailyHabitIconsProps> = ({
  id,
  targetDays,
  targetDaysDefault,
  completedDays,
  weekDates,
  setFetchedHabits,
}) => {
  const today = new Date();
  const oneWeekFromToday = new Date();
  oneWeekFromToday.setDate(today.getDate() - 7);

  const [dragOrigin, setDragOrigin] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const { habits: Habits, error: Error, loading: Loading, fetchHabits: fetchHabits } = useFetchHabits();
  const { data: markDayData, markDayAsCompleted: markDayAsCompleted } = useMarkDayAsCompleted();
  const { data: unmarkDayData, unmarkDayAsCompleted: unmarkDayAsCompleted } = useUnmarkDayAsCompleted();
  const { data: updateTargetData, updateTargetDays: updateTargetDays } = useUpdateTargetDays();

  React.useEffect(() => {
    fetchHabits(weekDates[0], weekDates[6]);
  }, [markDayData, unmarkDayData, updateTargetData]);

  React.useEffect(() => {
    if (Habits) {
      setFetchedHabits(Habits);
    }
  }, [Habits]);

  const handleDragStart = (index: number) => {
    setDragOrigin(id);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDragOrigin(null);
    setDraggedIndex(null);
  };

  const handleDrop = async (event: React.DragEvent<HTMLButtonElement>, dateToAdd: Date) => {
    event.preventDefault();
    if (dragOrigin !== id) {
      return;
    }

    if (draggedIndex !== null && !containsDate(targetDays, dateToAdd)) {
      updateTargetDays(weekDates[draggedIndex], dateToAdd, id);
    }

    setDragOrigin(null);
    setDraggedIndex(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      {weekDates.map((date, index) => {
        if (isPastChecked(date, completedDays)) {
          return <DisabledCheckedIcon key={index} index={index} date={date} handleDrop={handleDrop} />;
        } else if (isFutureDefaultTarget(index, weekDates, targetDaysDefault)) {
          return <FutureDefaultTargetIcon key={index} index={index} />;
        } else if (isPastOrFutureTarget(date, targetDays)) {
          return (
            <DisabledTargetIcon
              key={index}
              index={index}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          );
        } else if (isPastOrFutureUnchecked(date)) {
          return <DisabledEmptyIcon key={index} index={index} date={date} handleDrop={handleDrop} />;
        } else if (isCurrentChecked(date, completedDays)) {
          return (
            <ActiveCheckedIcon
              key={index}
              index={index}
              date={date}
              id={id}
              handleDrop={handleDrop}
              unmarkDayAsCompleted={unmarkDayAsCompleted}
            />
          );
        } else if (isCurrentTarget(date, targetDays)) {
          return (
            <ActiveTargetIcon
              key={index}
              index={index}
              date={date}
              id={id}
              handleDragEnd={handleDragEnd}
              handleDragStart={handleDragStart}
              markDayAsCompleted={markDayAsCompleted}
            />
          );
        } else {
          return (
            <ActiveEmptyIcon
              key={index}
              index={index}
              date={date}
              id={id}
              handleDrop={handleDrop}
              markDayAsCompleted={markDayAsCompleted}
            />
          );
        }
      })}
    </Box>
  );
};

export default DailyHabitIcons;
