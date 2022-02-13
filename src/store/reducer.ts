import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState = {
  currentQuest: null,
  quests: [],
  type: 'Все квесты',
  popupFlag: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeType:{
      const type = action.payload;
      return {...state, type };
    }
    case ActionType.LoadQuests: {
      const {quests} = action.payload;
      return {...state, quests};
    }
    case ActionType.LoadDetailedQuestData: {
      const {currentQuest} = action.payload;
      return {...state, currentQuest};
    }
    case ActionType.ToggleBookingPopup: {
      const popupFlag = action.payload;
      return {...state, popupFlag};
    }
    default:
      return state;
  }
};

export {reducer};
