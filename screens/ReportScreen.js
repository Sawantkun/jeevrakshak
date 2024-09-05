import React, { useState } from 'react';
import { View, TextInput, Button, Alert, FlatList, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Dropdown from '../components/DropDown'; // Import the custom dropdown

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

// Define the disaster types and their colors
const DISASTER_TYPES = [
  { label: 'Flood', value: 'Flood', color: 'rgba(0,0,255,0.3)' }, // Blue
  { label: 'Fire', value: 'Fire', color: 'rgba(255,0,0,0.3)' },  // Red
  { label: 'Earthquake', value: 'Earthquake', color: 'rgba(255,165,0,0.3)' }, // Orange
  { label: 'Hurricane', value: 'Hurricane', color: 'rgba(128,0,128,0.3)' }, // Purple
];

const ReportScreen = () => {
  const [locationName, setLocationName] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [severity, setSeverity] = useState("");
  const [disasters, setDisasters] = useState([]); // Array to store disasters
  const navigation = useNavigation();

  const handleAddDisaster = () => {
    if (!selectedDisaster || !location.lat || !location.lng) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Add the new disaster to the list
    const newDisaster = {
      disasterType: selectedDisaster.value,
      location,
      color: selectedDisaster.color,
      severity,
    };

    setDisasters([...disasters, newDisaster]);

    // Clear form fields
    setLocationName('');
    setLocation({ lat: '', lng: '' });
    setSelectedDisaster(null);
    setSeverity("");
  };

  const handleSubmitAll = () => {
    if (disasters.length === 0) {
      Alert.alert('Error', 'No disasters to submit.');
      return;
    }

    // Navigate to MapScreen with all disasters
    navigation.navigate('MapScreen', {
      disasters,
      initialIndex: 0, // Default to the first disaster
    });
  };

  const handleLocationChange = async (text) => {
    setLocationName(text);
    if (text.length > 2) { // Trigger autocomplete after 2 characters
      try {
        const response = await axios.get(NOMINATIM_API_URL, {
          params: {
            q: text,
            format: 'json',
            addressdetails: 1,
            limit: 5,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (place) => {
    setLocation({
      lat: place.lat,
      lng: place.lon,
    });
    setLocationName(place.display_name);
    setSuggestions([]);
  };

  return (
    <View style={tw`flex-1 p-6 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-6 text-center`}>Report Disaster</Text>

      <TouchableOpacity
        style={tw`border border-gray-300 p-3 rounded-lg mb-4 bg-white shadow-md`}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={tw`text-lg`}>{selectedDisaster ? selectedDisaster.label : 'Select Disaster Type'}</Text>
      </TouchableOpacity>

      <Dropdown
        options={DISASTER_TYPES}
        selectedValue={selectedDisaster}
        onSelect={setSelectedDisaster}
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
      />

      <TextInput
        style={tw`border border-gray-300 p-3 mb-4 rounded-lg bg-white shadow-md`}
        placeholder="Enter location"
        value={locationName}
        onChangeText={handleLocationChange}
      />

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <View style={tw`border border-gray-300 p-3 mb-2 rounded-lg bg-white shadow-sm`}>
                <Text>{item.display_name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={tw`mb-6`}>
        <Text style={tw`text-lg mb-2`}>Select Severity (1-10):</Text>
        <TextInput
          style={tw`border border-gray-300 p-3 rounded-lg bg-white shadow-md`}
          keyboardType="numeric"
          value={severity.toString()}
          onChangeText={(text) => setSeverity(parseInt(text, 10) || 1)}
        />
      </View>

      <Button title="Add Disaster" onPress={handleAddDisaster} color="#4CAF50" />

      <View style={tw`my-4`}>
        <Text style={tw`text-xl font-semibold mb-2`}>Disasters:</Text>
        <FlatList
          data={disasters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={tw`border border-gray-300 p-4 mb-2 rounded-lg bg-white shadow-md`}>
              <Text style={tw`text-lg font-bold`}>Disaster Type: {item.disasterType}</Text>
              <Text>Location: {item.location.lat}, {item.location.lng}</Text>
              <Text>Severity: {item.severity}/10</Text>
            </View>
          )}
        />
      </View>

      <Button title="Submit All Disasters" onPress={handleSubmitAll} color="#2196F3" />
    </View>
  );
};

export default ReportScreen;
