import styled from 'styled-components';
import { media } from 'utils';
import * as mixins from 'styles/mixins';

export const Screen = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
`;

export const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  padding-bottom: 55px; // TabToolbar height
  ${media.main} {
    padding-bottom: 0;
  }
`;

export const FullScreenContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 272px auto 0 auto;
  height: calc(100% - 80px);
  ${media.main} {
    height: calc(100% - 48px);
  }
`

export default Screen;
