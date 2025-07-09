import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit2, Settings, Heart, BookOpen, Users, Award, Camera } from 'lucide-react-native';

const stats = [
  { label: '게시물', value: 24, icon: BookOpen },
  { label: '팔로워', value: 128, icon: Users },
  { label: '좋아요', value: 456, icon: Heart },
  { label: '뱃지', value: 8, icon: Award },
];

const recentPosts = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 24,
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 18,
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 32,
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 45,
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 28,
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 36,
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>프로필</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera color="#FFFFFF" size={16} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>김민수</Text>
            <Text style={styles.profileEmail}>minsu.kim@example.com</Text>
            <Text style={styles.profileBio}>
              디자인과 개발을 사랑하는 크리에이터입니다. 
              새로운 것을 배우고 공유하는 것을 좋아해요! ✨
            </Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Edit2 color="#3B82F6" size={16} />
            <Text style={styles.editButtonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.icon === BookOpen ? '#3B82F6' : stat.icon === Users ? '#10B981' : stat.icon === Heart ? '#EF4444' : '#F59E0B'}20` }]}>
                  <stat.icon color={stat.icon === BookOpen ? '#3B82F6' : stat.icon === Users ? '#10B981' : stat.icon === Heart ? '#EF4444' : '#F59E0B'} size={20} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Posts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 게시물</Text>
          <View style={styles.postsGrid}>
            {recentPosts.map((post) => (
              <TouchableOpacity key={post.id} style={styles.postItem}>
                <Image source={{ uri: post.image }} style={styles.postImage} />
                <View style={styles.postOverlay}>
                  <View style={styles.postLikes}>
                    <Heart color="#FFFFFF" size={12} />
                    <Text style={styles.postLikesText}>{post.likes}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#EBF8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  statsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  postItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 8,
  },
  postLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postLikesText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});