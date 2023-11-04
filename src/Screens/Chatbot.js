import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import qs from 'qs';

const ChatBot = () => {
  const [inputText, setInputText] = useState("What's 2 plus 5?");
  const [response, setResponse] = useState("");

  const sendChatRequest = async () => {
    const requestData = qs.stringify({
      in: inputText,
      op: 'in',
      cbot: '1',
      SessionID: 'RapidAPI1',
      cbid: '1',
      key: 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP',
      ChatSource: 'RapidAPI',
      duration: '1',
    });

    const options = {
      method: 'POST',
      url: 'https://robomatic-ai.p.rapidapi.com/api',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'fa3b63fddcmsh3d47ac8ab8285edp1d7c9cjsn45309e7587de',
        'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com',
      },
      data: requestData,
    };

    try {
      const response = await axios.request(options);
        if (response && response.data) {
          setResponse(response.data.out);
        } else {
          setResponse('No valid response received.');
        }
      
    } catch (error) {
      console.error(error);
      setResponse('Error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Bot</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a question"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Ask" onPress={sendChatRequest} />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  response: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default ChatBot;
