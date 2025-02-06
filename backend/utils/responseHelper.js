// backend/utils/responseHelper.js
exports.successResponse = (res, statusCode, message, data = null) => {
    const response = {
      success: true,
      message
    };
  
    if (data) response.data = data;
    return res.status(statusCode).json(response);
  };
  
  exports.errorResponse = (res, statusCode, message, error = null) => {
    const response = {
      success: false,
      message
    };
  
    if (error && process.env.NODE_ENV === 'development') {
      response.error = error.message;
    }
  
    return res.status(statusCode).json(response);
  };