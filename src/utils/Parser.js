/*
 * Lucy - Messenger statistics
 * Copyright (C) 2018 Vincent M
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { convertUnicode, formatMap } from './Formats';
import format from 'date-fns/format';
import conversations from '../conversations.json';

const conversationsData = {};

class Parser {
  static setMessageCountPerUser = (message, map) => {
    const senderName = convertUnicode(message.sender_name);

    if (map.get(senderName) === undefined) {
      map.set(senderName, 1);
    } else {
      map.set(senderName, map.get(senderName) + 1);
    }
  };

  static setCharCountPerUser = (message, map) => {
    const senderName = convertUnicode(message.sender_name);
    const content = message.content;

    if (content) {
      const contentLength = content.length;
      if (map.get(senderName) === undefined) {
        map.set(senderName, contentLength);
      } else {
        map.set(senderName, map.get(senderName) + contentLength);
      }
    }
  };

  static setTotalChars = (message, data) => {
    const content = message.content;
    if (content) data.totalChars += content.length;
  };

  static setMessagesPerMonth = (message, map) => {
    const date = new Date(message.timestamp_ms);
    const key = format(date, 'MMM YY');
    if (map.get(key) === undefined) map.set(key, 0);
    else map.set(key, map.get(key) + 1);
  };

  static setUserData = (message, users) => {
    const senderName = convertUnicode(message.sender_name);
    let index = users.findIndex(element => senderName === element.userName);

    if (users[index] === undefined) {
      users.push(Parser.defaultUser(senderName));
      index = users.findIndex(element => senderName === element.userName);
    }
    Parser.setMessagesPerMonth(message, users[index].messagesPerMonth);
    Parser.setTotalChars(message, users[index]);
    users[index].totalMessages += 1;
  };

  static defaultUser = name => ({
    userName: convertUnicode(name),
    messagesPerMonth: new Map(),
    totalMessages: 0,
    totalChars: 0
  });

  static parsePlainText = plainText => Parser.parseJSON(JSON.parse(plainText));

  static parseStaticFile = route => {
    if (conversations[route]) {
      try {
        const { filePath } = conversations[route];
        const jsonFile = require(`../input/${filePath}`);
        if (jsonFile) conversationsData[route] = Parser.parseJSON(jsonFile);
      } catch (e) {
        throw Error('Fichier non trouvé');
      }
    }
  };

  static parseJSON = json => {
    try {
      const conversationData = {};
      conversationData.conversationName = convertUnicode(json.title);
      conversationData.conversationID = convertUnicode(json.thread_path);
      conversationData.messageCountPerUser = new Map();
      conversationData.charCountPerUser = new Map();
      conversationData.totalChars = 0;
      conversationData.totalMessages = json.messages.length;
      conversationData.messagesPerMonth = new Map();
      conversationData.users = json.participants.map(participant =>
        Parser.defaultUser(participant.name)
      );

      json.messages.forEach(message => {
        Parser.setMessageCountPerUser(
          message,
          conversationData.messageCountPerUser
        );
        Parser.setCharCountPerUser(message, conversationData.charCountPerUser);
        Parser.setTotalChars(message, conversationData);
        Parser.setMessagesPerMonth(message, conversationData.messagesPerMonth);
        Parser.setUserData(message, conversationData.users);
      });

      conversationData.users.forEach(user => formatMap(user.messagesPerMonth));
      formatMap(conversationData.messagesPerMonth);
      formatMap(conversationData.messageCountPerUser);
      formatMap(conversationData.charCountPerUser);
      return conversationData;
    } catch (e) {
      throw Error('Fichier mal formé'); // TODO Mettre des messages plus explicites
    }
  };

  static getConversationData(route) {
    if (!conversationsData[route]) Parser.parseStaticFile(route);
    return conversationsData[route];
  }
}

export default Parser;
