// import createPersistedState from 'use-persisted-state';

import React from 'react';
import { toast, ToastContent, ToastOptions } from 'react-toastify';
import { css } from 'emotion';

import { isDevelopment, isStaging, notifyAutoClose as autoClose } from 'plugins/env';

export const debug = isDevelopment
  ? console.log
  : (...data: Array<any>) => { };

let count = 0;

export const debugToast = (
  content: ToastContent,
  options?: (ToastOptions | undefined) & {
    color?: string | undefined;
  },
): React.ReactText | null => {
  const backgroundColor: string = options?.color || 'brown';
  count++;
  return isDevelopment || isStaging
    ? (
      toast.info(
        `(${count}) ${content}`,
        {
          autoClose,
          className: css({ backgroundColor }),
          ...options,
        },
      )
    )
    : null;
};

export const DebugButton: React.FC<{
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  value?: string | undefined;
}> = ({ onClick, value }) => {
  return isDevelopment || isStaging
    ? <button onClick={onClick}>{value ? value : 'debug'}</button>
    : null;
};
