export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }

  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const hasTimeConflict = (
  existingSlots: {
    startDate: string;
    endDate: string;
    dayOfWeek: string;
  }[],
  newSlot: {
    startDate: string;
    endDate: string;
    dayOfWeek: string;
  }
) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startDate}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endDate}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startDate}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endDate}:00`);

    // existing: 12:30 - 13:30
    // new     : 13:00 - 14:00

    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
