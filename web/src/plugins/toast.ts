import React from 'react';
import { toast, ToastContent, ToastOptions } from 'react-toastify';
import { css } from 'emotion';

import { isDevelopment, isStaging, notifyAutoClose as autoClose } from 'plugins/env';

export const toastNotice = (
  content: ToastContent,
  options?: (ToastOptions | undefined) & {
    color?: string | undefined;
  },
): React.ReactText | null => {
  const backgroundColor: string = options?.color || 'brown';
  return (
    toast.info(
      content,
      {
        autoClose,
        className: css({ backgroundColor }),
        ...options,
      },
    )
  );
};
