import { useState } from 'react';
import styled from 'styled-components';

import * as fonts from 'styles/fonts';

const Input = styled.input`
  ${fonts.normal};
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: solid 1px var(--navy-200);
  padding: 10px 16px;
  border-radius: 4px;
  background-color: var(--white);
`;


interface useInputType extends React.InputHTMLAttributes<HTMLInputElement> {
  initValue?: any;
}

export const useInput = ({ initValue, ...props }: useInputType) => {
  const [value, setValue] = useState(initValue || '');
  let input;
  if (Input) {
    input = <Input value={value} onChange={e => setValue(e.target.value)} {...props} />;
  } else {
    input = <input value={value} onChange={e => setValue(e.target.value)} {...props} />;
  }
  return [value, input, setValue];
};
export const useTextInput = (options: Parameters<typeof useInput>[0]) => useInput({ type: 'text', ...options });

export default Input;
