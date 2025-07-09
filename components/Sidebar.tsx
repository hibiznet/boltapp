import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Chrome as Home, Info, MessageCircle, Settings, FileText, Users, ChartBar as BarChart3, X } from 'lucide-react-native';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const menuItems = [
  { icon: Home, label: '홈', id: 'home' },
  { icon: Info, label: '회사 소개', id: 'about' },
  { icon: Users, label: '팀', id: 'team' },
  { icon: FileText, label: '서비스', id: 'services' },
  { icon: BarChart3, label: '포트폴리오', id: 'portfolio' },
  { icon: MessageCircle, label: '연락처', id: 'contact' },
  { icon: Settings, label: '설정', id: 'settings' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = width < 768;
  
  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={onClose}
          activeOpacity={1}
        />
      )}
      
      <View style={[
        styles.sidebar,
        { 
          transform: [{ translateX: isOpen ? 0 : -280 }],
          position: isMobile ? 'absolute' : 'relative',
        }
      ]}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>메뉴</Text>
          {isMobile && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#6B7280" size={20} />
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <item.icon color="#374151" size={20} />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.sidebarFooter}>
          <Text style={styles.footerText}>v1.0.0</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  sidebar: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    zIndex: 1000,
    height: '100%',
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
  },
});