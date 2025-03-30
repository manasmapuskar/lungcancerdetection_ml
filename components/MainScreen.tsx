// import React, { useState, useRef } from 'react';
// import { 
//   View, 
//   SafeAreaView, 
//   ScrollView, 
//   ActivityIndicator, 
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Animated,
//   Alert
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import axios from 'axios';
// import { FontAwesome5 } from '@expo/vector-icons';

// import { globalStyles, colors } from './globalStyles';
// import { ImageState, PredictionResult } from './typedefinations';

// import Headers from './Headers';
// import ResultsDisplay from './ResultsDisplay';
// import Footer from './Footer';
// import Hero from './hero';
// import UploadSection from './UploadSection';
// import LungCancerInfo from './LungCancerInfo';

// const MainScreen: React.FC = () => {
//   const [image, setImage] = useState<ImageState | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [prediction, setPrediction] = useState<PredictionResult | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const scrollViewRef = useRef<ScrollView>(null);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const handleImageSelected = (selectedImage: ImageState) => {
//     setImage(selectedImage);
//     setPrediction(null);
//     setError(null);
//   };

//   const handleClearResults = () => {
//     setPrediction(null);
//   };

//   const scrollToResults = () => {
//     if (scrollViewRef.current) {
//       setTimeout(() => {
//         scrollViewRef.current?.scrollTo({ y: 500, animated: true });
//       }, 500);
//     }
//   };

//   const fadeInResults = () => {
//     fadeAnim.setValue(0);
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true
//     }).start();
//   };

//   const uploadImage = async () => {
//     if (!image) {
//       Alert.alert("No Image", "Please select a CT scan image first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setPrediction(null);
    
//     const formData = new FormData();
    
//     // Correctly append the image to FormData
//     formData.append('file', {
//       uri: image.uri,
//       name: image.name || 'upload.jpg',
//       type: image.type || 'image/jpeg'
//     });
    
//     try {
//       const res = await axios.post('http://192.168.0.175:5000/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 30000 // 30 second timeout
//       });
      
//       const probability = res.data.lung_cancer_probability;
      
//       const getRiskDetails = (prob: number): { riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk', riskColor: string } => {
//         if (prob < 0.3) return { riskLevel: 'Low Risk', riskColor: colors.lowRisk };
//         if (prob < 0.7) return { riskLevel: 'Moderate Risk', riskColor: colors.moderateRisk };
//         return { riskLevel: 'High Risk', riskColor: colors.highRisk };
//       };

//       const { riskLevel, riskColor } = getRiskDetails(probability);
      
//       // Set prediction state with animation
//       setPrediction({ probability, riskLevel, riskColor });
//       fadeInResults();
//       scrollToResults();
      
//       console.log("Prediction set:", { probability, riskLevel, riskColor });
//     } catch (error) {
//       console.error('Upload error:', error);
//       setError("Unable to process this image. Please try again or use a different CT scan.");
//       setPrediction({ probability: 0, riskLevel: 'Error', riskColor: colors.highRisk });
//       scrollToResults();
//     }

//     setLoading(false);
//   };

//   return (
//     <SafeAreaView style={globalStyles.safeArea}>
//       <LinearGradient 
//         colors={['#1E293B', '#0F172A']} 
//         style={globalStyles.gradient}
//       >
//         <ScrollView 
//           ref={scrollViewRef}
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={globalStyles.container}>
//             <Headers />
//             <Hero />
            
//             <UploadSection 
//               onImageSelected={handleImageSelected} 
//               onAnalyze={uploadImage}
//               selectedImage={image}
//             />
            
//             {/* Analyze Button with icon - Visible when image is selected */}
//             {image && (
//               <TouchableOpacity 
//                 style={[
//                   styles.analyzeButton, 
//                   loading && styles.disabledButton
//                 ]} 
//                 onPress={uploadImage}
//                 disabled={loading}
//               >
//                 <FontAwesome5 name="microscope" size={22} color="#fff" style={styles.buttonIcon} />
//                 <Text style={styles.analyzeText}>
//                   {loading ? 'Analyzing...' : 'Analyze CT Scan'}
//                 </Text>
//               </TouchableOpacity>
//             )}
            
//             {/* Error message */}
//             {error && !loading && (
//               <View style={styles.errorContainer}>
//                 <FontAwesome5 name="exclamation-circle" size={20} color="#FCA5A5" />
//                 <Text style={styles.errorText}>{error}</Text>
//               </View>
//             )}
            
//             {/* Results Section with fade-in animation */}
//             {prediction && (
//               <Animated.View style={[
//                 styles.cardContainer,
//                 { opacity: fadeAnim }
//               ]}>
//                 <ResultsDisplay 
//                   probability={prediction.probability}
//                   riskLevel={prediction.riskLevel}
//                   riskColor={prediction.riskColor}
//                   onClose={handleClearResults}
//                 />
//               </Animated.View>
//             )}
            
//             {/* Loading Indicator */}
//             {loading && (
//               <View style={styles.loaderContainer}>
//                 <ActivityIndicator 
//                   size="large" 
//                   color={colors.white} 
//                   style={styles.loader}
//                 />
//                 <Text style={styles.loaderText}>Analyzing your CT scan...</Text>
//                 <Text style={styles.loaderSubText}>Our AI is examining the image for potential abnormalities</Text>
//               </View>
//             )}

//             <LungCancerInfo />
//             <Footer />
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 20,  
//   },
//   cardContainer: {
//     marginTop: 20,
//     paddingHorizontal: 5,
//   },
//   loaderContainer: {
//     marginTop: 20,
//     padding: 25,
//     backgroundColor: 'rgba(15, 23, 42, 0.85)',
//     borderRadius: 16,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   loader: {
//     marginBottom: 15,
//   },
//   loaderText: {
//     color: colors.white,
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   loaderSubText: {
//     color: 'rgba(255, 255, 255, 0.7)',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   analyzeButton: {
//     marginTop: 20,
//     backgroundColor: '#3B82F6',
//     paddingVertical: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   disabledButton: {
//     backgroundColor: '#1E40AF',
//     opacity: 0.7,
//   },
//   analyzeText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   buttonIcon: {
//     marginRight: 10,
//   },
//   errorContainer: {
//     marginTop: 15,
//     padding: 12,
//     backgroundColor: 'rgba(220, 38, 38, 0.15)',
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: '#FCA5A5',
//     fontSize: 14,
//     marginLeft: 10,
//     flex: 1,
//   }
// });

// export default MainScreen;



import React, { useState, useRef } from 'react';
import { 
  View, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

import { globalStyles, colors } from './globalStyles';
import { ImageState, PredictionResult } from './typedefinations';

import Headers from './Headers';
import ResultsDisplay from './ResultsDisplay';
import Footer from './Footer';
import Hero from './hero';
import UploadSection from './UploadSection';
import LungCancerInfo from './LungCancerInfo';


const MainScreen: React.FC = () => {
  
  const [image, setImage] = useState<ImageState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleImageSelected = (selectedImage: ImageState) => {
    setImage(selectedImage);
    setPrediction(null);
    setError(null);
    setRetryCount(0);
  };

  const handleClearResults = () => {
    setPrediction(null);
  };

  const scrollToResults = () => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 500, animated: true });
      }, 500);
    }
  };

  const fadeInResults = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    uploadImage();
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select a CT scan image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);
    
    const formData = new FormData();
    
    // Correctly append the image to FormData
    formData.append('file', {
      uri: image.uri,
      name: image.name || 'upload.jpg',
      type: image.type || 'image/jpeg'
    });
    
    try {
      const res = await axios.post('http://192.168.0.175:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000 // 30 second timeout
      });
      
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      
      const probability = res.data.lung_cancer_probability;
      
      const getRiskDetails = (prob: number): { riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk', riskColor: string } => {
        if (prob < 0.3) return { riskLevel: 'Low Risk', riskColor: colors.lowRisk };
        if (prob < 0.7) return { riskLevel: 'Moderate Risk', riskColor: colors.moderateRisk };
        return { riskLevel: 'High Risk', riskColor: colors.highRisk };
      };

      const { riskLevel, riskColor } = getRiskDetails(probability);
      
      // Set prediction state with animation
      setPrediction({ probability, riskLevel, riskColor });
      fadeInResults();
      scrollToResults();
      
      console.log("Prediction set:", { probability, riskLevel, riskColor });
    } catch (error: any) {
      console.error('Upload error:', error);
      
      let errorMessage = "Unable to process this image. Please try again or use a different CT scan.";
      
      // Check for network errors
      if (error.code === 'ECONNABORTED') {
        errorMessage = "Connection timed out. Please check your network and try again.";
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 413) {
          errorMessage = "Image is too large. Please use a smaller file size.";
        } else if (error.response.status === 415) {
          errorMessage = "Unsupported file format. Please use JPEG or PNG format.";
        } else if (error.response.status >= 500) {
          errorMessage = "Server error. Our team has been notified. Please try again later.";
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your connection and try again.";
      }
      
      setError(errorMessage);
      setPrediction({ probability: 0, riskLevel: 'Error', riskColor: colors.highRisk });
      scrollToResults();
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View 
        style={globalStyles.gradient}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={globalStyles.container}>
            <Headers />
            <Hero />
            
            <UploadSection 
              onImageSelected={handleImageSelected} 
              onAnalyze={uploadImage}
              selectedImage={image}
            />
            
            {/* Analyze Button with icon - Visible when image is selected */}
            {image && (
              <TouchableOpacity 
                style={[
                  styles.analyzeButton, 
                  loading && styles.disabledButton
                ]} 
                onPress={uploadImage}
                disabled={loading}
              >
                <FontAwesome5 name="microscope" size={22} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.analyzeText}>
                  {loading ? 'Analyzing...' : 'Analyze CT Scan'}
                </Text>
              </TouchableOpacity>
            )}
            
            {/* Error message with retry button */}
            {error && !loading && (
              <View style={styles.errorContainer}>
                <View style={styles.errorContent}>
                  <FontAwesome5 name="exclamation-circle" size={20} color="#FCA5A5" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={handleRetry}
                >
                  <FontAwesome5 name="redo" size={16} color="#fff" />
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {/* Troubleshooting tips - show after multiple failed attempts */}
            {retryCount >= 2 && error && (
              <View style={styles.troubleshootContainer}>
                <Text style={styles.troubleshootTitle}>Troubleshooting Tips:</Text>
                <Text style={styles.troubleshootItem}>• Ensure the image is a clear CT scan</Text>
                <Text style={styles.troubleshootItem}>• Try a different CT scan image</Text>
                <Text style={styles.troubleshootItem}>• Check your internet connection</Text>
                <Text style={styles.troubleshootItem}>• Ensure the image format is JPEG or PNG</Text>
                <Text style={styles.troubleshootItem}>• If using WiFi, try switching to mobile data</Text>
              </View>
            )}
            
            {/* Results Section with fade-in animation */}
            {prediction && (
              <Animated.View style={[
                styles.cardContainer,
                { opacity: fadeAnim }
              ]}>
                <ResultsDisplay 
                  probability={prediction.probability}
                  riskLevel={prediction.riskLevel}
                  riskColor={prediction.riskColor}
                  onClose={handleClearResults}
                />
              </Animated.View>
            )}
            
            {/* Loading Indicator with more detail */}
            {loading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator 
                  size="large" 
                  color={colors.white} 
                  style={styles.loader}
                />
                <Text style={styles.loaderText}>Analyzing your CT scan...</Text>
                <Text style={styles.loaderSubText}>Our AI is examining the image for potential abnormalities</Text>
                
                {/* Progress indicators to make waiting less boring */}
                <View style={styles.progressSteps}>
                  <View style={styles.progressStep}>
                    <View style={[styles.progressDot, styles.activeDot]} />
                    <Text style={styles.progressText}>Loading</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={styles.progressStep}>
                    <View style={[styles.progressDot, loading && styles.activeDot]} />
                    <Text style={styles.progressText}>Processing</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={styles.progressStep}>
                    <View style={styles.progressDot} />
                    <Text style={styles.progressText}>Results</Text>
                  </View>
                </View>
              </View>
            )}

            <LungCancerInfo />
            <Footer />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,  
  },
  cardContainer: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  loaderContainer: {
    marginTop: 20,
    padding: 25,
    backgroundColor: '#000',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loader: {
    marginBottom: 15,
  },
  loaderText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  loaderSubText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 5,
  },
  activeDot: {
    backgroundColor: '#60A5FA',
  },
  progressLine: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 50,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  analyzeButton: {
    marginTop: 50,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#1E40AF',
    opacity: 0.7,
  },
  analyzeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 10,
  },
  errorContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.2)',
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  retryText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  troubleshootContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  troubleshootTitle: {
    color: '#93C5FD',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  troubleshootItem: {
    color: '#BFDBFE',
    fontSize: 14,
    lineHeight: 22,
  }
});

export default MainScreen;