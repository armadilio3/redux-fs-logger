import RNFS from 'react-native-fs';
import _ from "lodash"

import {
  Platform,
} from 'react-native'

const DEFAULT_PATH = Platform.OS == "ios" ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
const DEFAULT_FILE_NAME = "redux-fs-log.txt"

export const fsLogger = store => next => action => {
  storeAction(action);
  next(action);
}

function getDirectoryContents(path = DEFAULT_PATH) {

  return new Promise((resolve, reject) => {
    RNFS.readDir(path)
      .then((result) => {
        resolve(result);
        //Stat the first file
        return result;
      })
      .catch((err) => {
        reject(err);
        console.warn(err.message, err.code);
      });
  })

}

function getLogFile(contents, name = DEFAULT_FILE_NAME) {

  if (!contents) {
    return null;
  }

  var log_file = null;
  _.each(contents, (value) => {
    if (value.name == name) {
      log_file = value;
      return false;
    }
  })

  return log_file;

}

function createLogFile(path = DEFAULT_PATH, name = DEFAULT_FILE_NAME) {
  var file_path = path + '/' + name;
  //Write the file
  return RNFS.writeFile(file_path, `[REDUX-FS-LOGS][START][${new Date()}]\n`, 'utf8')
    .then((success) => {
      //File written succesfully
      return getLogFile();

    })
    .catch((err) => {
      //Something went wrong
      console.warn(err.message);
      return { status }
    });
}

async function appendContent(path, contents) {

  try {
    await RNFS.appendFile(path, contents);
  } catch (e) {
    console.warn(e);
  }

}

async function storeAction(action) {

  //Load the documents directory contents
  var contents = await getDirectoryContents();
  //Look for the log file
  var log_file = getLogFile(contents);

  //If log file does not exist we create a new one
  if (!log_file) {
    //Create the file
    try {
      //Attempt to ctreate a log file
      await createLogFile();
      //Get the newly created log file
      contents = await getDirectoryContents();
      log_file = getLogFile(contents);
    } catch (e) {
      console.warn(e);
      return e;
    }
  }
  //If we have the file then we try to write the logs
  if (log_file && log_file.path) {
    appendContent(log_file.path, `[${new Date()}][` + JSON.stringify(action) + `]\n`);
  } else {
    console.warn("COULD NOT LOAD LOG FILE!")
  }

}