
import { functions } from 'plugins/firebase';
import { ok, err, Result } from 'neverthrow';

export const wrapResult = <T>(r: firebase.functions.HttpsCallableResult) => {
  const result: Result<T, Error> = r.data.type === 'ok'
    ? ok(r.data.value)
    : err(r.data.error);
  return result;
};

export const wrapThrow = <T>(r: firebase.functions.HttpsCallableResult) => {
  if (r.data.type === 'ok') {
    return r.data.value;
  } else {
    throw r.data.error;
  }
};
