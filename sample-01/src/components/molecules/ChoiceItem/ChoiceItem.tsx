import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as fonts from 'styles/fonts';

export type ChoiceProp = {
  to: string;
  title: string;
  desc: string;
  icon?: string;
}

const ChoiceItemWrapper = styled.div<{ hasIcon: boolean }>`
  display: inline-block;
  width: 260px;
  padding: 24px;
  height: ${props => props.hasIcon ? '180px' : '140px'};
  border-radius: 4px;
  border: solid 1px #dee2f2;
  background-color: var(--white);
  cursor: pointer;
  &:hover {
    border: solid 1px var(--purple-300);
  }
`;

const ChoiceItem: React.FC<{ to: string; choice: ChoiceProp; }> & {
  Icon: React.FC<{ src: string }>;
  Title: React.FC;
  Description: React.FC;
} = ({ to, children, choice }) => {
  const { title, desc, icon } = choice;

  return (
    <Link to={to}>
      <ChoiceItemWrapper hasIcon={!!icon}>
        {icon && <ChoiceItem.Icon src={icon}></ChoiceItem.Icon>}
        <ChoiceItem.Title>
          {title}
        </ChoiceItem.Title>
        <ChoiceItem.Description>
          {desc}
        </ChoiceItem.Description>
      </ChoiceItemWrapper>
    </Link>
  );
}

ChoiceItem.Icon = styled.div<{ src: string; }>`
  width: 24px;
  height: 24px;
  margin-bottom: 16px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center; 
`;

ChoiceItem.Title = styled.div`
  margin-bottom: 8px;
  width: 88px;
  height: 24px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: -0.25px;
  color: var(--navy-900);
`;

ChoiceItem.Description = styled.div`
  ${fonts.normal};
  width: 212px;
  height: 60px;
  letter-spacing: -0.1px;
  color: var(--navy-600);
`;

export default ChoiceItem;
