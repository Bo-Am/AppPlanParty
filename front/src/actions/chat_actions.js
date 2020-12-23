// объявляем из reducer названия редьюсеров
import {
    // GET_CHATS,
    // AFTER_POST_MESSAGE,
    SEND_MESSAGE
} from './types';
// // импортируем конфигурацию, где находится сервер чат
// import {CHAT_SERVER} from '../Config';

// export function getChats(){

//   return (dispatch) =>{

//   fetch(`${CHAT_SERVER}/getChats`)
//         .then(response =>response.json())
//         .then(res =>{
//           dispatch( {
//                 type: GET_CHATS,
//                 payload: res
//             })
//         })
//   }
 
// }

// // экспортируем данные отправленного сообщения
// export function afterPostMessage(data){

//     return {
//         type: AFTER_POST_MESSAGE,
//         payload: data
//     }
// }


export const sendMessageAC = (payload) => ({
  type: SEND_MESSAGE,
  payload,
});

export const initRoomAC = (payload) => ({
  type: INIT_ROOM,
  payload,
});

