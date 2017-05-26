export const fsLogger = store => next => action => {
  console.warn("ACTION", action);
  next(action);
}