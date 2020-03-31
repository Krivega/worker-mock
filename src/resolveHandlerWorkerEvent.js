const wrapToMessageEvent = (data) => ({ data });

const resolveHandlerWorkerEvent = (handler) => (event) => {
  handler(wrapToMessageEvent(event));
};

module.exports = resolveHandlerWorkerEvent;
