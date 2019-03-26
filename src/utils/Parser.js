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

import {
  convertUnicode,
  formatDuration,
  formatFullDate,
  formatMap,
  formatMapReverse,
  formatMMMYYDate
} from "./Formats";
import conversations from "../conversations.json";

const conversationsData = {};

class Parser {
  /* It consumes way too much ressources
  static countWordFrequency(message, wordFrequency) {
    if (message.content) {
      wordFrequency.wordsArray = convertUnicode(message.content).split(/\s+/);

      wordFrequency.wordsArray.forEach(word => {
        wordFrequency.wordsMap.hasOwnProperty(word)
          ? wordFrequency.wordsMap[word]++
          : (wordFrequency.wordsMap[word] = 1);
      });

      wordFrequency.finalWordsArray = Object.keys(wordFrequency.wordsMap).map(
        word => ({
          word,
          count: wordFrequency.wordsMap[word]
        })
      );
    }
  }
  */

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
    const content = convertUnicode(message.content);

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
    const content = convertUnicode(message.content);
    if (content) data.totalChars += content.length;
  };

  static setTotalPhotos = (message, data) => {
    const { photos } = message;
    if (photos) data.totalPhotos += photos.length;
  };

  static setTotalStickers = (message, data) => {
    const { sticker } = message;
    if (sticker) data.totalStickers += 1;
  };

  static setTotalVideos = (message, data) => {
    const { videos } = message;
    if (videos) data.totalVideos += videos.length;
  };

  static setTotalShares = (message, data) => {
    const { share } = message;
    if (share) data.totalShares += 1;
  };

  static setMessagesPerMonth = (message, map) => {
    const date = new Date(message.timestamp_ms);
    const key = formatMMMYYDate(date);
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

  static checkErrors = json => {
    if (!json) throw new Error("Fichier non trouvé");
    if (
      !json.participants ||
      !json.messages ||
      !json.title ||
      !json.is_still_participant ||
      !json.thread_type ||
      !json.thread_path
    )
      throw new Error("Fichier mal formé");
  };

  static parsePlainText = plainText => {
    return Parser.parseJSON(JSON.parse(plainText));
  };

  static parseStaticFile = route => {
    try {
      const { fileName } = conversations[route];
      const jsonFile = require(`../input/${fileName}`);
      if (jsonFile) conversationsData[route] = Parser.parseJSON(jsonFile);
    } catch (e) {
      throw Error("Fichier non trouvé");
    }
  };

  static parseJSON = json => {
    Parser.checkErrors(json);
    const conversationData = {};
    conversationData.conversationName = convertUnicode(json.title);
    // We remove everything before the last "/" in the thread_path
    conversationData.conversationID = convertUnicode(
      json.thread_path.substring(json.thread_path.lastIndexOf("/") + 1)
    );
    conversationData.firstMessageDate = formatFullDate(
      new Date(json.messages[json.messages.length - 1].timestamp_ms)
    );
    conversationData.lastMessageDate = formatFullDate(
      new Date(json.messages[0].timestamp_ms)
    );
    conversationData.conversationDuration = formatDuration(
      new Date(json.messages[0].timestamp_ms),
      new Date(json.messages[json.messages.length - 1].timestamp_ms)
    );
    conversationData.messageCountPerUser = new Map();
    conversationData.charCountPerUser = new Map();
    conversationData.totalMessages = json.messages.length;
    conversationData.totalChars = 0;
    conversationData.totalPhotos = 0;
    conversationData.totalStickers = 0;
    conversationData.totalVideos = 0;
    conversationData.totalShares = 0;
    conversationData.messagesPerMonth = new Map();

    conversationData.users = json.participants.map(participant =>
      Parser.defaultUser(participant.name)
    );

    /* The big loop */
    json.messages.forEach(message => {
      Parser.setMessageCountPerUser(
        message,
        conversationData.messageCountPerUser
      );
      Parser.setCharCountPerUser(message, conversationData.charCountPerUser);
      Parser.setTotalChars(message, conversationData);
      Parser.setMessagesPerMonth(message, conversationData.messagesPerMonth);
      Parser.setUserData(message, conversationData.users);
      Parser.setTotalPhotos(message, conversationData);
      Parser.setTotalStickers(message, conversationData);
      Parser.setTotalVideos(message, conversationData);
      Parser.setTotalShares(message, conversationData);
    });
    conversationData.users.forEach(user =>
      formatMapReverse(user.messagesPerMonth)
    );
    formatMapReverse(conversationData.messagesPerMonth);
    formatMap(conversationData.messageCountPerUser);
    formatMap(conversationData.charCountPerUser);
    return conversationData;
  };

  static getConversationData(route) {
    if (!conversationsData[route]) Parser.parseStaticFile(route);
    return conversationsData[route];
  }
}

export default Parser;
