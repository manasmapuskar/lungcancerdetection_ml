import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';



const Hero = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
        <Text style={styles.gradientText}>Lung Cancer</Text>
          <Text style={styles.title}>
              Detection
          </Text>
          <Text style={styles.description}>
            AI-Powered Early Detection Tool for Improved Diagnosis and Treatment Planning
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Start Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.iconContainer}>
              <FontAwesome name="check" size={16} color="white" />
            </View>
            <Text style={styles.infoText}>87.2% accuracy in early detection</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://your-image-url.com' }} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 190,
    backgroundColor: '#000000',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    lineHeight: 44,
    textAlign: 'center',
    color: 'white',
    padding: 20,
    marginTop: 10,
  },
  gradientText: {
    fontSize: 100,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    padding: 20,
    textAlign: 'center',
    color: 'white',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  outlineButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#3b82f6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    color: 'white',
  },
  imageContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 16,
  },
});

export default Hero;
