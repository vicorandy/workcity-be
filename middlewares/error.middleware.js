module.exports = (err, req, res, next) => {
    console.error(err); // For debugging, can be enhanced with a logger
  
    if (err.isJoi) {
      // Joi validation error
      return res.status(400).json({
        message: 'Validation failed',
        details: err.details.map((d) => d.message),
      });
    }
  
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  };
  