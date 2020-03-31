const resolveHandlerWorkerEvent = require('./resolveHandlerWorkerEvent');

const GENERAL_MESSAGE_EVENT = 'message';

const resolveWorkerForClient = (workerMock) => ({
  postMessage(message) {
    return workerMock.triggerWorkerEvent(GENERAL_MESSAGE_EVENT, message);
  },

  addEventListener(eventName, callback) {
    return workerMock.onPostMessageFromWorker(resolveHandlerWorkerEvent(callback));
  },
});

module.exports = resolveWorkerForClient;
