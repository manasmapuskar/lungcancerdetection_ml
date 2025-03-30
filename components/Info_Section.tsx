import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const InfoCard = ({ title, items }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      )}
    />
  </View>
);

const Info_Section = () => {
  const warningSigns = [
    "Persistent cough that doesn't go away",
    "Chest pain that worsens with deep breathing",
    "Hoarseness or change in voice",
    "Unexplained weight loss",
    "Shortness of breath",
    "Coughing up blood"
  ];

  const riskFactors = [
    "Smoking (responsible for 80-90% of cases)",
    "Exposure to secondhand smoke",
    "Exposure to radon gas",
    "Family history of lung cancer",
    "Previous radiation therapy to the chest",
    "Exposure to asbestos, arsenic, or other carcinogens"
  ];

  const benefitsOfEarlyDetection = [
    "Significantly higher survival rates",
    "Less invasive treatment options",
    "Reduced treatment complications",
    "Better quality of life during treatment",
    "More treatment choices available",
    "Lower overall healthcare costs"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Lung Cancer</Text>
      <Text style={styles.description}>
        Lung cancer is one of the most common cancers worldwide, with over 2 million new cases
        diagnosed each year. Early detection is crucial for successful treatment.
      </Text>
      
      <View style={styles.cardsContainer}>
        <InfoCard title="Warning Signs" items={warningSigns} />
        <InfoCard title="Risk Factors" items={riskFactors} />
        <InfoCard title="Benefits of Early Detection" items={benefitsOfEarlyDetection} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    color: '#3b82f6',
    fontSize: 16,
    marginRight: 5,
  },
  listText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
});

export default Info_Section;
