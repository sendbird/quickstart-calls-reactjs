import { css } from 'styled-components';

import { colors } from 'utils/variables';

/** Fonts */
export const title = css`
  height: 32px;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.25px;
  color: inherit;
`;

export const common = css`
  font-family: "Avenir Next";
  font-style: normal;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const small = css`
  ${common};
  font-size: 12px;
  line-height: normal;
`;

export const normal = css`
  ${common};
  font-size: 14px;
  line-height: 1.43;
`;
export const midBig = css`
  ${common};
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: -0.25px;
`;

export const big = css`
  height: 32px;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.25px;
`;

export const heavy = css`
  font-weight: 500;
`;

export const demi = css`
  font-weight: 600;
`;

export const heading4text1 = css`
  ${common};
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: -0.25px;
`

export const heading2text1 = css`
  ${common};
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: -0.15px;
`
