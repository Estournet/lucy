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

    if (content) {
      data.totalChars += content.length;
    }
  };

  static setMessagesPerMonth = (message, map) => {
    const date = new Date(message.timestamp_ms);
    const key = format(date, 'MMM YY');
    if (map.get(key) === undefined) {
      map.set(key, 0);
    } else {
      map.set(key, map.get(key) + 1);
    }
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

  static parseJSON(json) {
    if (json) {
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
      // conversationsData[route] = conversationData;
      console.log(conversationData);
    }
  }

  static parseStaticFile(route) {
    if (!conversationsData[route]) {
      console.log('Parsing ' + route);
      const conversationData = {};
      if (conversations[route]) {
        const { filePath } = conversations[route];
        const jsonFile = require(`../input/${filePath}`);
        if (jsonFile) {
          conversationData.conversationName = convertUnicode(jsonFile.title);
          conversationData.conversationID = convertUnicode(
            jsonFile.thread_path
          );
          conversationData.messageCountPerUser = new Map();
          conversationData.charCountPerUser = new Map();
          conversationData.totalChars = 0;
          conversationData.totalMessages = jsonFile.messages.length;
          conversationData.messagesPerMonth = new Map();
          conversationData.users = jsonFile.participants.map(participant =>
            Parser.defaultUser(participant.name)
          );

          jsonFile.messages.forEach(message => {
            Parser.setMessageCountPerUser(
              message,
              conversationData.messageCountPerUser
            );
            Parser.setCharCountPerUser(
              message,
              conversationData.charCountPerUser
            );
            Parser.setTotalChars(message, conversationData);
            Parser.setMessagesPerMonth(
              message,
              conversationData.messagesPerMonth
            );
            Parser.setUserData(message, conversationData.users);
          });

          conversationData.users.forEach(user =>
            formatMap(user.messagesPerMonth)
          );
          formatMap(conversationData.messagesPerMonth);
          formatMap(conversationData.messageCountPerUser);
          formatMap(conversationData.charCountPerUser);
          conversationsData[route] = conversationData;
        }
      }
    }
  }

  static getConversationData(route) {
    if (!conversationsData[route]) Parser.parseStaticFile(route);
    return conversationsData[route];
  }
}

export default Parser;
