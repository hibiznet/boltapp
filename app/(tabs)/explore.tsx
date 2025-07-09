import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Clock, Star } from 'lucide-react-native';

const categories = [
  { name: '전체', active: true },
  { name: '맛집', active: false },
  { name: '카페', active: false },
  { name: '쇼핑', active: false },
  { name: '문화', active: false },
];

const exploreItems = [
  {
    id: 1,
    title: '서울 숨은 맛집 베스트',
    location: '서울시 강남구',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '맛집',
    duration: '2시간',
  },
  {
    id: 2,
    title: '감성 카페 투어',
    location: '서울시 홍대',
    rating: 4.6,
    reviews: 89,
    image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '카페',
    duration: '3시간',
  },
  {
    id: 3,
    title: '아트 갤러리 둘러보기',
    location: '서울시 삼청동',
    rating: 4.9,
    reviews: 67,
    image: 'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '문화',
    duration: '1.5시간',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>탐색하기</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#6B7280" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="어떤 곳을 찾고 계신가요?"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    category.active && styles.categoryButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category.active && styles.categoryTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Explore Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추천 장소</Text>
          {exploreItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.exploreCard}>
              <Image source={{ uri: item.image }} style={styles.exploreImage} />
              <View style={styles.exploreContent}>
                <View style={styles.exploreHeader}>
                  <Text style={styles.exploreTitle}>{item.title}</Text>
                  <View style={styles.exploreLocation}>
                    <MapPin color="#6B7280" size={14} />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                </View>
                
                <View style={styles.exploreFooter}>
                  <View style={styles.exploreStats}>
                    <View style={styles.statItem}>
                      <Star color="#F59E0B" size={14} />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                      <Text style={styles.reviewsText}>({item.reviews})</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Clock color="#6B7280" size={14} />
                      <Text style={styles.durationText}>{item.duration}</Text>
                    </View>
                  </View>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{item.category}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  exploreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  exploreImage: {
    width: '100%',
    height: 200,
  },
  exploreContent: {
    padding: 16,
  },
  exploreHeader: {
    marginBottom: 12,
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  exploreLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  exploreFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploreStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '500',
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  durationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryBadge: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B82F6',
  },
  bottomSpacing: {
    height: 20,
  },
});