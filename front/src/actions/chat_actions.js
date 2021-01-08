// объявляем из reducer названия редьюсеров
import {
    SEND_MESSAGE,
    INIT_ROOM
} from './types';

export const sendMessageAC = (payload) => ({
  type: SEND_MESSAGE,
  payload,
});

export const initRoomAC = (payload) => ({
  type: INIT_ROOM,
  payload,
});
