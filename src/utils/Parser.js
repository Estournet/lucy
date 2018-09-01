import jsonFile from '../input/message.json';
import { convertUnicode, formatMap } from './Formats';
import format from 'date-fns/format';

const setMessageCountPerUser = (message, map) => {
  const senderName = convertUnicode(message.sender_name);

  if (map.get(senderName) === undefined) {
    map.set(senderName, 1);
  } else {
    map.set(senderName, map.get(senderName) + 1);
  }
};

const setCharCountPerUser = (message, map) => {
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

const setTotalChars = (message, data) => {
  const content = message.content;

  if (content) {
    data.totalChars += content.length;
  }
};

const setMessagesPerMonth = (message, map) => {
  const date = new Date(message.timestamp_ms);
  const key = format(date, 'MMM YY');
  if (map.get(key) === undefined) {
    map.set(key, 0);
  } else {
    map.set(key, map.get(key) + 1);
  }
};

const setUserData = (message, users) => {
  const senderName = convertUnicode(message.sender_name);
  let index = users.findIndex(element => senderName === element.userName);

  if (users[index] === undefined) {
    console.log(message);
    console.log(users);
    users.push(defaultUser(senderName));
    index = users.findIndex(element => senderName === element.userName);
  }
  setMessagesPerMonth(message, users[index].messagesPerMonth);
  setTotalChars(message, users[index]);
  users[index].totalMessages += 1;
};

const setTotalMessages = () => jsonFile.messages.length;

const defaultUser = name => ({
  userName: convertUnicode(name),
  messagesPerMonth: new Map(),
  totalMessages: 0,
  totalChars: 0
});

const parsedData = () => {
  const data = {};
  data.groupName = convertUnicode(jsonFile.title);
  data.messageCountPerUser = new Map();
  data.charCountPerUser = new Map();
  data.totalChars = 0;
  data.totalMessages = setTotalMessages();
  data.messagesPerMonth = new Map();
  data.users = jsonFile.participants.map(participant =>
    defaultUser(participant.name)
  );

  jsonFile.messages.forEach(message => {
    setMessageCountPerUser(message, data.messageCountPerUser);
    setCharCountPerUser(message, data.charCountPerUser);
    setTotalChars(message, data);
    setMessagesPerMonth(message, data.messagesPerMonth);
    setUserData(message, data.users);
  });

  console.log(data);

  data.users.forEach(user => formatMap(user.messagesPerMonth));
  formatMap(data.messagesPerMonth);
  formatMap(data.messageCountPerUser);
  formatMap(data.charCountPerUser);
  return data;
};

export default parsedData();
