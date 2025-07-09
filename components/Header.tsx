import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Menu, Search, User, Bell } from 'lucide-react-native';

interface HeaderProps {
  onMenuToggle: () => void;
}

const { width } = Dimensions.get('window');

export default function Header({ onMenuToggle }: HeaderProps) {
  const isMobile = width < 768 || Platform.OS !== 'web';
  
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuToggle}>
          <Menu color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.logo}>MyCompany</Text>
      </View>
      
      {/* 웹에서만 검색바 표시 */}
      {!isMobile && Platform.OS === 'web' && (
        <View style={styles.centerSection}>
          <View style={styles.searchContainer}>
            <Search color="#6B7280" size={20} />
            <Text style={styles.searchPlaceholder}>검색...</Text>
          </View>
        </View>
      )}
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color="#FFFFFF" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <User color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: '#1F2937',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  centerSection: {
    flex: 2,
    maxWidth: 400,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchPlaceholder: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 8,
  },
});