import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './globalStyles';
import { PredictionResult } from './typedefinations';

interface ResultDisplayProps extends PredictionResult {}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  probability, 
  riskLevel, 
  riskColor 
}) => {
  const formatProbability = () => {
    return `${(probability * 100).toFixed(2)}%`;
  };

  return (
    <View style={[styles.resultCard, { borderColor: riskColor }]}>
      <Text style={styles.resultTitle}>Analysis Results</Text>
      
      <View style={styles.resultContent}>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Probability:</Text>
          <Text style={[styles.resultValue, { color: riskColor }]}>
            {formatProbability()}
          </Text>
        </View>
        
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Assessment:</Text>
          <Text style={[styles.resultValue, { color: riskColor }]}>
            {riskLevel}
          </Text>
        </View>
        
        <Text style={styles.resultDisclaimer}>
          This is an AI-assisted analysis and should not replace professional medical advice.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  resultContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 15,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultLabel: {
    color: colors.white,
    fontSize: 16,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultDisclaimer: {
    fontSize: 12,
    color: '#E0E0E0',
    marginTop: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default ResultDisplay;