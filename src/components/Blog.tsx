import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet } from "react-native";


const blogPosts = [
  {
    id: '1',
    title: 'Как управлять стрессом',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress.jpg'),
  },
  {
    id: '2',
    title: 'Влияние эмоций на тело',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress1.jpg'),
  },
  {
    id: '3',
    title: 'Психосоматика и здоровье',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress2.jpg'),
  },
  {
    id: '4',
    title: 'Влияние эмоций на тело',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress1.jpg'),
  },
  {
    id: '5',
    title: 'Психосоматика и здоровье',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress2.jpg'),
  },
  {
    id: '6',
    title: 'Влияние эмоций на тело',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress1.jpg'),
  },
  {
    id: '7',
    title: 'Психосоматика и здоровье',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress2.jpg'),
  },
  {
    id: '8',
    title: 'Влияние эмоций на тело',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress1.jpg'),
  },
  {
    id: '9',
    title: 'Психосоматика и здоровье',
    date: '1 апреля 2024',
    image: require('../../assets/posts/stress2.jpg'),
  },
];

export function Blog() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Блог</Text>

      <FlatList
        data={blogPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BlogPostDetails', {
                title: item.title,
                description: 'Курс помогает познакомиться со связью между телом и психикой...',
                date: item.date,
                image: item.image,
              })}>
                <Text style={styles.readMore}>Читать →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
  },
  readMore: {
    marginTop: 4,
    color: '#1D4ED8',
    fontWeight: '500',
  },
});