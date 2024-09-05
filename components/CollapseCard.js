// CollapsibleCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const CollapsibleCard = ({ disasterTypes, currentDisaster, severity }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(prevState => !prevState);

  const getSeverityColor = (severity) => {
    if (severity <= 3) return 'rgba(0,255,0,0.3)'; // Green for low severity
    if (severity <= 6) return 'rgba(255,255,0,0.3)'; // Yellow for medium severity
    return 'rgba(255,0,0,0.3)'; // Red for high severity
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleExpand}>
        <Ionicons name={isExpanded ? 'md-chevron-up' : 'md-chevron-down'} size={24} color="black" />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.cardContent}>
          <Text style={styles.title}>Disaster Types and Colors:</Text>
          {Object.keys(disasterTypes).map((type) => (
            <View key={type} style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: disasterTypes[type] }]} />
              <Text style={styles.legendText}>{type}</Text>
            </View>
          ))}
          <Text style={styles.title}>Current Disaster Severity:</Text>
          <Text style={styles.severityText}>{currentDisaster}</Text>
          <Text style={styles.severityText}>Severity: {severity}/10</Text>
          <View style={[styles.severityBox, { backgroundColor: getSeverityColor(severity) }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  cardContent: {
    maxWidth: 250,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
  severityText: {
    fontSize: 14,
  },
  severityBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default CollapsibleCard;
