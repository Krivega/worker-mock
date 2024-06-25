const resolveHandlerWorkerEvent = require('./resolveHandlerWorkerEvent');

class WorkerMock {
  constructor() {
    this.postMessagesHandlers = [];

    this.addEventListenerHandlers = {};
  }

  /**
   * onmessage on client
   *
   * @param {function} handler - event handler function
   *
   * @return {undefined} returns undefined
   */
  onPostMessageFromWorker(handler) {
    this.postMessagesHandlers.push(handler);
  }

  /**
   * offmessage on client
   *
   * @param {function} handler - event handler function
   *
   * @return {undefined} returns undefined
   */
  offPostMessageFromWorker(handler) {
    this.postMessagesHandlers = this.postMessagesHandlers.filter((savedHandler) => {
      return savedHandler !== handler;
    });
  }

  /**
   * postMessage from client
   *
   * @param {string} eventName - event name
   * @param {object} data      - object with data
   *
   * @return {undefined} returns undefined
   */
  triggerWorkerEvent(eventName, data) {
    this.addEventListenerHandlers[eventName].forEach((handler) => handler(data));
  }

  /**
   * worker method
   *
   * @param {string} message - message
   *
   * @return {undefined} returns undefined
   */
  postMessage(message) {
    this.postMessagesHandlers.forEach((handler) => handler(message));
  }

  /**
   * worker method
   *
   * @param {string}   eventName - event name
   * @param {function} handler   - event handler function
   *
   * @return {undefined} returns undefined
   */
  addEventListener(eventName, handler) {
    const handlers = this.addEventListenerHandlers[eventName] || [];

    this.addEventListenerHandlers[eventName] = handlers;

    handlers.push(resolveHandlerWorkerEvent(handler));
  }

  /**
   * worker method
   *
   * @param {string}   eventName - event name
   * @param {function} handler   - event handler function
   *
   * @return {undefined} returns undefined
   */
  removeEventListener(eventName, handler) {
    const handlers = this.addEventListenerHandlers[eventName] || [];

    const filteredHandlers = handlers.filter((savedHandler) => {
      return savedHandler !== handler;
    });

    this.addEventListenerHandlers[eventName] = filteredHandlers;
  }
}

module.exports = WorkerMock;
