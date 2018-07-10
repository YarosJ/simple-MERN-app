const debugControllers = require('debug')('controllers');

/**
 * Checks the type of the received error
 * and sends the appropriate response
 * @param error
 * @param res
 * @param modelName
 */

export default (error, res, modelName) => {
  const message = error.message.toString();
  if (error.name === 'MongoError' && error.code === 11000) return res.status(409).json({ message: `This ${modelName} is already exist` });
  if (error.name === 'CastError') return res.status(404).json({ message: `This ${modelName} is not found` });
  if (message) {
    if (message.match(/validation failed:/)) return res.status(400).json({ message: message });
    if (message.match(/empty/)) return res.status(400).json({ message: 'Empty field is not allowed' });
    return res.status(500).json({ message: message });
  }
  debugControllers(error);
  return res.status(500).json({ message: 'Server error' });
};
