// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
// import { colors } from './globalStyles';
// import { PredictionResult } from './typedefinations';

// interface ResultsDisplayProps extends PredictionResult {}

// const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ probability, riskLevel, riskColor }) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <View style={[styles.resultCard, { borderColor: riskColor }]}>
//       <TouchableOpacity onPress={() => setExpanded(!expanded)}>
//         <Text style={styles.resultTitle}>Analysis Results</Text>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Probability:</Text>
//           <Text style={[styles.resultValue, { color: riskColor }]}>
//             {(probability * 100).toFixed(2)}%
//           </Text>
//         </View>
//         <View style={styles.resultItem}>
//           <Text style={styles.resultLabel}>Assessment:</Text>
//           <Text style={[styles.resultValue, { color: riskColor }]}>
//             {riskLevel}
//           </Text>
//         </View>
//       </TouchableOpacity>

//       {expanded && (
//         <View style={styles.expandedContent}>
//           <Text style={styles.chartLabel}>Probability Distribution</Text>

//           {/* Custom Bar Chart */}
//           <View style={styles.chartContainer}>
//             <View style={styles.barLabelContainer}>
//               <Text style={styles.barLabel}>Benign</Text>
//               <Text style={styles.barLabel}>Malignant</Text>
//             </View>
//             <View style={styles.barsWrapper}>
//               <View
//                 style={[
//                   styles.bar,
//                   {
//                     width: `${(1 - probability) * 100}%`,
//                     backgroundColor: 'rgba(74, 222, 128, 0.8)',
//                   },
//                 ]}
//               />
//               <View
//                 style={[
//                   styles.bar,
//                   {
//                     width: `${probability * 100}%`,
//                     backgroundColor: 'rgba(248, 113, 113, 0.8)',
//                   },
//                 ]}
//               />
//             </View>
//           </View>

//           <Text style={styles.resultDisclaimer}>
//             This is an AI-assisted analysis and should not replace professional medical advice.
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   resultCard: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 20,
//     borderLeftWidth: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   resultTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.white,
//     marginBottom: 15,
//   },
//   resultItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   resultLabel: {
//     color: colors.white,
//     fontSize: 16,
//   },
//   resultValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   expandedContent: {
//     marginTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(255, 255, 255, 0.3)',
//     paddingTop: 15,
//   },
//   chartLabel: {
//     fontSize: 16,
//     color: colors.white,
//     marginBottom: 8,
//   },
//   chartContainer: {
//     marginTop: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 10,
//     padding: 10,
//   },
//   barLabelContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   barLabel: {
//     fontSize: 14,
//     color: colors.white,
//   },
//   barsWrapper: {
//     flexDirection: 'row',
//     height: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   bar: {
//     height: '100%',
//   },
//   resultDisclaimer: {
//     fontSize: 12,
//     color: '#E0E0E0',
//     marginTop: 15,
//     fontStyle: 'italic',
//     textAlign: 'center',
//   },
// });

// export default ResultsDisplay;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { colors } from './globalStyles';
import { PredictionResult } from './typedefinations';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';

interface ResultsDisplayProps extends PredictionResult {
  onClose?: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  probability, 
  riskLevel, 
  riskColor,
  onClose 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [spinValue] = useState(new Animated.Value(0));
  
  const startSpinAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const handleExpandToggle = () => {
    setExpanded(!expanded);
    startSpinAnimation();
  };

  // Get recommendation text based on risk level
  const getRecommendation = () => {
    if (riskLevel === 'Error') {
      return "An error occurred. Please try uploading your scan again or contact support.";
    }
    
    if (riskLevel === 'Low Risk') {
      return "Follow-up recommended in 12 months. Maintain healthy lifestyle habits.";
    } else if (riskLevel === 'Moderate Risk') {
      return "Suggest follow-up in 3-6 months. Consider consulting a pulmonologist.";
    } else {
      return "Urgent medical consultation recommended. Please see a specialist within 1-2 weeks.";
    }
  };

  // Get icon based on risk level
  const getRiskIcon = () => {
    if (riskLevel === 'Error') {
      return <FontAwesome5 name="exclamation-triangle" size={28} color={riskColor} />;
    }
    
    if (riskLevel === 'Low Risk') {
      return <AntDesign name="checkcircle" size={28} color={riskColor} />;
    } else if (riskLevel === 'Moderate Risk') {
      return <AntDesign name="exclamationcircle" size={28} color={riskColor} />;
    } else {
      return <AntDesign name="warning" size={28} color={riskColor} />;
    }
  };

  return (
    <View style={[styles.resultCard, { borderColor: riskColor }]}>
      {/* Header with close button */}
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          {getRiskIcon()}
          <Text style={styles.resultTitle}>Analysis Results</Text>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* Primary results display */}
      <View style={styles.mainResults}>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Probability:</Text>
          <Text style={[styles.resultValue, { color: riskColor }]}>
            {riskLevel === 'Error' ? 'N/A' : `${(probability * 100).toFixed(1)}%`}
          </Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Assessment:</Text>
          <Text style={[styles.resultValue, { color: riskColor }]}>
            {riskLevel}
          </Text>
        </View>
      </View>

      {/* Doctor recommendation */}
      <View style={styles.recommendationContainer}>
        <FontAwesome5 name="user-md" size={16} color={colors.white} style={styles.recIcon} />
        <Text style={styles.recommendationText}>
          {getRecommendation()}
        </Text>
      </View>

      {/* Expand/collapse button */}
      <TouchableOpacity 
        style={styles.expandButton}
        onPress={handleExpandToggle}
      >
        <Text style={styles.expandText}>
          {expanded ? 'Hide Details' : 'View Details'}
        </Text>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Feather 
            name="chevron-down" 
            size={20} 
            color={colors.white} 
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Expanded content */}
      {expanded && (
        <Animated.View style={styles.expandedContent}>
          <Text style={styles.chartLabel}>Risk Assessment Analysis</Text>

          {/* Risk gauge */}
          <View style={styles.gaugeContainer}>
            <View style={styles.gaugeLabels}>
              <Text style={styles.gaugeLabel}>Low</Text>
              <Text style={styles.gaugeLabel}>Moderate</Text>
              <Text style={styles.gaugeLabel}>High</Text>
            </View>
            <View style={styles.gauge}>
              <View style={styles.gaugeBackground} />
              {riskLevel !== 'Error' && (
                <View 
                  style={[
                    styles.gaugeIndicator, 
                    { left: `${Math.min(probability * 100, 95)}%` }
                  ]} 
                />
              )}
            </View>
          </View>

          {/* Custom Bar Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.barChartTitle}>Probability Distribution</Text>
            <View style={styles.barLabelContainer}>
              <Text style={styles.barLabel}>Benign</Text>
              <Text style={styles.barLabel}>Malignant</Text>
            </View>
            <View style={styles.barsWrapper}>
              {riskLevel !== 'Error' ? (
                <>
                  <View
                    style={[
                      styles.bar,
                      {
                        width: `${(1 - probability) * 100}%`,
                        backgroundColor: 'rgba(74, 222, 128, 0.8)',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      {
                        width: `${probability * 100}%`,
                        backgroundColor: 'rgba(248, 113, 113, 0.8)',
                      },
                    ]}
                  />
                </>
              ) : (
                <View style={styles.errorBar} />
              )}
            </View>
          </View>

          {/* Facts about lung cancer based on risk level */}
          <View style={styles.factsContainer}>
            <Text style={styles.factsTitle}>Key Facts:</Text>
            {riskLevel === 'Low Risk' && (
              <>
                <Text style={styles.factItem}>• Regular screening increases survival rates by up to 20%</Text>
                <Text style={styles.factItem}>• Quitting smoking reduces risk by 50% after 10 years</Text>
                <Text style={styles.factItem}>• Exercise and diet play important roles in prevention</Text>
              </>
            )}
            {riskLevel === 'Moderate Risk' && (
              <>
                <Text style={styles.factItem}>• Early-stage lung cancer has a 5-year survival rate of 56%</Text>
                <Text style={styles.factItem}>• Further diagnostic tests may include PET scan or biopsy</Text>
                <Text style={styles.factItem}>• Follow-up scans every 3-6 months are typically recommended</Text>
              </>
            )}
            {riskLevel === 'High Risk' && (
              <>
                <Text style={styles.factItem}>• Prompt medical consultation is critical for best outcomes</Text>
                <Text style={styles.factItem}>• Treatment options may include surgery, radiation, or chemotherapy</Text>
                <Text style={styles.factItem}>• New targeted therapies have improved prognosis significantly</Text>
              </>
            )}
            {riskLevel === 'Error' && (
              <Text style={styles.factItem}>• Please try again or use a different CT scan image</Text>
            )}
          </View>

          <Text style={styles.resultDisclaimer}>
            This is an AI-assisted analysis and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis.
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 10,
  },
  closeButton: {
    padding: 5,
  },
  mainResults: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultLabel: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recommendationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  recIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  recommendationText: {
    color: colors.white,
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
  },
  expandText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 5,
  },
  expandedContent: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 20,
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 12,
  },
  barChartTitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  gaugeContainer: {
    marginBottom: 24,
  },
  gaugeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  gaugeLabel: {
    color: colors.white,
    fontSize: 14,
  },
  gauge: {
    height: 10,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'relative',
  },
  gaugeBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    // Create gradient appearance with multiple views
    flexDirection: 'row',
  },
  gaugeIndicator: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    top: -2.5,
    marginLeft: -7.5,
    borderWidth: 2,
    borderColor: '#000',
  },
  chartContainer: {
    marginVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
  },
  barLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  barsWrapper: {
    flexDirection: 'row',
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
  errorBar: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
    borderStyle: 'dashed',
  },
  factsContainer: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
  },
  factsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 10,
  },
  factItem: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
  resultDisclaimer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ResultsDisplay;