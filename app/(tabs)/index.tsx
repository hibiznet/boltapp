import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(width < 768);

  useEffect(() => {
    const updateLayout = () => {
      const newWidth = Dimensions.get('window').width;
      setIsMobile(newWidth < 768 || Platform.OS !== 'web');
      
      // 모바일 앱에서는 사이드바를 기본적으로 숨김
      if (Platform.OS !== 'web') {
        setSidebarOpen(false);
      } else if (newWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout();

    return () => subscription?.remove();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleChatBot = () => {
    setChatBotOpen(!chatBotOpen);
  };

  const closeChatBot = () => {
    setChatBotOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        {/* Header - 모바일에서는 더 간단하게 */}
        <Header onMenuToggle={toggleSidebar} />
        
        <View style={styles.body}>
          {/* Sidebar - 모바일에서는 오버레이로 */}
          {(Platform.OS === 'web' || sidebarOpen) && (
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          )}
          
          {/* Main Content */}
          <View style={[
            styles.mainContent,
            { 
              marginLeft: (!isMobile && sidebarOpen && Platform.OS === 'web') ? 0 : 0,
              flex: 1,
            }
          ]}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.heroContent}>
                <Text style={[
                  styles.heroTitle,
                  { fontSize: isMobile ? 32 : 48 }
                ]}>
                  혁신적인 솔루션으로{'\n'}더 나은 미래를 만들어갑니다
                </Text>
                <Text style={styles.heroSubtitle}>
                  최고의 기술과 창의적인 아이디어로 고객의 성공을 지원합니다.
                </Text>
                <View style={[
                  styles.heroButtons,
                  { flexDirection: isMobile ? 'column' : 'row' }
                ]}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>시작하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>더 알아보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Features Section */}
            <View style={styles.featuresSection}>
              <Text style={[
                styles.sectionTitle,
                { fontSize: isMobile ? 28 : 36 }
              ]}>주요 서비스</Text>
              <View style={styles.featuresGrid}>
                {[
                  { title: '웹 개발', description: '반응형 웹사이트 제작' },
                  { title: '모바일 앱', description: 'iOS/Android 앱 개발' },
                  { title: '클라우드', description: '안전한 클라우드 솔루션' },
                  { title: '컨설팅', description: '전문적인 기술 컨설팅' },
                ].map((feature, index) => (
                  <View key={index} style={[
                    styles.featureCard,
                    { width: isMobile ? '100%' : 280 }
                  ]}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Footer - 웹에서만 표시 */}
            {Platform.OS === 'web' && <Footer />}
          </View>
        </View>

        {/* Chat Bot Button */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={toggleChatBot}
        >
          <MessageCircle color="#FFFFFF" size={24} />
        </TouchableOpacity>

        {/* Chat Bot */}
        <ChatBot isOpen={chatBotOpen} onClose={closeChatBot} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  layout: {
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: 800,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 56,
    marginBottom: 24,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: 600,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3B82F6',
    minWidth: 140,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 48,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    maxWidth: 1200,
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  chatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: '#3B82F6',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
});