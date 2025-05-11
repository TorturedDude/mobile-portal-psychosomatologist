import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { AuthScreen } from './src/screens/AuthScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { BlogScreen } from './src/screens/BlogScreen';
import { CoursesScreen } from './src/screens/CoursesScreen';
import { SessionScreen } from './src/screens/SessionScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { CourseDetailsScreen } from './src/components/CoursesDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlogPostDetailsScreen } from './src/components/BlogPostDetails';
import { AuthProvider } from './src/hooks/useAuth';

const CourseStack = createNativeStackNavigator();
const BlogStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Auth: AuthScreen,
    Chat: ChatScreen,
    Blog: BlogScreen,
    Courses: CoursesScreen,
    Session: SessionScreen,
    Profile: ProfileScreen,
    CourseDetails: CourseDetailsScreen,
  }
});

function CourseStackNavigator() {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen name="Courses" component={CoursesScreen} options={{ headerShown: false }} />
      <CourseStack.Screen
        name="CourseDetails"
        component={CourseDetailsScreen}
        options={{ headerShown: false }}
      />
    </CourseStack.Navigator>
  );
}

function BlogStackNavigator() {
  return (
    <BlogStack.Navigator>
      <BlogStack.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
      <BlogStack.Screen
        name="BlogPostDetails"
        component={BlogPostDetailsScreen}
        options={{ headerShown: false }}
      />
    </BlogStack.Navigator>
  )
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
                  iconName = focused ? 'laptop' : 'laptop-outline'; // или custom SVG
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
          <Tab.Screen name="Profile" component={AuthScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}