import { Fragment, MouseEvent, ReactNode } from 'react';
import { useToggle } from 'react-use';
import styled from 'styled-components';

import Button from 'components/atoms/Button';
import * as fonts from 'styles/fonts';
import { useOnClickOutside } from 'utils/hooks';

const ItemWrapper = styled(Button)`
  ${fonts.normal};
  ${fonts.heavy};
  width: 100%;
  min-height: 32px;
  display: block;
  box-sizing: border-box;
  text-align: left;
  justify-content: flex-start;
  padding: 0 16px;

  &:not([disabled]):hover {
    background-color: var(--navy-50);
  }
  
  &:disabled {
    cursor: default;
  }
`;

export type TMenuItem = {
  label: string;
  element?: ReactNode;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

type MenuItemProps = {
  item: TMenuItem;
  toggleOpened: () => void;
};

const MenuItem = ({
  item: {
    label,
    element,
    handleClick = () => {},
    disabled = false,
  }, toggleOpened
}: MenuItemProps) => (
  <ItemWrapper type="button" onClick={(e) => {
    toggleOpened();
    handleClick(e)
  }} disabled={disabled}>
    {element || label}
  </ItemWrapper>
);

const MenuItems = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  padding: 8px 0;
  width: 200px;
  border-radius: 4px;
  box-shadow: 0 3px 5px -3px rgba(33, 34, 66, 0.04), 0 3px 14px 2px rgba(33, 34, 66, 0.08), 0 8px 10px 1px rgba(33, 34, 66, 0.12);
  background-color: var(--white);
  z-index: 100;
`;

const Wrapper = styled.div`
  position: relative;
`;

type MenuProps = {
  items: TMenuItem[];
  Dropdown: React.FC<any>; // TODO: Remove any
  Divider?: React.FC;
  disabled?: boolean;
};

const Menu = ({ items, Dropdown, Divider, disabled }: MenuProps) => {
  const [opened, toggleOpened] = useToggle(false);
  const ref = useOnClickOutside(() => toggleOpened(false));

  return (
    <Wrapper ref={ref}>
      <Dropdown onClick={() => { if (!disabled) toggleOpened(); }} />
      {opened && (
      <MenuItems>
        {items.map((item, i) => (
          <Fragment key={item.label}>
            <MenuItem item={item} toggleOpened={toggleOpened} />
            {
              Divider && i < items.length - 1
              && <Divider />
            }
          </Fragment>
        ))}
      </MenuItems>
      )}
    </Wrapper>
  );
};

export default Menu;
