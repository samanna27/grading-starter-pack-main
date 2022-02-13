import { Quest } from './quest';

export type State = {
  type: string,
  currentQuest: Quest | null,
  quests: Quest[],
  popupFlag: boolean,
};
