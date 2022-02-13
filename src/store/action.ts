import { ActionType } from '../types/action';
import { Quest } from '../types/quest';
import { AppRoute } from '../const';

export const changeType = (type: string) => ({
  type: ActionType.ChangeType,
  payload: type,
} as const);

export const loadQuests = (quests: Quest[]) => ({
  type: ActionType.LoadQuests,
  payload: {
    quests,
  },
} as const);

export const loadDetailedQuestData = (currentQuest: Quest) => ({
  type: ActionType.LoadDetailedQuestData,
  payload: {
    currentQuest,
  },
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const toggleBookingPopup = (popupFlag: boolean) => ({
  type: ActionType.ToggleBookingPopup,
  payload: popupFlag,
} as const)
