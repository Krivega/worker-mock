const resolveHandlerWorkerEvent = require('./resolveHandlerWorkerEvent');

const GENERAL_MESSAGE_EVENT = 'message';

const resolveWorkerForClient = (workerMock) => {
  let handlerWorkerEvent;

  return {
    postMessage(message) {
      return workerMock.triggerWorkerEvent(GENERAL_MESSAGE_EVENT, message);
    },

    addEventListener(eventName, callback) {
      const handler = resolveHandlerWorkerEvent(callback);

      handlerWorkerEvent = handler;

      return workerMock.onPostMessageFromWorker(resolveHandlerWorkerEvent(callback));
    },

    removeEventListener(eventName, callback) {
      return workerMock.offPostMessageFromWorker(handlerWorkerEvent);
    },
  };
};

module.exports = resolveWorkerForClient;
