// import React from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';

// const InfoCard = ({ title, items }: { title: string; items: string[] }) => (
//   <View style={styles.card}>
//     <Text style={styles.cardTitle}>{title}</Text>
//     {items.map((item, index) => (
//       <Text key={index} style={styles.cardItem}>• {item}</Text>
//     ))}
//   </View>
// );

// const LungCancerInfo = () => {
//   const warningSigns = [
//     "Persistent cough that doesn't go away",
//     "Chest pain that worsens with deep breathing",
//     "Hoarseness or change in voice",
//     "Unexplained weight loss",
//     "Shortness of breath",
//     "Coughing up blood"
//   ];

//   const riskFactors = [
//     "Smoking (responsible for 80-90% of cases)",
//     "Exposure to secondhand smoke",
//     "Exposure to radon gas",
//     "Family history of lung cancer",
//     "Previous radiation therapy to the chest",
//     "Exposure to asbestos, arsenic, or other carcinogens"
//   ];

//   const benefitsOfEarlyDetection = [
//     "Significantly higher survival rates",
//     "Less invasive treatment options",
//     "Reduced treatment complications",
//     "Better quality of life during treatment",
//     "More treatment choices available",
//     "Lower overall healthcare costs"
//   ];

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.sectionTitle}>About Lung Cancer</Text>
//       <Text style={styles.sectionText}>
//         Lung cancer is one of the most common cancers worldwide, with over 2 million new cases
//         diagnosed each year. Early detection is crucial for successful treatment.
//       </Text>

//       <View style={styles.cardsContainer}>
//         <InfoCard title="Warning Signs" items={warningSigns} />
//         <InfoCard title="Risk Factors" items={riskFactors} />
//         <InfoCard title="Benefits of Early Detection" items={benefitsOfEarlyDetection} />
//       </View>

//       <View style={styles.infoBox}>
//         <Text style={styles.infoTitle}>How Our AI-Powered Detection Works</Text>
//         <Text style={styles.infoText}>
//           Our advanced AI algorithm has been trained on over 100,000 CT scan images to identify early signs of lung cancer 
//           with high accuracy. The system can detect nodules as small as 3mm and classify them based on malignancy risk. 
//           Results are available within seconds, helping radiologists and doctors make faster, more informed decisions.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#000000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//     marginBlockStart: 100,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4A90E2',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   sectionText: {
//     fontSize: 16,
//     color: '#ccc',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   cardsContainer: {
//     flexDirection: 'column',
//     gap: 10,
//   },
//   card: {
//     backgroundColor: '#1e1e1e',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4A90E2',
//     marginBottom: 5,
//   },
//   cardItem: {
//     fontSize: 14,
//     color: '#fff',
//   },
//   infoBox: {
//     backgroundColor: '#292929',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   infoTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4A90E2',
//     marginBottom: 5,
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#ccc',
//   },
// });

// export default LungCancerInfo;


import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const LungCancerInfo = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Lung Cancer</Text>
      <Text style={styles.description}>
        Lung cancer is one of the most common cancers worldwide, with over 2 million new cases diagnosed each year. Early detection is crucial for successful treatment.
      </Text>
      
      <View style={styles.gridContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Warning Signs</Text>
          <Text style={styles.listItem}>• Persistent cough that doesn’t go away</Text>
          <Text style={styles.listItem}>• Chest pain that worsens with deep breathing</Text>
          <Text style={styles.listItem}>• Hoarseness or change in voice</Text>
          <Text style={styles.listItem}>• Unexplained weight loss</Text>
          <Text style={styles.listItem}>• Shortness of breath</Text>
          <Text style={styles.listItem}>• Coughing up blood</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Risk Factors</Text>
          <Text style={styles.listItem}>• Smoking (responsible for 80-90% of cases)</Text>
          <Text style={styles.listItem}>• Exposure to secondhand smoke</Text>
          <Text style={styles.listItem}>• Exposure to radon gas</Text>
          <Text style={styles.listItem}>• Family history of lung cancer</Text>
          <Text style={styles.listItem}>• Previous radiation therapy to the chest</Text>
          <Text style={styles.listItem}>• Exposure to asbestos, arsenic, or other carcinogens</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Benefits of Early Detection</Text>
          <Text style={styles.listItem}>• Significantly higher survival rates</Text>
          <Text style={styles.listItem}>• Less invasive treatment options</Text>
          <Text style={styles.listItem}>• Reduced treatment complications</Text>
          <Text style={styles.listItem}>• Better quality of life during treatment</Text>
          <Text style={styles.listItem}>• More treatment choices available</Text>
          <Text style={styles.listItem}>• Lower overall healthcare costs</Text>
        </View>
      </View>

      <View style={styles.aiContainer}>
        <Text style={styles.aiTitle}>How Our AI-Powered Detection Works</Text>
        <Text style={styles.description}>
          Our advanced AI algorithm has been trained on over 100,000 CT scan images to identify early signs of lung cancer with high accuracy. The system can detect nodules as small as 3mm and classify them based on malignancy risk.
        </Text>
      </View>

    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    padding: 20,
    alignItems: "center",
    marginTop: 200,
  },
  title: {
    fontSize: 65,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins",
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
  description: {
    fontSize: 22,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: width > 600 ? "row" : "column",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: width > 600 ? "30%" : "100%",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 5,
  },
  listItem: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 3,
  },
  aiContainer: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
  },
  aiTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e90ff",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LungCancerInfo;
