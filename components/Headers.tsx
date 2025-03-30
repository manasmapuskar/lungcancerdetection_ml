import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Headers = () => {
  return (
    <View style={styles.header}> 
      <View style={styles.container}>
        {/* Logo Section */}
        {/* <View style={styles.logoContainer}>
          <LinearGradient 
            colors={['#3b82f6', '#1e40af']} 
            style={styles.logoCircle}
          >
            <View style={styles.logoInnerCircle} />
          </LinearGradient>
          <Text style={styles.logoText}>med</Text>
        </View> */}

        
        {/* <View style={styles.navContainer}>
          <TouchableOpacity><Text style={styles.navText}>Home</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navText}>About</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navText}>Scan</Text></TouchableOpacity>
        </View> */}

        {/* Sign In Button */}
        {/* <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 50,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glassmorph: {
    position: 'absolute',
    height: '40%',
    width: '20%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(89, 131, 83, 0.09)',
    borderRadius: 16, // Converted 1em to pixels (16px)
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoInnerCircle: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  navContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  navText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Headers;
