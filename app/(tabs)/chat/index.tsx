import {StyleSheet, View } from 'react-native';

import { HeaderBar } from '@/components/HeaderBar';
import { InputDisplay } from '@/components/InputDisplay';
import { SafeScreen } from '@/components/SafeScreen';
import { ThemedText } from '@/components/ThemedText';
import { goBack } from 'expo-router/build/global-state/routing';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { GradientCircleIcon } from '@/components/GradientCircleIcon';

export default function ChatScreen() {
  const [message, setMessage] = React.useState('');

  return (
    <>
      <HeaderBar
        title="Chat AI"
        subtitle="Always here to help!"
        showNotifications={true}
        notificationCount={5}
        showProfile={true}
        variant="gradient"
        showBackButton={true}
        onBackPress={goBack}
      />
      <SafeScreen
        scrollable={true}
        edges={['bottom', 'left', 'right',]}
        backgroundColor={"#efe9f8"}
        hasHeader={true}
        hasFloatingTabBar={true}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 0,
        }}
      >
        <View style={styles.chatContainer} className="flex-1 mb-20">
          <View style={styles.aiMessageContainer}>
            <View style={styles.aiMessageIcon}>
            <GradientCircleIcon iconName={"Sparkles"} gradientColors={[Colors.primary , "#8B5CF6"]} iconSize={24} circleSize={48} iconColor='#ffffff'/>
            </View>
            <View style={styles.aiMessageContent}>
              <ThemedText type="default" style={styles.aiMessageText}>
                Hello! Im your AI assistant for the POS system. How can I help you today?
              </ThemedText>
            </View>
          </View>

        </View>
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <View style={styles.inputContainer}>
          <View className="flex-1 left-0 right-0">
            <InputDisplay
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              className={"text-sm h-12 px-4 border-[#855bc3]"}
            />
          </View>
          <View className='fles align-middle justify-center ml-4'>
            <GradientCircleIcon iconName={"Send"} gradientColors={[Colors.primary , "#8B5CF6"]} iconSize={24} circleSize={48} iconColor='#ffffff'/>
          </View>
        </View>
      </View>
      </SafeScreen>

    </>
  );
}

const styles = StyleSheet.create({
  // =============================
  // CHAT STYLES
  // =============================
  chatContainer: {
    borderRadius: 16,
    overflow: 'hidden',

  },

  // =============================
  // CHAT AI STYLES
  // =============================
  aiMessageContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    maxWidth: '80%',
  },
  aiMessageIcon: {
    padding: 8,
    borderRadius: 20,
    marginRight: 4,
  },
  aiMessageContent: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  aiMessageText: {
    color: '#000000',
    fontSize: 12,
  },

  // =============================
  // CHAT USER STYLES
  // =============================

  // =============================
  // INPUT STYLES
  // =============================
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    bottom: 80,
  },
});
