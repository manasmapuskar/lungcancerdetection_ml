
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';

// const { width, height } = Dimensions.get('window');

// const UploadSection: React.FC = () => {
//   const [image, setImage] = useState<string | null>(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upload CT Scan Image</Text>
//       <Text style={styles.subtitle}>
//         Our AI system will analyze your CT scan and provide results within seconds
//       </Text>
//       <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
//         {image ? (
//           <Image source={{ uri: image }} style={styles.uploadedImage} />
//         ) : (
//           <Ionicons name="cloud-upload-outline" size={50} color="#4A90E2" />
//         )}
//         <Text style={styles.uploadText}>Drag and drop your CT scan image here, or</Text>
//         <TouchableOpacity style={styles.browseButton} onPress={pickImage}>
//           <Text style={styles.browseText}>Browse Files</Text>
//         </TouchableOpacity>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.analyzeButton}>
//         <Text style={styles.analyzeText}>Analyze Scan</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 60,
//     fontWeight: 'bold',
//     fontFamily: 'Poppins',
//     marginBottom: 10,
//   },
//   subtitle: {
//     color: '#aaa',
//     fontSize: 26,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   uploadBox: {
//     width: width * 0.8,
//     height: height * 0.4,
//     backgroundColor: '#111',
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#333',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   uploadedImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   uploadText: {
//     color: '#aaa',
//     fontSize: 14,
//     marginTop: 10,
//   },
//   browseButton: {
//     marginTop: 10,
//     backgroundColor: '#333',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   browseText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   analyzeButton: {
//     marginTop: 20,
//     backgroundColor: '#4A90E2',
//     width: width * 0.8,
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   analyzeText: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
// });

// export default UploadSection;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface UploadSectionProps {
  onImageSelected: (uri: string) => void;
  onAnalyze: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelected, onAnalyze }) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onImageSelected(uri); // Pass image to MainScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload CT Scan Image</Text>
      <Text style={styles.subtitle}>
        Our AI system will analyze your CT scan and provide results within seconds
      </Text>
      {/* <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <Ionicons name="cloud-upload-outline" size={50} color="#4A90E2" />
        )}
        <Text style={styles.uploadText}>Drag and drop your CT scan image here, or</Text>
        <TouchableOpacity style={styles.browseButton} onPress={pickImage}>
          <Text style={styles.browseText}>Browse Files</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.analyzeButton} onPress={onAnalyze}>
        <Text style={styles.analyzeText}>Analyze Scan</Text>
      </TouchableOpacity> */}
      
<TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
  {image ? (
    <>
      <Image source={{ uri: image }} style={styles.uploadedImage} />
      <TouchableOpacity 
        style={styles.changeImageButton} 
        onPress={pickImage}
      >
        <Text style={styles.changeImageText}>Change Image</Text>
      </TouchableOpacity>
    </>
  ) : (
    <>
      <Ionicons name="cloud-upload-outline" size={50} color="#4A90E2" />
      <Text style={styles.uploadText}>Drag and drop your CT scan image here, or</Text>
      <TouchableOpacity style={styles.browseButton} onPress={pickImage}>
        <Text style={styles.browseText}>Browse Files</Text>
      </TouchableOpacity>
    </>
  )}
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 150,
  },
  title: {
    color: '#fff',
    fontSize: 65,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadBox: {
    width: width * 0.5,
    height: height * 0.5,
    backgroundColor: '#111',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  uploadText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 10,
  },
  browseButton: {
    marginTop: 10,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  browseText: {
    color: '#fff',
    fontSize: 14,
  },
  analyzeButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    width: width * 0.8,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  analyzeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 14,
  }
});

export default UploadSection;
