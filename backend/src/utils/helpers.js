// General utility/helper functions
export const formatResponse = (status, data, message = '') => {
  return {
    status,
    message,
    data,
  };
};
