// получаем названия редюсеров
import { GET_CHATS, AFTER_POST_MESSAGE } from '../actions/types';

//  экспортируем функцию, задавая состоянию пустой объект
export function chatReducer (state={},action){
    switch(action.type){
      // при получении чатов мы возвращаем все значения состояния и все сообщения, которые написали
        case GET_CHATS:
            return {...state, chats: action.payload }
            // при отправлении, мы соединяем все сообщения в массив в redux
        case AFTER_POST_MESSAGE:
                return {...state, chats: state.chats.concat(action.payload) }
        default:
            return state;
    }
}
