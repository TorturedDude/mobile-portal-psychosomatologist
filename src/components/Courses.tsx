import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const courses = [
  {
    id: '1',
    title: 'Курс по управлению стрессом',
    date: '10 апреля 2024',
    price: '2 490 ₽',
    image: require('../../assets/posts/stress.jpg'),
  },
  {
    id: '2',
    title: 'Эмоциональный интеллект',
    date: '15 апреля 2024',
    price: '1 990 ₽',
    image: require('../../assets/posts/stress.jpg'),
  },
  {
    id: '3',
    title: 'Психосоматика в практике',
    date: '20 апреля 2024',
    price: '3 490 ₽',
    image: require('../../assets/posts/stress.jpg'),
  },
];

export function Courses() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Курсы</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContent}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity onPress={() =>
                navigation.navigate('CourseDetails', {
                    title: item.title,
                    description: 'Курс помогает познакомиться со связью между телом и психикой...',
                    price: item.price,
                    duration: '4 недели',
                    image: item.image,
                })
              }>
                <Text style={styles.readMore}>Подробнее →</Text>
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
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  readMore: {
    marginTop: 4,
    color: '#1D4ED8',
    fontWeight: '500',
  },
});
