// component/AuthScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * AuthScreen
 * Simple email/password auth screen.
 *
 * Handles sign-in and sign-up using Firebase Auth.
 */
export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (e) {
            Alert.alert('Sign In Failed', e.message);
        }
    };

    const onSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email.trim(), password);
        } catch (e) {
            Alert.alert('Sign Up Failed', e.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#999"
                accessibilityLabel="Email address"
                accessibilityHint="Enter your email address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
                secureTextEntry
                accessibilityLabel="Password"
                accessibilityHint="Enter your password"
            />
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={onSignIn}
                    accessibilityRole="button"
                    accessibilityLabel="Sign in"
                    accessibilityHint="Sign in with your email and password"
                >
                    <Text style={styles.btnText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.secondary]}
                    onPress={onSignUp}
                    accessibilityRole="button"
                    accessibilityLabel="Sign up"
                    accessibilityHint="Create a new account with your email and password"
                >
                    <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: {
        borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12,
        fontSize: 16, marginBottom: 10,
    },
    row: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
    btn: { backgroundColor: '#222', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
    secondary: { backgroundColor: '#555' },
    btnText: { color: '#fff', fontWeight: '600' },
});