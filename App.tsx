import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreen } from './src/screens/AuthScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { BlogScreen } from './src/screens/BlogScreen';
import { CoursesScreen } from './src/screens/CoursesScreen';
import { SessionScreen } from './src/screens/SessionScreen';
import { Profile } from './src/components/Profile';
import { CourseDetailsScreen } from './src/components/CoursesDetails';
import { BlogPostDetailsScreen } from './src/components/BlogPostDetails';
import { AuthProvider, useAuth } from './src/hooks/useAuth';
import AdminScreen from './src/screens/AdminScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { RedactCourse } from './src/components/RedactCourse';
import CreateCourse from './src/components/CreateCourse';
import RedactPost from './src/components/RedactPost';
import CreatePost from './src/components/CreatePost';
import CreateReview from './src/components/CreateReview';
import Reviews from './src/components/Reviews';

const CourseStack = createNativeStackNavigator();
const BlogStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function CourseStackNavigator() {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen name="Courses" component={CoursesScreen} options={{ headerShown: false }} />
      <CourseStack.Screen name="CourseDetails" component={CourseDetailsScreen} options={{ headerShown: false }} />
    </CourseStack.Navigator>
  );
}

function BlogStackNavigator() {
  return (
    <BlogStack.Navigator>
      <BlogStack.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
      <BlogStack.Screen name="BlogPostDetails" component={BlogPostDetailsScreen} options={{ headerShown: false }} />
      <BlogStack.Screen name="CreateReview" component={CreateReview} options={{ headerShown: false }} />
      <BlogStack.Screen name="Reviews" component={Reviews} options={{ headerShown: false }} />
    </BlogStack.Navigator>
  );
}

function ProfileStackNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <AdminStack.Navigator initialRouteName={isAuthenticated ? "Profile" : "Auth"}>
      <AdminStack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      <AdminStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <AdminStack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
      <AdminStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}} />
      <AdminStack.Screen name="RedactCourse" component={RedactCourse} options={{ headerShown: false}} />
      <AdminStack.Screen name="CreateCourse" component={CreateCourse} options={{ headerShown: false}} />
      <AdminStack.Screen name="RedactPost" component={RedactPost} options={{ headerShown: false}} />
      <AdminStack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false}} />
    </AdminStack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = '';
              switch (route.name) {
                case 'Blog':
                  iconName = focused ? 'square' : 'square-outline';
                  break;
                case 'Courses':
                  iconName = focused ? 'book' : 'book-outline';
                  break;
                case 'Session':
                  iconName = focused ? 'laptop' : 'laptop-outline';
                  break;
                case 'Chat':
                  iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
              }
              return <Ionicons name={iconName} size={24} color={focused ? 'black' : 'gray'} />;
            },
            tabBarStyle: {
              height: 70,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              position: 'absolute',
              backgroundColor: 'white',
            },
          })}
        >
          <Tab.Screen name="Blog" component={BlogStackNavigator} />
          <Tab.Screen name="Courses" component={CourseStackNavigator} />
          <Tab.Screen name="Session" component={SessionScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}