const resolveHandlerWorkerEvent = require('./resolveHandlerWorkerEvent');

const GENERAL_MESSAGE_EVENT = 'message';

const resolveWorkerForClient = (workerMock) => {
  const handlersMap = new Map();

  return {
    postMessage(message) {
      return workerMock.triggerWorkerEvent(GENERAL_MESSAGE_EVENT, message);
    },

    addEventListener(eventName, callback) {
      const handler = resolveHandlerWorkerEvent(callback);

      handlersMap.set(callback, handler);

      return workerMock.onPostMessageFromWorker(handler);
    },

    removeEventListener(eventName, callback) {
      const handler = handlersMap.get(callback);

      handlersMap.delete(callback);

      return workerMock.offPostMessageFromWorker(handler);
    },
  };
};

module.exports = resolveWorkerForClient;
