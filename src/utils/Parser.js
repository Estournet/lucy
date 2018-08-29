import jsonFile from '../input/message.json';
import { convertUnicode } from './Formats';

const getMessageCountPerUser = (message, map) => {
  if (message['sender_name']) {
    if (map.get(message['sender_name']) === undefined) {
      map.set(decodeURIComponent(message['sender_name']), 1);
    } else {
      if (message['sender_name'] === 'Jeremy Saraudy') {
        console.log(message);
      }
      map.set(
        decodeURIComponent(message['sender_name']),
        map.get(message['sender_name']) + 1
      );
    }
  }
};

const getCharCountPerUser = (message, map) => {
  if (message['sender_name'] && message['content']) {
    if (map.get(message['sender_name']) === undefined) {
      map.set(
        decodeURIComponent(message['sender_name']),
        message['content'].length
      );
    } else {
      map.set(
        decodeURIComponent(message['sender_name']),
        map.get(message['sender_name']) + message['content'].length
      );
    }
  }
};

const getTotalChars = (message, data) => {
  if (message['sender_name'] && message['content']) {
    data.totalChars += message['content'].length;
  }
};

const formatMap = map => {
  map.keys = Array.from(map.keys());
  map.values = Array.from(map.values());
};

const getTotalMessages = () => jsonFile.messages.length;

const parsedData = () => {
  const j = '{"name": "St\u00c3\u00a9phanie Collrd"}';
  console.log(JSON.parse(j));
  const data = {};
  data.title = convertUnicode(jsonFile.title);
  data.messageCountPerUser = new Map();
  data.charCountPerUser = new Map();
  data.totalChars = 0;
  data.totalMessages = getTotalMessages();
  jsonFile.messages.forEach(message => {
    getMessageCountPerUser(message, data.messageCountPerUser);
    getCharCountPerUser(message, data.charCountPerUser);
    getTotalChars(message, data);
  });

  formatMap(data.messageCountPerUser);
  formatMap(data.charCountPerUser);
  return data;
};

export default parsedData();
