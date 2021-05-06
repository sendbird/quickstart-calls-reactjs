import { ChoiceProp } from 'components/molecules/ChoiceItem/ChoiceItem';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useRouteMatch } from 'react-router-dom';

import ChoiceItem from 'components/molecules/ChoiceItem';
import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';
import { media } from 'utils';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 198px;
  ${mixins.flexCenter};
  ${mixins.bgWhite};
`;

const Title = styled.div<{ hasBack?: boolean; }>`
  margin-top: ${props => props.hasBack ? 'calc(256px - 198px - 20px)' : 'calc(256px - 198px)'} ;
  ${fonts.title};
  ${fonts.demi};
  text-align: center;
`;

const Description = styled.div`
  ${fonts.normal};
  height: 20px;
  font-weight: 500;
  letter-spacing: -0.1px;
  color: var(--navy-600);
  margin-top: 8px;
`;

const Layout = styled.div`
  ${mixins.flexColumn};
  ${mixins.flexCenter};
`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  & > a:last-child {
    margin-right: 0;
  }
  
  & > a {
    margin-right: 24px;
    margin-bottom: 24px;
  }
  
  ${media.tablet} {
    flex-direction: row;
    & > a {
      margin-bottom: 0;
    }
  }
`;


const BackWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  ${fonts.normal};
  color: var(--purple-300);
  ${fonts.demi};
  cursor: pointer;
`
const BackIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  background-image: url(/icons/ic-arrow-left.svg);
`
const Back = () => {
  const history = useHistory();
  return (
    <BackWrapper onClick={() => { history.goBack() }}>
      <BackIcon />Back
    </BackWrapper>
  )
}

const ChoicesTemp: React.FC<{
  title: string;
  desc: string;
  choices: ChoiceProp[];
  hasBack?: boolean;
}> = ({
  title,
  desc,
  choices,
  hasBack,
}) => {
  const { url } = useRouteMatch();
  const matchRelativeUrl = url[url.length - 1] === '/' ? url.substr(0, url.length - 1) : url;

  return (
    <Wrapper>
      <Layout>
        {hasBack && <Back />}
        <Title hasBack={hasBack}>{title}</Title>
        <Description>{desc}</Description>
        <Choices>
          {choices.map((choice) => (
            <ChoiceItem to={`${matchRelativeUrl}/${choice.to}`} choice={choice} key={choice.to}>
            </ChoiceItem>
          ))}
        </Choices>
      </Layout>

    </Wrapper>
  );
}

export default ChoicesTemp;
