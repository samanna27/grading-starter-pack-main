import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';

import {
  changeType,
  loadQuests,
  loadDetailedQuestData,
  redirectToRoute,
  toggleBookingPopup
} from '../store/action';

export enum ActionType {
  ChangeType = 'main/changeType',
  LoadQuests = 'data/loadQuests',
  LoadDetailedQuestData = 'data/loadDetailedQuestData',
  RedirectToRoute = 'main/redirectToRoute',
  ToggleBookingPopup = 'data/toggleBookingPopup'
}

export type Actions =
 | ReturnType<typeof changeType>
 | ReturnType<typeof loadQuests>
 | ReturnType<typeof loadDetailedQuestData>
 | ReturnType<typeof redirectToRoute>
 | ReturnType<typeof toggleBookingPopup>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
