import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './globalStyles';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        This application is for educational purposes only. Always consult with a healthcare professional for medical advice.
      </Text>
      <Text style={styles.Texts}>
        Yashank Kothari    
      </Text>
      <Text style={styles.Texts}>
        Peeth Chowdhary    
      </Text>
      <Text style={styles.Texts}>
        Manas Mapuskar    
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    fontSize: 12,
    color: '#E0E0E0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  Texts: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  }

});

export default Footer;