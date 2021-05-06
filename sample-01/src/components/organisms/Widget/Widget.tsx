import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { useToggle } from 'react-use';
import styled from 'styled-components';

import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';

const VisibleDiv: React.FC<{ visible: boolean, style?: CSSProperties, onClick?: () => void; }> = ({
  style = { },
  visible,
  ...props
}) => (
  <div
    {...props}
    style={{
      ...style,
      visibility: visible ? 'visible' : 'hidden',
      ...(visible ? {} : { maxWidth: 0, maxHeight: 0 }),
    }}
  />
);

const Wrapper = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

const TooltipWrapper = styled(VisibleDiv)`
  ${mixins.flexColumn};
  ${mixins.flexCenter};
  ${mixins.bgWhite};
  position: absolute;
  right: 18px;
  bottom: 112px;
  width: 296px;
  height: 108px;
  border-radius: 4px;
  box-shadow: 0 3px 5px -3px rgba(33, 34, 66, 0.04), 0 3px 14px 2px rgba(33, 34, 66, 0.08), 0 8px 10px 1px rgba(33, 34, 66, 0.12);
  border: solid 1px var(--navy-200);
`;

const Description = styled.label`
  ${fonts.normal};
  width: 100%;
  height: 20px;
  text-align: center;
  letter-spacing: -0.1px;
  color: var(--navy-600);
  margin-bottom: 24px;
`;

const TooltipTailDown = styled.img`
  position: absolute;
  right: 16px;
  bottom: -8px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 8px solid white;
`;

const SmileFace = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  width: 40px;
  height: 40px;
  font-family: AppleColorEmoji;
  font-size: 40px;
  line-height: 1;
  color: var(--white);
`;

const Tooltip: React.FC<{open: boolean}> = ({ open }) => (
  <TooltipWrapper visible={open}>
    <SmileFace>
      😀
    </SmileFace>
    <Description>
      To try Calls widget, please click the icon
    </Description>
    <TooltipTailDown
      src="/icons/img-tooltip-tail-down.svg"
      alt="tooltip-tail-down"
    />
  </TooltipWrapper>
);

const WidgetIcon = styled(VisibleDiv)`
  width: 48px;
  cursor: pointer;
  height: 48px;
  box-shadow: 0 5px 8px -4px rgba(33, 34, 66, 0.04), 0 5px 22px 4px rgba(33, 34, 66, 0.08), 0 12px 17px 2px rgba(33, 34, 66, 0.12);
  border-radius: 24px;
  margin-bottom: 32px;
  background-color: #825eeb;
  background-image: url(/icons/ic-call-white.svg);
  background-repeat: no-repeat;
  background-position: center;
`;

interface WidgetProps {
}

const Widget: React.FC<WidgetProps> = ({ children }) => {
  const [open, toggleOpen] = useToggle(true);
  useEffect(() => {
    const iframe = document.getElementById('widget-frame') as HTMLIFrameElement | null;
    if (!iframe) return;
    iframe.onload = () => {
      console.log('onload iframe');
      const win = iframe.contentWindow as Window;
      const doc = win.document;
      const registerHandler = () => {
        const closeBtn = doc.getElementById('widget-close-btn');
        if (!closeBtn) return;
        closeBtn.onclick = () => {
          toggleOpen();
        };
      };

      registerHandler();
    };
  }, []);

  return (
    <>
      <Tooltip open={!open} />
      <Wrapper>
        <WidgetIcon onClick={toggleOpen} visible={!open} />
        <VisibleDiv visible={open}>
          {children}
        </VisibleDiv>
      </Wrapper>
    </>
  );
};

export default Widget;
