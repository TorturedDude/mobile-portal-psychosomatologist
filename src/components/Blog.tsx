import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { IPost } from "../types/types";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export function Blog() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = api.get("api/posts");
        const posts = JSON.parse(JSON.stringify((await response).data))

        setPosts(posts)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    };

    loadPosts();
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Блог</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require('../../assets/posts/stress.jpg')} style={styles.image} />
            <View style={styles.textContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.date}>{item.publishDate.toDateString()}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BlogPostDetails', {
                id: item.id
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