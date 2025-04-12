import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // Adjusted the path to the correct location

type ChallengeDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChallengeDetails'>;

export default function ChallengeDetailsScreen({ navigation }: { navigation: ChallengeDetailsScreenNavigationProp }) {
  // Challenge data
  const challenge = {
    title: 'Build a Modern House',
    status: 'In Progress',
    description: 'Design and build a modern single-family home that meets all building codes and stays within the assigned budget. Your design should include at least 3 bedrooms, 2 bathrooms, a kitchen, living room, and a garage.',
    learningObjectives: [
      'Understand real-world construction costs and budgeting',
      'Learn to prioritize essential elements within budget constraints',
      'Apply architectural principles to create functional spaces',
      'Practice cost estimation and material selection'
    ],
    budget: 200000,
    dueDate: 'May 15, 2023',
    daysRemaining: 14,
    progress: {
      overall: 45,
      steps: [
        { id: 1, title: 'Review Challenge Requirements', status: 'Completed' },
        { id: 2, title: 'Create Initial Design', status: 'Completed' },
        { id: 3, title: 'Select Materials', status: 'In Progress' },
        { id: 4, title: 'Finalize Construction', status: 'Not Started' },
        { id: 5, title: 'Submit for Evaluation', status: 'Not Started' }
      ]
    },
    budgetStatus: {
      total: 200000,
      spent: 85750,
      remaining: 114250,
      usage: 42
    }
  };

  const getStepIcon = (step: { id: number; status: 'Completed' | 'In Progress' | 'Not Started' }) => {
      switch (step.status) {
        case 'Completed':
          return <Ionicons name="checkmark-circle" size={20} color="#10B981" />;
        case 'In Progress':
          return <Ionicons name="time" size={20} color="#3B82F6" />;
        case 'Not Started':
        default:
          return <Text style={styles.stepNumber}>{step.id}</Text>;
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      {/* Left Panel */}
      <View style={styles.leftPanel}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="business-outline" size={20} color="white" />
            <Text style={styles.headerTitle}>Challenge Details</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Challenge Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{challenge.title}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{challenge.status}</Text>
            </View>
          </View>

          {/* Building Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="business-outline" size={60} color="#94A3B8" />
          </View>

          {/* Challenge Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Challenge Description</Text>
            <Text style={styles.description}>{challenge.description}</Text>
          </View>

          {/* Learning Objectives */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Objectives</Text>
            <View style={styles.objectivesList}>
              {challenge.learningObjectives.map((objective, index) => (
                <View key={index} style={styles.objectiveItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.objectiveText}>{objective}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Budget */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="cash-outline" size={20} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Budget</Text>
            </View>
            <Text style={styles.budgetAmount}>${challenge.budget.toLocaleString()}</Text>
            <Text style={styles.budgetNote}>Assigned by instructor</Text>
          </View>

          {/* Due Date */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="time-outline" size={20} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Due Date</Text>
            </View>
            <Text style={styles.dueDate}>{challenge.dueDate}</Text>
            <Text style={styles.daysRemaining}>{challenge.daysRemaining} days remaining</Text>
          </View>
        </ScrollView>
      </View>

      {/* Right Panel */}
      <View style={styles.rightPanel}>
        <Text style={styles.panelTitle}>Challenge Progress</Text>

        {/* Progress Steps */}
        <View style={styles.progressSteps}>
          {challenge.progress.steps.map((step, index) => (
            <View key={index} style={styles.progressStep}>
              <View style={styles.stepIconContainer}>
                {step.status === 'Completed' ? (
                  <View style={styles.completedStep}>
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                ) : (
                  <View style={[
                    styles.stepCircle, 
                    step.status === 'In Progress' ? styles.inProgressStep : styles.notStartedStep
                  ]}>
                    <Text style={[
                      styles.stepNumber,
                      step.status === 'In Progress' ? styles.inProgressText : styles.notStartedText
                    ]}>{step.id}</Text>
                  </View>
                )}
                {index < challenge.progress.steps.length - 1 && (
                  <View style={styles.stepConnector} />
                )}
              </View>
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={[
                  styles.stepStatus,
                  step.status === 'Completed' ? styles.completedText :
                  step.status === 'In Progress' ? styles.inProgressText : styles.notStartedText
                ]}>{step.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Overall Progress */}
        <View style={styles.overallProgressContainer}>
          <Text style={styles.overallProgressLabel}>Overall Progress</Text>
          <Text style={styles.overallProgressValue}>{challenge.progress.overall}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${challenge.progress.overall}%` }]} />
        </View>

        {/* Budget Status */}
        <View style={styles.budgetStatusContainer}>
          <Text style={styles.budgetStatusTitle}>Budget Status</Text>
          
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Total Budget</Text>
            <Text style={styles.budgetTotalValue}>${challenge.budgetStatus.total.toLocaleString()}</Text>
          </View>
          
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Spent</Text>
            <Text style={styles.budgetSpentValue}>${challenge.budgetStatus.spent.toLocaleString()}</Text>
          </View>
          
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Remaining</Text>
            <Text style={styles.budgetRemainingValue}>${challenge.budgetStatus.remaining.toLocaleString()}</Text>
          </View>
          
          <View style={styles.budgetUsageContainer}>
            <Text style={styles.budgetUsageLabel}>Budget Usage</Text>
            <Text style={styles.budgetUsageValue}>{challenge.budgetStatus.usage}%</Text>
          </View>
          
          <View style={styles.budgetProgressBarContainer}>
            <View style={[styles.budgetProgressBar, { width: `${challenge.budgetStatus.usage}%` }]} />
          </View>
          
          <TouchableOpacity style={styles.viewBudgetButton}>
            <Ionicons name="cash-outline" size={16} color="#3B82F6" />
            <Text style={styles.viewBudgetText}>View Budget Details</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.arModeButton}
            onPress={() => navigation.navigate('ARView')}
          >
            <Text style={styles.arModeButtonText}>Enter AR Mode</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.visitStoreButton}
            onPress={() => navigation.navigate('Materials')}
          >
            <Ionicons name="cart-outline" size={20} color="#3B82F6" />
            <Text style={styles.visitStoreButtonText}>Visit Store</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
  },
  leftPanel: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  rightPanel: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0891B2',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statusBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '500',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  objectivesList: {
    marginTop: 4,
  },
  objectiveItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 8,
  },
  objectiveText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  budgetAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  budgetNote: {
    fontSize: 12,
    color: '#6B7280',
  },
  dueDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0891B2',
    marginBottom: 4,
  },
  daysRemaining: {
    fontSize: 12,
    color: '#6B7280',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  progressSteps: {
    marginBottom: 24,
  },
  progressStep: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  completedStep: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  inProgressStep: {
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  notStartedStep: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepConnector: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  stepStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  completedText: {
    color: '#10B981',
  },
  inProgressText: {
    color: '#3B82F6',
  },
  notStartedText: {
    color: '#6B7280',
  },
  overallProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  overallProgressLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  overallProgressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  budgetStatusContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  budgetStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
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
  budgetTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  budgetSpentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
  },
  budgetRemainingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  budgetUsageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  budgetUsageLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  budgetUsageValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  budgetProgressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  budgetProgressBar: {
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
  },
  viewBudgetText: {
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  arModeButton: {
    flex: 1,
    backgroundColor: '#0891B2',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  arModeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  visitStoreButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  visitStoreButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 8,
  },
});