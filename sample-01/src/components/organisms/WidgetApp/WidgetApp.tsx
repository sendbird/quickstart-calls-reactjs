import styled from 'styled-components';

const Wrapper = styled.div`
  width: 376px;
  border: none;
  height: 592px;
  overflow: hidden;
  position: inherit;
  box-shadow: 0 9px 15px -7px rgba(33, 34, 66, 0.04), 0 9px 46px 8px rgba(33, 34, 66, 0.08), 0 24px 38px 3px rgba(33, 34, 66, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
`;

interface WidgetAppProps {}
const WidgetApp: React.FC<WidgetAppProps> = ({ children }) => (
  <div>
    <Wrapper>
      {children}
    </Wrapper>
  </div>
);

export default WidgetApp;
