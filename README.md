# worker-mock

[![npm](https://img.shields.io/npm/v/worker-mock?style=flat-square)](https://www.npmjs.com/package/worker-mock)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/worker-mock?style=flat-square)

Class for emitting events

## Install

npm

```sh
npm install worker-mock
```

yarn

```sh
yarn add worker-mock
```

## Usage

```js
import { createWorkerMock, resolveWorkerForClient } from 'worker-mock';

const workerMock = createWorkerMock();

workerMock.addEventListener('message', (e) => {
  console.log('Message received from client script: ', e);

  workerMock.postMessage('Hello from worker!');
});

const workerMockForClient = resolveWorkerForClient(workerMock);

workerMockForClient.addEventListener('message', (e) => {
  console.log('Message received from worker script: ', e);
});

workerMockForClient.postMessage('Hello from client!');
// Message received from client script: Hello from client!
// Message received from client script: Hello from worker!

// and some helpers
workerMock.triggerWorkerEvent('message', 'some data'); // trigger for inner message in worker

workerMock.onPostMessageFromWorker(() => {
  // called after postMessage in worker
});
```

## Maintainer

👤 **Krivega Dmitriy**

- Website: https://krivega.com
- Github: [@Krivega](https://github.com/Krivega)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Krivega/worker-mock/issues). You can also take a look at the [contributing guide](https://github.com/Krivega/worker-mock/blob/master/CONTRIBUTING.md).

## 📝 License

Copyright © 2020 [Krivega Dmitriy](https://github.com/Krivega).<br />
This project is [MIT](https://github.com/Krivega/worker-mock/blob/master/LICENSE) licensed.
