import React, { useState, useEffect, useContext, useCallback } from 'react';
import NumberFormat from 'react-number-format';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

// 高階関数にしても再描画されてしまい入力中にフォーカスが外れる
const NumberFormatCustom円 = (
  props: NumberFormatCustomProps,
) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            // value: values.value,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix='円'
    />
  );
};

const NumberFormatCustom日 = (
  props: NumberFormatCustomProps,
) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix='日'
    />
  );
};

const FC: React.FC<TextFieldProps & {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  validation?: (price: number) => boolean | undefined;
  errorText?: string | undefined;
  suffix?: string | undefined;
}> = (props) => {
  const { price, setPrice, validation, errorText, suffix = '円' } = props;
  const valid = validation && validation(price);
  const helperText = (!valid) && errorText;

  const formatter =
    suffix === '円' ? NumberFormatCustom円
      : suffix === '日' ? NumberFormatCustom日
        : null;

  return (
    <TextField
      label="価格"
      name="numberformat"
      helperText={helperText}
      margin="normal"
      InputProps={formatter
        ? {
          inputComponent: formatter as any,
        }
        : undefined
      }
      value={price}
      error={(!valid)}
      onChange={e => {
        setPrice(Number(e.target.value));
      }}
      {...props}
    />
  );
};

export default FC;
