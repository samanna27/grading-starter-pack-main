import * as S from './booking-modal.styled';
import { ReactComponent as IconClose } from 'assets/img/icon-close.svg';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../../../types/state';
import { useParams, useHistory } from 'react-router-dom';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { store } from '../../../../index';
import {fetchPostOrderAction } from '../../../../store/api-actions';
import {ThunkAppDispatch} from '../../../../types/action';
import { Dispatch, SetStateAction } from 'react';

type BookingModalProps = {
  setIsBookingModalOpened: Dispatch<SetStateAction<boolean>>,
}

type BookingModalRouteParams = {
  id: string
}

const mapStateToProps = ({currentQuest}: State) => ({
  currentQuest,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & BookingModalProps;

const BookingModal = ({currentQuest, setIsBookingModalOpened}: ConnectedComponentProps):JSX.Element => {
  const params = useParams<BookingModalRouteParams>();
  const questId = params.id;
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const peopleRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [people, setPeople] = useState<number>(0);

  const handleNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handlePhoneInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPhone(evt.currentTarget.value);

      if (evt.currentTarget.value.length !== 10 ) {
        evt.currentTarget.setCustomValidity('Телефон должен содержать ровно 10 знаков!');
      } else {
        evt.currentTarget.setCustomValidity('');
      }

      evt.currentTarget.reportValidity();
  };

  const handlePeopleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPeople(+evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    (store.dispatch as ThunkAppDispatch)(fetchPostOrderAction(
      { name: name,
        peopleCount: people,
        phone: phone,
        isLegal: true
      }));

      history.push(`/quests/${questId}`);
  };

  const onCloseBtnClick = () => {
    setIsBookingModalOpened(false);
  };

  return (
    <S.BlockLayer>
      <S.Modal>
        <S.ModalCloseBtn onClick={onCloseBtnClick}>
          <IconClose width="16" height="16" />
          <S.ModalCloseLabel>Закрыть окно</S.ModalCloseLabel>
        </S.ModalCloseBtn>
        <S.ModalTitle>Оставить заявку</S.ModalTitle>
        <S.BookingForm
          action="https://echo.htmlacademy.ru"
          method="post"
          id="booking-form"
          onSubmit={handleSubmit}
        >
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-name">Ваше Имя</S.BookingLabel>
            <S.BookingInput
              ref={nameRef}
              type="text"
              id="booking-name"
              name="booking-name"
              placeholder="Имя"
              required
              onChange={handleNameInputChange}
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-phone">
              Контактный телефон
            </S.BookingLabel>
            <S.BookingInput
              ref={phoneRef}
              type="tel"
              id="booking-phone"
              name="booking-phone"
              placeholder="Телефон"
              required
              onChange={handlePhoneInputChange}
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-people">
              Количество участников
            </S.BookingLabel>
            <S.BookingInput
              ref={peopleRef}
              type="number"
              id="booking-people"
              name="booking-people"
              placeholder="Количество участников"
              required
              onChange={handlePeopleInputChange}
            />
          </S.BookingField>
              <S.BookingSubmit type="submit">Отправить заявку</S.BookingSubmit>
          <S.BookingCheckboxWrapper>
            <S.BookingCheckboxInput
              type="checkbox"
              id="booking-legal"
              name="booking-legal"
              required
            />
            <S.BookingCheckboxLabel
              className="checkbox-label"
              htmlFor="booking-legal"
            >
              <S.BookingCheckboxText>
                Я согласен с{' '}
                <S.BookingLegalLink href="#">
                  правилами обработки персональных данных и пользовательским
                  соглашением
                </S.BookingLegalLink>
              </S.BookingCheckboxText>
            </S.BookingCheckboxLabel>
          </S.BookingCheckboxWrapper>
        </S.BookingForm>
      </S.Modal>
    </S.BlockLayer>
  );
}

export {BookingModal};
export default connector(BookingModal);
