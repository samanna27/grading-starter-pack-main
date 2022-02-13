import logo from 'assets/img/logo.svg';
import * as S from './header.styled';
import { changeType } from '../../../store/action';
import { useState, MouseEvent } from 'react';
import { ThunkAppDispatch } from '../../../types/action';
import { store } from '../../../index';
import { NAVIGATION_ITEMS } from 'const';
import styled, { css } from 'styled-components';

const NewLink = styled(S.Link)<{$isActiveLink: boolean}>`
  ${({ $isActiveLink }) =>
    $isActiveLink &&
    css`
      color: ${({ theme }) => theme.color.tangerine};
    `}
`;

const Header = ():JSX.Element => {
  const [isActiveItem, setIsActiveItem] = useState(NAVIGATION_ITEMS[0][0]);

  const handleNavigationItemClick = (evt: MouseEvent<HTMLDivElement>, item: string) => {
    evt.preventDefault();
    setIsActiveItem(item);

      if(item === NAVIGATION_ITEMS[0][0]) {
        (store.dispatch as ThunkAppDispatch)(changeType('Все квесты'));
    }
  };

  return (
  <S.StyledHeader>
    <S.HeaderWrapper>
      <S.Logo>
        <S.Image src={logo} alt="Логотип Escape Room" width="134" height="50" />
      </S.Logo>

      <S.Navigation>
        <S.Links>
          {NAVIGATION_ITEMS.map((item) => (
          <S.LinkItem key={item[0]} >
            <div
              onClick={(evt) => {
                handleNavigationItemClick(evt, item[0]);
              }}
              >
            <NewLink to={item[1]}
              $isActiveLink={item[0] === isActiveItem}
            >
              {item[0]}
            </NewLink>
              </div>
          </S.LinkItem>
          ))}

        </S.Links>
      </S.Navigation>
      <S.Phone href="tel:88003335599">8 (800) 333-55-99</S.Phone>
    </S.HeaderWrapper>
  </S.StyledHeader>
)};

export default Header;
