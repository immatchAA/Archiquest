import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { 
  Ionicons, 
  MaterialCommunityIcons, 
  FontAwesome5, 
  MaterialIcons 
} from '@expo/vector-icons';
import ChallengeDetailsScreen from './ChallengeScreenDetails';

// Create navigation structures
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Initial app data
const initialData = {
  challenge: {
    title: 'Build a Modern House',
    description: 'Design and build a modern single-family home within budget constraints.',
    instructor: 'Prof. Johnson',
    dueDate: 'May 15, 2023',
    difficulty: 3,
    status: 'In Progress'
  },
  budget: {
    total: 200000,
    spent: 85750,
    remaining: 114250
  },
  materials: [
    { id: 1, name: 'Concrete', price: 105, unit: 'cubic yard', image: require('./assets/images/react-logo.png'), inCart: 0 },
    { id: 2, name: 'Lumber', price: 4.50, unit: 'board foot', image: require('./assets/images/react-logo.png'), inCart: 0 },
    { id: 3, name: 'Brick', price: 0.40, unit: '1000', image: require('./assets/images/react-logo.png'), inCart: 0 },
    { id: 4, name: 'Glass', price: 25, unit: 'sq foot', image: require('./assets/images/react-logo.png'), inCart: 0 },
    { id: 5, name: 'Roofing', price: 5.50, unit: 'sq foot', image: require('./assets/images/react-logo.png'), inCart: 0 },
    { id: 6, name: 'Insulation', price: 1.85, unit: 'sq foot', image: require('./assets/images/react-logo.png'), inCart: 0 }
  ]
};

// Main App Component
export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="ChallengeDetails" component={ChallengeDetailsScreen} />
        <Stack.Screen name="ARView" component={ARViewScreen} />
      </Stack.Navigator>
    </>
  );
}

// Tab Navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
          } else if (route.name === 'Materials') {
            iconName = focused ? 'hammer' : 'hammer-outline';
            return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
          } else if (route.name === 'Inventory') {
            return <MaterialCommunityIcons name="clipboard-list-outline" size={size} color={color} />;
          } else if (route.name === 'Progress') {
            return <MaterialIcons name="stacked-bar-chart" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Materials" component={MaterialsScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Home Screen
// Removed duplicate import of StackNavigationProp

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [data, setData] = useState(initialData);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ARchiQuest</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Challenge Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Challenge</Text>
          <View style={styles.challengeCard}>
            <View style={styles.challengeContent}>
              <View>
                <Text style={styles.challengeTitle}>{data.challenge.title}</Text>
                <Text style={styles.challengeDescription}>{data.challenge.description}</Text>
                
                <View style={styles.challengeDetails}>
                  <Text style={styles.detailLabel}>Instructor:</Text>
                  <Text style={styles.detailValue}>{data.challenge.instructor}</Text>
                </View>
                
                <View style={styles.challengeDetails}>
                  <Text style={styles.detailLabel}>Due Date:</Text>
                  <Text style={styles.detailValue}>{data.challenge.dueDate}</Text>
                </View>
                
                <View style={styles.challengeDetails}>
                  <Text style={styles.detailLabel}>Difficulty:</Text>
                  <View style={styles.difficultyStars}>
                    {[...Array(5)].map((_, i) => (
                      <Ionicons 
                        key={i}
                        name={i < data.challenge.difficulty ? "star" : "star-outline"} 
                        size={16} 
                        color="#3B82F6" 
                      />
                    ))}
                  </View>
                </View>
              </View>
              
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{data.challenge.status}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => navigation.navigate('ChallengeDetails')}
            >
              <Text style={styles.continueButtonText}>Continue Challenge</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Budget Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Status</Text>
          <View style={styles.budgetCard}>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Assigned budget from instructor</Text>
              <Text style={styles.budgetTotal}>${data.budget.total.toLocaleString()}</Text>
            </View>
            
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Spent:</Text>
              <Text style={styles.budgetSpent}>${data.budget.spent.toLocaleString()}</Text>
            </View>
            
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Remaining:</Text>
              <Text style={styles.budgetRemaining}>${data.budget.remaining.toLocaleString()}</Text>
            </View>
            
            <View style={styles.budgetProgressBar}>
              <View 
                style={[
                  styles.budgetProgress, 
                  { width: `${(data.budget.spent / data.budget.total) * 100}%` }
                ]} 
              />
            </View>
            
            <TouchableOpacity style={styles.viewBudgetButton}>
              <Ionicons name="cash-outline" size={20} color="#3B82F6" />
              <Text style={styles.viewBudgetText}>View Budget Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Materials Preview */}
        <View style={styles.section}>
          <View style={styles.tabHeader}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Materials</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tab} 
              onPress={() => navigation.navigate('Inventory')}
            >
            <Text style={styles.tabText}>Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tab} 
              onPress={() => navigation.navigate('Progress')}
            >
            <Text style={styles.tabText}>Progress</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.materialsGrid}>
            {data.materials.slice(0, 4).map(material => (
              <View key={material.id} style={styles.materialPreviewCard}>
                <View style={styles.materialImageContainer}>
                  <View style={styles.materialImage} />
                </View>
                <View style={styles.materialPreviewInfo}>
                  <Text style={styles.materialName}>{material.name}</Text>
                  <Text style={styles.materialPrice}>${material.price}</Text>
                  <Text style={styles.materialUnit}>Per {material.unit}</Text>
                </View>
                <TouchableOpacity style={styles.addToProjectButton}>
                  <Text style={styles.addToProjectText}>Add to Project</Text>
                  <Ionicons name="arrow-forward" size={16} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Materials Screen
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ARView: undefined;
  Main: undefined;
  ChallengeDetails: undefined;
  Inventory: undefined; // Add this line to include Inventory
  Progress: undefined; // Add this line to include Progress
};

type MaterialsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

function MaterialsScreen({ navigation }: { navigation: MaterialsScreenNavigationProp }) {
  const [materials, setMaterials] = useState(initialData.materials);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ARchiQuest</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.materialsContainer}>
          {/* Materials Grid */}
          <View style={styles.materialsFullGrid}>
            {materials.map((material, index) => (
              <View key={material.id} style={styles.materialCard}>
                <View style={styles.materialImageContainer}>
                  <View style={[styles.materialImage, { backgroundColor: index % 2 === 0 ? '#E5E7EB' : '#BFDBFE' }]} />
                </View>
                <Text style={styles.materialName}>{material.name}</Text>
                <Text style={styles.materialPriceTag}>${material.price}</Text>
                <Text style={styles.materialUnit}>Per {material.unit}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add to Project</Text>
                  <Ionicons name="arrow-forward" size={16} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
          {/* AR Visualization Section */}
          <View style={styles.arSection}>
            <Text style={styles.arTitle}>AR Visualization</Text>
            <View style={styles.arContainer}>
              <TouchableOpacity 
                style={styles.cameraButton}
                onPress={() => navigation.navigate('ARView')}
              >
                <Ionicons name="camera-outline" size={40} color="#3B82F6" />
              </TouchableOpacity>
              <Text style={styles.arInstructions}>
                Point your camera at a surface to visualize materials in your space
              </Text>
              <TouchableOpacity 
                style={styles.launchARButton}
                onPress={() => navigation.navigate('ARView')}
              >
                <Ionicons name="cube-outline" size={20} color="white" />
                <Text style={styles.launchARText}>Launch AR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// AR View Screen (Placeholder for AR functionality)
function ARViewScreen({ navigation }: { navigation: StackNavigationProp<RootStackParamList, 'ARView'> }) {
  return (
    <SafeAreaView style={styles.arViewContainer}>
      <View style={styles.arHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.arHeaderTitle}>AR Visualization</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.arContent}>
        <Text style={styles.arPlaceholderText}>
          AR Camera View
          {'\n'}(This would integrate with ARKit/ARCore)
        </Text>
      </View>
      
      <View style={styles.arControls}>
        <TouchableOpacity style={styles.arControlButton}>
          <Ionicons name="add-circle-outline" size={30} color="white" />
          <Text style={styles.arControlText}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.arControlButton}>
          <Ionicons name="move" size={30} color="white" />
          <Text style={styles.arControlText}>Move</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.arControlButton}>
          <Ionicons name="resize-outline" size={30} color="white" />
          <Text style={styles.arControlText}>Scale</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.arControlButton}>
          <Ionicons name="trash-outline" size={30} color="white" />
          <Text style={styles.arControlText}>Delete</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.materialSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {initialData.materials.map(material => (
            <TouchableOpacity key={material.id} style={styles.materialSelectorItem}>
              <View style={styles.materialSelectorImage} />
              <Text style={styles.materialSelectorName}>{material.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Placeholder screens for other tabs
function InventoryScreen() {
  return (
    <SafeAreaView style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Inventory Screen</Text>
    </SafeAreaView>
  );
}

function ProgressScreen() {
  return (
    <SafeAreaView style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Progress Screen</Text>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Profile Screen</Text>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
    color: '#1F2937',
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  challengeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  challengeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    width: 70,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  difficultyStars: {
    flexDirection: 'row',
  },
  statusBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
  budgetCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  budgetTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  budgetSpent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
  },
  budgetRemaining: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  budgetProgressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginVertical: 12,
    overflow: 'hidden',
  },
  budgetProgress: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  viewBudgetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 8,
  },
  viewBudgetText: {
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 8,
  },
  tabHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  materialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  materialPreviewCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  materialImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  materialImage: {
    width: 60,
    height: 60,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  materialPreviewInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  materialName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  materialPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  materialUnit: {
    fontSize: 12,
    color: '#6B7280',
  },
  addToProjectButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
  },
  addToProjectText: {
    fontSize: 12,
    color: '#3B82F6',
    marginRight: 4,
  },
  materialsContainer: {
    padding: 16,
  },
  materialsFullGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  materialCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  materialPriceTag: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButtonText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  arSection: {
    marginTop: 24,
  },
  arTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1F2937',
  },
  arContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  arInstructions: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  launchARButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  launchARText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#6B7280',
  },
  arViewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  arHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  arHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  arContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
    margin: 16,
    borderRadius: 12,
  },
  arPlaceholderText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  arControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  arControlButton: {
    alignItems: 'center',
  },
  arControlText: {
    color: 'white',
    marginTop: 4,
  },
  materialSelector: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  materialSelectorItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 60,
  },
  materialSelectorImage: {
    width: 40,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 4,
  },
  materialSelectorName: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});