import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../components/common/common';
import { ReactComponent as IconClock } from 'assets/img/icon-clock.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './detailed-quest.styled';
import { BookingModal } from './components/components';
import { Quest } from '../../types/quest';
import { ThunkAppDispatch } from '../../types/action';
import { store } from '../../index';
import { fetchQuestDataAction } from '../../store/api-actions';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { toggleBookingPopup } from 'store/action';

type DetailedQuestProps = {
  quest: Quest | null,
}

type DetailedQuestRouteParams = {
  id: string
}

const mapStateToProps = ({currentQuest, popupFlag}: State) => ({
  currentQuest,
  popupFlag,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & DetailedQuestProps;

const DetailedQuest = ({quest, currentQuest, popupFlag }: ConnectedComponentProps):JSX.Element => {
  const params = useParams<DetailedQuestRouteParams>();
  const questId = params.id;
  if (quest === null && currentQuest === null) {
    (store.dispatch as ThunkAppDispatch)(fetchQuestDataAction(questId));
  }

  const {title, description, coverImg, type, level, peopleCount, duration} = quest || currentQuest || {};

  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);

  const onBookingBtnClick = () => {
    setIsBookingModalOpened(true);
    (store.dispatch as ThunkAppDispatch)(toggleBookingPopup(true));
  };

  return (
    <MainLayout>
      <S.Main>
        <S.PageImage
          src={`../../${coverImg}`}
          alt={`Квест ${title}`}
          width="1366"
          height="768"
        />
        <S.PageContentWrapper>
          <S.PageHeading>
            <S.PageTitle>{title}</S.PageTitle>
            <S.PageSubtitle>{type}</S.PageSubtitle>
          </S.PageHeading>

          <S.PageDescription>
            <S.Features>
              <S.FeaturesItem>
                <IconClock width="20" height="20" />
                <S.FeatureTitle>{duration} мин</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPerson width="19" height="24" />
                <S.FeatureTitle>{peopleCount?.join('-')} чел</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPuzzle width="24" height="24" />
                <S.FeatureTitle>{level}</S.FeatureTitle>
              </S.FeaturesItem>
            </S.Features>

            <S.QuestDescription>
              {description}
            </S.QuestDescription>

            <S.QuestBookingBtn onClick={onBookingBtnClick}>
              Забронировать
            </S.QuestBookingBtn>
          </S.PageDescription>
        </S.PageContentWrapper>

        {popupFlag && isBookingModalOpened && <BookingModal setIsBookingModalOpened={setIsBookingModalOpened} />}
      </S.Main>
    </MainLayout>
  );
};

export {DetailedQuest};
export default connector(DetailedQuest);
