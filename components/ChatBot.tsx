import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { X, Send, Bot, User } from 'lucide-react-native';
import Constants from 'expo-constants';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const { width, height } = Dimensions.get('window');

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! 무엇을 도와드릴까요?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gemini API 호출 함수
  const fetchGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      // Expo 환경에서 환경변수 접근
      const apiKey = Constants.manifest?.extra?.GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API 키가 설정되지 않았습니다.');
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: userMessage }] }
          ]
        }),
      });
      if (!response.ok) throw new Error('Gemini API 호출 실패');
      const data = await response.json();
      // Gemini 응답 파싱
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || '죄송합니다. 답변을 생성하지 못했습니다.';
    } catch (err: any) {
      return '에러: ' + (err.message || '알 수 없는 오류');
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === '' || loading) return;
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // 로딩 메시지 추가
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '답변 생성 중...',
      isBot: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, loadingMessage]);

    // Gemini API 호출
    const botText = await fetchGeminiResponse(userMessage.text);

    setMessages(prev => {
      // 마지막(로딩) 메시지 제거 후 실제 답변 추가
      const newMsgs = prev.slice(0, -1);
      return [
        ...newMsgs,
        {
          id: (Date.now() + 2).toString(),
          text: botText,
          isBot: true,
          timestamp: new Date(),
        },
      ];
    });
    setLoading(false);
  };

  if (!isOpen) return null;

  const isMobile = width < 768;

  return (
    <View style={[
      styles.chatContainer,
      {
        width: isMobile ? width : 400,
        height: isMobile ? height : 600,
        right: isMobile ? 0 : 20,
        bottom: isMobile ? 0 : 20,
      }
    ]}>
      {/* Header */}
      <View style={styles.chatHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.botAvatar}>
            <Bot color="#FFFFFF" size={20} />
          </View>
          <View>
            <Text style={styles.chatTitle}>고객 지원</Text>
            <Text style={styles.chatStatus}>온라인</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X color="#6B7280" size={20} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper,
            ]}
          >
            <View style={styles.messageContent}>
              {message.isBot && (
                <View style={styles.messageAvatar}>
                  <Bot color="#3B82F6" size={16} />
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  message.isBot ? styles.botMessage : styles.userMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.isBot ? styles.botMessageText : styles.userMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
              {!message.isBot && (
                <View style={styles.messageAvatar}>
                  <User color="#FFFFFF" size={16} />
                </View>
              )}
            </View>
            <Text style={styles.messageTime}>
              {message.timestamp.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor="#9CA3AF"
          multiline
          onSubmitEditing={sendMessage}
          editable={!loading}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size={18} />
          ) : (
            <Send color="#FFFFFF" size={18} />
          )}
        </TouchableOpacity>
      </View>
      {error && (
        <View style={{ padding: 8 }}>
          <Text style={{ color: 'red', fontSize: 12 }}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    zIndex: 2000,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  chatStatus: {
    fontSize: 12,
    color: '#10B981',
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '80%',
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '100%',
  },
  botMessage: {
    backgroundColor: '#F3F4F6',
  },
  userMessage: {
    backgroundColor: '#3B82F6',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botMessageText: {
    color: '#1F2937',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 100,
    color: '#1F2937',
  },
  sendButton: {
    width: 36,
    height: 36,
    backgroundColor: '#3B82F6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});