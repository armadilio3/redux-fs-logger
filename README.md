# Filesystem logger for Redux
Redux middleware that logs every action to the filesystem. In case of an emergency where data has not been synchronized with the server and the device is in a state that is incapable of making network requests, the data can be retrieved from the log file that has redux actions and their payload.
## Usage
```javascript
import { applyMiddleware, createStore } from 'redux';

// Logger with default options
import { fsLogger } from 'redux-fs-logger'

const store = createStore(
  reducer,
  applyMiddleware(fsLogger)
)
```
