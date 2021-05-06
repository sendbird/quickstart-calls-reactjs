import styled from 'styled-components';
import ReactModal from 'react-modal';
import Button from 'components/atoms/Button';
import { demi, heading4text1, heavy, normal } from 'styles/fonts';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(33, 34, 66, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
  },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  //height: 458px;
  padding: 18px 24px 22px 24px;
  border-radius: 4px;
  box-shadow: 0 6px 10px -5px rgba(33, 34, 66, 0.04), 0 6px 30px 5px rgba(33, 34, 66, 0.08), 0 16px 24px 2px rgba(33, 34, 66, 0.12);
  background-color: var(--white);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 18px;
`;

const Title = styled.div`
  ${heading4text1};
  ${demi};
  color: var(--navy-900);
`;

const Close = styled.div`
  width: 32px;
  height: 32px;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
`;

const ICClose = styled.div`
  width: 20px;
  height: 20px;
  padding: 4px;
  background-image: url(/icons/ic-close.svg);
`;

const Content = styled.div`

`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`

const CancelButton = styled(Button)`
  ${normal};
  ${demi};
  color: var(--navy-600);
  border-radius: 4px;
  border: solid 1px var(--navy-200);
  margin-right: 8px;
`;

const ConfirmButton = styled(Button)`
  ${normal};
  ${demi};
`;

ReactModal.setAppElement('#root');
const Modal = (
  props: ReactModal.Props & {
    close: () => void;
    title: string;
    content: React.ReactElement;
    footer: { cancel?: { label: string; }, confirm?: { label: string; onClick: any } };
  }
) => {
  const { cancel, confirm } = props.footer;
  return (
    <ReactModal
      style={customStyles}
      shouldCloseOnOverlayClick
      onRequestClose={() => props.close()}
      {...props}
    >
      <Wrapper>
        <Header>
          <Title>{props.title}</Title>
          <Close onClick={() => props.close()}><ICClose/></Close>
        </Header>
        <Content>
          {props.content}
        </Content>
        <Footer>
          {cancel &&
            <CancelButton size="mid" onClick={props.close}>
              {cancel.label}
            </CancelButton>
          }
          {confirm &&
            <ConfirmButton primary size="mid" onClick={confirm.onClick}>
              {confirm.label}
            </ConfirmButton>
          }
        </Footer>
      </Wrapper>
    </ReactModal>
  )
}

export default Modal;
