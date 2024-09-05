import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/Images/welcome.png'; // Adjust path as needed
import Logo2 from '../assets/Images/welcome2.png'; // Adjust path as needed

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Top-centered image (hero image) */}
            <Image
                source={Logo} // Use the circular logo image
                style={styles.logo}
            />
            <Image
                source={Logo2} // Use the hero image
                style={styles.topImage}
            />

            {/* Circular logo */}
            <Text style={styles.title}>Welcome to Jeev Rakshak</Text>
            <Text style={styles.subtitle}>Stay informed and stay safe</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MapScreen')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f7', // Light background color
        padding: 20,
    },
    topImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',

    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
        borderWidth: 2,
        position: 'absolute',
        top: 70,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333', // Dark color for text
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666', // Medium gray color for subtitle
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row', // Align buttons side by side
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#007BFF', // Primary color for the button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginRight: 10, // Space between buttons
        flex: 1, // Make button occupy available space
    },
    buttonText: {
        fontSize: 18,
        color: '#fff', // White text color
        fontWeight: 'bold',
        textAlign: 'center', // Center text within button
    },
    signInButton: {
        backgroundColor: '#6c757d', // Secondary color for the button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flex: 1, // Make button occupy available space
    },
    signInButtonText: {
        fontSize: 18,
        color: '#fff', // White text color
        fontWeight: 'bold',
        textAlign: 'center', // Center text within button
    },
});

export default Welcome;
