import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { api, parse } from '../api/api';
import { ICourse } from '../types/types';

export function Courses() {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await api.get("/api/course");
        const courses = JSON.parse(JSON.stringify(response.data))

        console.log(courses)

        setCourses(courses); 
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (loading) {
          return (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" />
              </View>
          );
      }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Курсы</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={ require('../../assets/posts/stress.jpg')}
              style={styles.image}
            />
            <View style={styles.textContent}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.date}>{item.startDate || 'Дата не указана'}</Text>
              <Text style={styles.price}>{item.price} ₽</Text>
              <TouchableOpacity onPress={() =>
                navigation.navigate('CourseDetails', {
                  id: item.id
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
