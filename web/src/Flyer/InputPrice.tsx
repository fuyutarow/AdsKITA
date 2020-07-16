import React, { useState, useEffect, useContext, useCallback } from 'react';
import NumberFormat from 'react-number-format';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
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
      suffix=" 円"
    />
  );
}

const FC: React.FC<TextFieldProps & {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  validation?: (price: number) => boolean | undefined;
  errorText?: string | undefined;
}> = (props) => {
  const { price, setPrice, validation, errorText } = props;
  const valid = validation && validation(price);
  const helperText = (!valid) && errorText;

  return (
    <TextField
      id="price"
      label="価格"
      name="numberformat"
      helperText={helperText}
      margin="normal"
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
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
