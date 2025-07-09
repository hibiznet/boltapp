import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Footer() {
  const isMobile = width < 768;
  
  return (
    <View style={styles.footer}>
      <View style={[styles.footerContent, { flexDirection: isMobile ? 'column' : 'row' }]}>
        {/* Company Info */}
        <View style={[styles.footerSection, { flex: isMobile ? 0 : 1 }]}>
          <Text style={styles.footerTitle}>MyCompany</Text>
          <Text style={styles.footerDescription}>
            혁신적인 솔루션으로 더 나은 미래를 만들어갑니다.
          </Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Facebook color="#FFFFFF" size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Twitter color="#FFFFFF" size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Instagram color="#FFFFFF" size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Linkedin color="#FFFFFF" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Quick Links */}
        <View style={[styles.footerSection, { flex: isMobile ? 0 : 1 }]}>
          <Text style={styles.sectionTitle}>빠른 링크</Text>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.linkText}>회사 소개</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.linkText}>서비스</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.linkText}>포트폴리오</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.linkText}>블로그</Text>
          </TouchableOpacity>
        </View>
        
        {/* Contact Info */}
        <View style={[styles.footerSection, { flex: isMobile ? 0 : 1 }]}>
          <Text style={styles.sectionTitle}>연락처</Text>
          <View style={styles.contactItem}>
            <MapPin color="#9CA3AF" size={16} />
            <Text style={styles.contactText}>서울시 강남구 테헤란로 123</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone color="#9CA3AF" size={16} />
            <Text style={styles.contactText}>02-1234-5678</Text>
          </View>
          <View style={styles.contactItem}>
            <Mail color="#9CA3AF" size={16} />
            <Text style={styles.contactText}>info@mycompany.com</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footerBottom}>
        <Text style={styles.copyrightText}>
          © 2024 MyCompany. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1F2937',
    paddingTop: 40,
    paddingBottom: 20,
  },
  footerContent: {
    paddingHorizontal: 20,
    gap: 32,
  },
  footerSection: {
    gap: 16,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  footerDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  socialButton: {
    width: 36,
    height: 36,
    backgroundColor: '#374151',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  footerLink: {
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  footerBottom: {
    marginTop: 32,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});