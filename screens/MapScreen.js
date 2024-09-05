import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Text, Button, TouchableOpacity, Alert, Linking, Modal, FlatList } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

// Define color based on severity
const getSeverityColor = (severity) => {
  if (severity <= 3) return 'rgba(0,255,0,0.3)'; // Green for low severity
  if (severity <= 6) return 'rgba(255,255,0,0.3)'; // Yellow for medium severity
  return 'rgba(255,0,0,0.3)'; // Red for high severity
};

// Define disaster colors
const DISASTER_COLORS = {
  Flood: 'rgba(0,0,255,0.3)',       // Blue
  Fire: 'rgba(255,0,0,0.3)',        // Red
  Earthquake: 'rgba(255,165,0,0.3)', // Orange
  Hurricane: 'rgba(128,0,128,0.3)'  // Purple
};

// Dummy relief camp data (replace with your actual data)
const reliefCamps = [
  { id: 1, name: 'Relief Camp A', lat: 12.9716, lng: 77.5946 },
  { id: 2, name: 'Relief Camp B', lat: 12.2958, lng: 76.6394 },
  { id: 3, name: 'Relief Camp C', lat: 11.0168, lng: 76.9558 },
];

const MapScreen = ({ route }) => {
  const { disasters, initialIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const mapRef = useRef(null);

  if (!disasters.length) return null;

  const { disasterType, location, color, severity } = disasters[currentIndex];
  const latitude = parseFloat(location.lat);
  const longitude = parseFloat(location.lng);

  useEffect(() => {
      if (mapRef.current) {
          mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }, 1000); // Duration of the animation in milliseconds
        }
    }, [currentIndex]);

    const handleCall = () => {
        const emergencyNumber = '1078'; // Replace with your emergency number
        Linking.canOpenURL(`tel:${emergencyNumber}`).then(supported => {
            if (supported) {
                return Linking.openURL(`tel:${emergencyNumber}`);
            } else {
                Alert.alert('Error', 'Phone call not supported');
            }
        });
    };

    const handleSendSOS = () => {
        const emergencyContacts = '9643461952'; // Your contact number
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const locationMessage = `SOS! Emergency at: ${googleMapsLink}. Immediate assistance required. \n\nDisaster Type: ${disasterType}, Severity: ${severity}/10.`;

        const message = encodeURIComponent(locationMessage);

        const smsURL = `sms:${emergencyContacts}?body=${message}`;

        Linking.canOpenURL(smsURL)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(smsURL); // Open SMS app with pre-filled message
            } else {
              Alert.alert('Error', 'SMS sending is not supported on this device');
            }
          })
          .catch((error) => {
            Alert.alert('Error', 'Failed to send SOS message');
            console.error(error);
          });
      };

    const handleReliefCampDirections = (camp) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${camp.lat},${camp.lng}&travelmode=driving`;
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    };

    const renderReliefCamp = ({ item }) => (
      <TouchableOpacity
        style={tw`p-4 bg-gray-200 mb-2 rounded`}
        onPress={() => {
          setModalVisible(false); // Close modal
          handleReliefCampDirections(item); // Open directions
        }}
      >
        <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
      </TouchableOpacity>
    );

  return (
    <View style={tw`flex-1`}>
      <MapView
        ref={mapRef}
        style={tw`w-full h-2.5/4`}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {disasters.map((disaster, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: parseFloat(disaster.location.lat), longitude: parseFloat(disaster.location.lng) }}
            title={disaster.disasterType}
          />
        ))}
        <Circle
          center={{ latitude, longitude }}
          radius={1000} // Radius in meters
          strokeColor={color || getSeverityColor(severity)}
          fillColor={color || getSeverityColor(severity)}
        />
      </MapView>

      <View style={tw`flex-1 flex-row p-4 bg-white`}>
        <View style={tw`w-1/2 pr-2`}>
          <Text style={tw`text-lg font-bold mb-2`}>Disaster Types:</Text>
          {Object.keys(DISASTER_COLORS).map((type) => (
            <View key={type} style={tw`flex-row items-center mb-2`}>
              <View style={[tw`w-5 h-5 mr-2`, { backgroundColor: DISASTER_COLORS[type] }]} />
              <Text>{type}</Text>
            </View>
          ))}
        </View>

        <View style={tw`w-1/2 pl-2`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Disaster Details:</Text>
          <Text style={tw`text-base mb-2`}>Disaster Type:&nbsp; {disasterType}</Text>
          <Text style={tw`text-base mb-2`}>Severity: {severity}/10</Text>
          <Text style={tw`text-base mb-2`}>Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}</Text>
        </View>
      </View>

      <View style={tw`p-4 bg-white`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Button
            title="Previous"
            onPress={() => setCurrentIndex((prev) => (prev - 1 + disasters.length) % disasters.length)}
          />
          <Text style={tw`text-lg font-semibold mx-4`}>
            {currentIndex + 1}/{disasters.length}
          </Text>
          <Button
            title="Next"
            onPress={() => setCurrentIndex((prev) => (prev + 1) % disasters.length)}
          />
        </View>
      </View>

      <View style={tw`absolute top-10 right-4 flex-col items-center`}>
        <TouchableOpacity style={tw`mb-4 bg-white px-2 py-1 rounded-full`} onPress={handleSendSOS}>
          <Icon name="exclamation-circle" size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-white px-2 py-1 mb-4 rounded-full`} onPress={handleCall}>
          <Icon name="phone" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-white px-2 py-1 rounded-full`}
          onPress={() => setModalVisible(true)} // Open modal
        >
          <Icon name="location-arrow" size={30} color="green" />
        </TouchableOpacity>
      </View>

      {/* Modal for displaying relief camps */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white w-3/4 p-5 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-4`}>Relief Camps Nearby</Text>
            <FlatList
              data={reliefCamps}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderReliefCamp}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MapScreen;
