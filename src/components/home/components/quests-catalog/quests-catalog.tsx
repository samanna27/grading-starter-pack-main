import { ReactComponent as IconAllQuests } from 'assets/img/icon-all-quests.svg';
import { ReactComponent as IconAdventures } from 'assets/img/icon-adventures.svg';
import { ReactComponent as IconHorrors } from 'assets/img/icon-horrors.svg';
import { ReactComponent as IconMystic } from 'assets/img/icon-mystic.svg';
import { ReactComponent as IconDetective } from 'assets/img/icon-detective.svg';
import { ReactComponent as IconScifi } from 'assets/img/icon-scifi.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './quests-catalog.styled';
import { State } from '../../../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { LEVELS, TYPES } from '../../../../const';
import { changeType } from '../../../../store/action';
import { useRef, useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { ThunkAppDispatch } from '../../../../types/action';
import { store } from '../../../../index';

const ICON_QUESTS: {[key in string]: JSX.Element} = {
  'Все квесты': <IconAllQuests />,
  adventures: <IconAdventures />,
  horror: <IconHorrors />,
  mystic: <IconMystic />,
  detective: <IconDetective />,
  'sci-fi': <IconScifi />
};

const mapStateToProps = ({quests, type}: State) => ({
  quests,
  type,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

const QuestsCatalog = ({quests, type}: ConnectedComponentProps):JSX.Element => {
  const types = ['Все квесты', ...new Set(quests.map((quest)=>quest.type))];
  const typeTab = useRef<HTMLLIElement>(null);
  const [isActiveType, setIsActiveType] = useState('Все квесты');

  const handleTypeClick = (evt: SyntheticEvent<HTMLButtonElement>, type: string) => {
    evt.preventDefault();

    (store.dispatch as ThunkAppDispatch)(changeType(type));
  };

  return (
  <>
    <S.Tabs>
      {types.map((type) => (
        <S.TabItem key={type} ref={typeTab}>
          <Link to="#">
            <S.TabBtn onClick={(evt) => {
              setIsActiveType(type);
              handleTypeClick(evt, type);
              }}
              { ...type === isActiveType ? "isActive" : ""}
              isActive={type === isActiveType}
              >
              {ICON_QUESTS[`${type}`]}
                <S.TabTitle>
                  {TYPES[`${type}`]}
                </S.TabTitle>
            </S.TabBtn>
          </Link>
        </S.TabItem>
      ))}
    </S.Tabs>

    <S.QuestsList>
      { type === 'Все квесты' ?
      quests.slice().map((quest) => (
      <S.QuestItem key={quest.id}>
        <S.QuestItemLink to={`/quests/${quest.id}`}>
          <S.Quest>
            <S.QuestImage
              src={quest.previewImg}
              width="344"
              height="232"
              alt={`квест ${quest.title}`}
            />

            <S.QuestContent>
              <S.QuestTitle>{quest.title}</S.QuestTitle>

              <S.QuestFeatures>
                <S.QuestFeatureItem>
                  <IconPerson />
                  {quest.peopleCount.join('-')} чел
                </S.QuestFeatureItem>
                <S.QuestFeatureItem>
                  <IconPuzzle />
                  {LEVELS[`${quest.level}`]}
                </S.QuestFeatureItem>
              </S.QuestFeatures>
            </S.QuestContent>
          </S.Quest>
        </S.QuestItemLink>
      </S.QuestItem>
      ))
      :
      quests.filter((quest) => quest.type === type).slice().map((quest) => (
        <S.QuestItem key={quest.id}>
          <S.QuestItemLink to={`/quests/${quest.id}`}>
            <S.Quest>
              <S.QuestImage
                src={quest.previewImg}
                width="344"
                height="232"
                alt={`квест ${quest.title}`}
              />

              <S.QuestContent>
                <S.QuestTitle>{quest.title}</S.QuestTitle>

                <S.QuestFeatures>
                  <S.QuestFeatureItem>
                    <IconPerson />
                    {quest.peopleCount.join('-')} чел
                  </S.QuestFeatureItem>
                  <S.QuestFeatureItem>
                    <IconPuzzle />
                    {LEVELS[`${quest.level}`]}
                  </S.QuestFeatureItem>
                </S.QuestFeatures>
              </S.QuestContent>
            </S.Quest>
          </S.QuestItemLink>
        </S.QuestItem>
        ))
      }
    </S.QuestsList>
  </>
)};

export {QuestsCatalog};
export default connector(QuestsCatalog);
