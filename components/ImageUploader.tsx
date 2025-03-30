import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Platform, 
  Dimensions 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { globalStyles, colors } from './globalStyles';
import { ImageState } from './typedefinations';

interface ImageUploaderProps {
  onImageSelected: (image: ImageState) => void;
  onAnalyze: () => void;
  loading: boolean;
}

const { width } = Dimensions.get('window');

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  onAnalyze, 
  loading 
}) => {
  const [image, setImage] = useState<ImageState | null>(null);

  const pickImage = async () => {
    try {
      let result;
      if (Platform.OS === 'web') {
        result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
        if (!result.canceled && result.assets) {
          const asset = result.assets[0];
          const selectedImage = {
            uri: asset.uri,
            name: asset.name ?? undefined,
            type: asset.mimeType,
            file: result.output?.[0]
          };
          setImage(selectedImage);
          onImageSelected(selectedImage);
        }
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled && result.assets) {
          const asset = result.assets[0];
          const selectedImage = {
            uri: asset.uri,
            name: asset.fileName ?? undefined,
            type: asset.type
          };
          setImage(selectedImage);
          onImageSelected(selectedImage);
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  return (
    <View style={globalStyles.card}>
      <Text style={styles.cardTitle}>Upload CT Scan Image</Text>
      
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      
      {image && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>
            {image.name || 'Selected Image'}
          </Text>
          
          <Image 
            source={{ uri: image.uri }} 
            style={styles.image} 
          />
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              (loading) && styles.disabledButton
            ]}
            onPress={onAnalyze} 
            disabled={loading}
          >
            <Text style={styles.actionButtonText}>
              {loading ? 'Processing...' : 'Analyze Image'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: { 
    alignItems: 'center',
    marginTop: 15,
  },
  imageLabel: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 10,
  },
  image: { 
    width: width > 500 ? 300 : width - 80, 
    height: width > 500 ? 300 : width - 80, 
    borderRadius: 15,
    borderWidth: 3, 
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: colors.background,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.5)',
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ImageUploader;