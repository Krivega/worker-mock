const resolveHandlerWorkerEvent = require('./resolveHandlerWorkerEvent');

const GENERAL_MESSAGE_EVENT = 'message';

const resolveWorkerForClient = (workerMock) => {
  const handlersMapWorkerEvent = new Map();

  return {
    postMessage(message) {
      return workerMock.triggerWorkerEvent(GENERAL_MESSAGE_EVENT, message);
    },

    addEventListener(eventName, callback) {
      const handler = resolveHandlerWorkerEvent(callback);

      handlersMapWorkerEvent.set(callback, handler);

      return workerMock.onPostMessageFromWorker(resolveHandlerWorkerEvent(callback));
    },

    removeEventListener(eventName, callback) {
      return workerMock.offPostMessageFromWorker(handlersMapWorkerEvent.get(callback));
    },
  };
};

module.exports = resolveWorkerForClient;
