const debugControllers = require('debug')('controllers');

/**
 * Checks the type of the received error
 * and sends the appropriate response
 * @param error
 * @param res
 * @param modelName
 */

export default (error, res, modelName) => {
  if (error.name === 'MongoError' && error.code === 11000) return res.status(409).json({ message: `This ${modelName} is already exist` });
  if (error.name === 'CastError') return res.status(404).json({ message: `This ${modelName} is not found` });
  if (error.message) return res.status(500).json({ message: error.message });
  debugControllers(error);
  return res.status(500).json({ message: 'Server error' });
};
