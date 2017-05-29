# Filesystem logger for Redux
Redux middleware for react-native that logs every action to the filesystem. In case of an emergency where data has not been synchronized with the server and the device is in a state that is incapable of making network requests, the data can be retrieved from the log file that has redux actions and their payload.  
   
## Installation
``` 
yarn add redux-fs-logger 
```
:exclamation: redux-fs-logger currently depends on react-native-fs >= 2.3.2 :exclamation:  
``` 
yarn add react-native-fs@2.3.2 && react-native link 
``` 
   
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
