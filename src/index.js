const WorkerMock = require('./WorkerMock');
const resolveWorkerForClient = require('./resolveWorkerForClient');

const createWorkerMock = () => new WorkerMock();

module.exports = { createWorkerMock, resolveWorkerForClient, WorkerMock };
