import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 600,
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export const colors = {
  primary: '#000000',
  background: '#000000',
  white: '#FFFFFF',
  lowRisk: '#4CAF50',
  moderateRisk: '#FF9800',
  highRisk: '#F44336',
};