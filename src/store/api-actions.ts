import { ThunkActionResult } from '../types/action';
import {
  loadDetailedQuestData,
  loadQuests,
  redirectToRoute,
  toggleBookingPopup
} from './action';
import { APIRoute, AppRoute, OK_CODE } from '../const';
import { Quest, Order } from '../types/quest';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ORDER_POST_FAIL_MESSAGE = 'Ваша бронь не была отправлена. Попробуйте еще раз.';
const ORDER_POST_SUCCESS_MESSAGE = "Ваша бронь отправлена.";

export const fetchQuestsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Quest[]>(APIRoute.Quests);
    dispatch(loadQuests(data));
  };

export const fetchQuestDataAction = (questId: string): ThunkActionResult =>
async (dispatch, _getState, api): Promise<void> => {
  const {data} = await api.get<Quest>(`/quests/${questId}`);
  dispatch(loadDetailedQuestData(data));
};

export const fetchPostOrderAction = (Order: {name: string, peopleCount: number, phone: string, isLegal: true}): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {name, peopleCount, phone, isLegal} = Order;
      await api.post<Order>('/orders', {name, peopleCount, phone, isLegal})
        .then((data) => {
          if(data.status === OK_CODE) {
            toast.info(ORDER_POST_SUCCESS_MESSAGE);
            dispatch(toggleBookingPopup(false));
          }
        });
    } catch {
      toast.info(ORDER_POST_FAIL_MESSAGE);
      dispatch(redirectToRoute(AppRoute.Main));
      console.log('error');
    }
  };
