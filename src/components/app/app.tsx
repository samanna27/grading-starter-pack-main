import { ThemeProvider } from 'styled-components';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from '../../components/common/common';
import DetailedQuest from '../../components/detailed-quest/detailed-quest';
import Contacts from '../../components/contacts/contacts';
import Home from '../../components/home/home';
import NotFoundScreen from '../../components/not-found-screen/not-found-screen';
import { AppRoute } from '../../const';
import { appTheme } from './common';
import * as S from './app.styled';
import { State } from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({quests}: State) => ({
  quests,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

const App = ({quests}: ConnectedComponentProps):JSX.Element => (
  <ThemeProvider theme={appTheme}>
    <S.GlobalStyle />
    <Router>
      <Switch>
        <Route exact path={AppRoute.Quest} render={(params) => {
          const questId = parseInt(params.match.params.id, 10);
          const matchedQuest = quests.find((quest) => quest.id === questId);
          if ( matchedQuest ) {
            return <DetailedQuest quest={matchedQuest}/>;
          } else {
            return <NotFoundScreen />;
          }
        }}
        >
        </Route>
        <Route exact path={AppRoute.Contacts}>
          <Contacts />
        </Route>
        <Route exact path={AppRoute.Main}>
          <Home />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export {App};
export default connector(App);
