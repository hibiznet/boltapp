import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Shield, Eye, Globe, CircleHelp as HelpCircle, MessageCircle, Star, LogOut, ChevronRight, Moon, Smartphone, Lock } from 'lucide-react-native';
import { useState } from 'react';

const settingsData = [
  {
    section: '알림',
    icon: Bell,
    items: [
      { title: '푸시 알림', subtitle: '새로운 활동 알림 받기', hasSwitch: true, value: true },
      { title: '이메일 알림', subtitle: '이메일로 업데이트 받기', hasSwitch: true, value: false },
      { title: '마케팅 알림', subtitle: '프로모션 및 이벤트 알림', hasSwitch: true, value: true },
    ],
  },
  {
    section: '개인정보',
    icon: Shield,
    items: [
      { title: '개인정보 설정', subtitle: '프로필 공개 범위 설정', hasChevron: true },
      { title: '데이터 다운로드', subtitle: '내 데이터 다운로드', hasChevron: true },
      { title: '계정 삭제', subtitle: '계정 영구 삭제', hasChevron: true },
    ],
  },
  {
    section: '앱 설정',
    icon: Smartphone,
    items: [
      { title: '다크 모드', subtitle: '어두운 테마 사용', hasSwitch: true, value: false },
      { title: '언어 설정', subtitle: '한국어', hasChevron: true },
      { title: '저장소 관리', subtitle: '캐시 및 데이터 관리', hasChevron: true },
    ],
  },
  {
    section: '지원',
    icon: HelpCircle,
    items: [
      { title: '도움말', subtitle: '자주 묻는 질문', hasChevron: true },
      { title: '문의하기', subtitle: '고객 지원팀에 연락', hasChevron: true },
      { title: '앱 평가', subtitle: '앱스토어에서 평가하기', hasChevron: true },
    ],
  },
];

export default function SettingsScreen() {
  const [switchValues, setSwitchValues] = useState({
    pushNotifications: true,
    emailNotifications: false,
    marketingNotifications: true,
    darkMode: false,
  });

  const toggleSwitch = (key: string) => {
    setSwitchValues(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const getSwitchKey = (sectionIndex: number, itemIndex: number) => {
    const keys = ['pushNotifications', 'emailNotifications', 'marketingNotifications', 'darkMode'];
    if (sectionIndex === 0) return keys[itemIndex];
    if (sectionIndex === 2 && itemIndex === 0) return 'darkMode';
    return '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>설정</Text>
        </View>

        {/* Profile Summary */}
        <View style={styles.profileSummary}>
          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>김</Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>김민수</Text>
              <Text style={styles.profileEmail}>minsu.kim@example.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <ChevronRight color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsData.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <section.icon color="#3B82F6" size={20} />
                <Text style={styles.sectionTitle}>{section.section}</Text>
              </View>
            </View>
            
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.lastItem,
                  ]}
                >
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  
                  {item.hasSwitch && (
                    <Switch
                      value={switchValues[getSwitchKey(sectionIndex, itemIndex) as keyof typeof switchValues]}
                      onValueChange={() => toggleSwitch(getSwitchKey(sectionIndex, itemIndex))}
                      trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                      thumbColor={switchValues[getSwitchKey(sectionIndex, itemIndex) as keyof typeof switchValues] ? '#FFFFFF' : '#F3F4F6'}
                    />
                  )}
                  
                  {item.hasChevron && (
                    <ChevronRight color="#6B7280" size={20} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut color="#EF4444" size={20} />
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>버전 1.0.0</Text>
          <Text style={styles.versionSubtext}>최신 버전입니다</Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  profileSummary: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileDetails: {
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  profileButton: {
    padding: 8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flex: 1,
    gap: 4,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 20,
  },
});