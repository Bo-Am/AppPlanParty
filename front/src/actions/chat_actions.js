// объявляем из reducer названия редьюсеров
import axios from 'axios';
import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from './types';
// импортируем конфигурацию, где находится сервер чат
import {CHAT_SERVER} from '../Config';
// отправляем функцию получения чатов
export function getChats(){
  // с помощью axios выполняем get запрос, где указываем путь, с какой ручки получать все чаты
    const request = axios.get(`${CHAT_SERVER}/getChats`)
        .then(response => response.data);
    // возвращаем запрос и редюсер
    return {
        type: GET_CHATS,
        payload: request
    }
}
// экспортируем данные отправленного сообщения
export function afterPostMessage(data){

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}

