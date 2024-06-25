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

      return workerMock.onPostMessageFromWorker(resolveHandlerWorkerEvent(callback));
    },

    removeEventListener(eventName, callback) {
      return workerMock.offPostMessageFromWorker(handlersMap.get(callback));
    },
  };
};

module.exports = resolveWorkerForClient;
