import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './globalStyles';

const InfoSection: React.FC = () => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>About Lung Cancer</Text>
      
      <Text style={styles.infoText}>
        Lung cancer is one of the most common cancers worldwide, with over 2 million new cases diagnosed each year. Early detection is crucial for successful treatment.
      </Text>
      
      <Text style={styles.infoSubtitle}>Warning Signs:</Text>
      <View style={styles.bulletList}>
        {[
          "Persistent cough that doesn't go away",
          'Chest pain that worsens with deep breathing',
          'Hoarseness or change in voice',
          'Unexplained weight loss',
          'Shortness of breath',
          'Coughing up blood'
        ].map((sign, index) => (
          <Text key={index} style={styles.bulletItem}>• {sign}</Text>
        ))}
      </View>
      
      <Text style={styles.infoSubtitle}>Risk Factors:</Text>
      <View style={styles.bulletList}>
        {[
          'Smoking (responsible for 80-90% of cases)',
          'Exposure to secondhand smoke',
          'Exposure to radon gas',
          'Family history of lung cancer',
          'Exposure to asbestos and other carcinogens'
        ].map((factor, index) => (
          <Text key={index} style={styles.bulletItem}>• {factor}</Text>
        ))}
      </View>
      
      <Text style={styles.infoSubtitle}>Prevention:</Text>
      <Text style={styles.infoText}>
        The best way to prevent lung cancer is to never smoke or to quit smoking. Regular screenings for high-risk individuals can help detect cancer early when it's most treatable.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 15,
    lineHeight: 20,
  },
  infoSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  bulletList: {
    marginBottom: 15,
  },
  bulletItem: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default InfoSection;