export const getDevices = () => {
  // ...
};

export const getMeetingRooms = (searchTerm) => {
  if (searchTerm) {
    return Promise.resolve([{
      id: 'L123',
      title: 'L123',
    }]);
  }

  return Promise.resolve([]);
};
