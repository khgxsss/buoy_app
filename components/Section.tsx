import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

// SectionProps 타입 정의
export interface SectionProps {
    title: string;
    children: React.ReactNode;
}
  
export const Section: React.FC<SectionProps> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? "#ffffff" : "#000000" }]}>
            {title}
        </Text>
        {/* 문자열 대신 Text 컴포넌트를 사용하여 children 렌더링 */}
        {React.Children.map(children, child => (
            <Text style={[styles.sectionDescription, { color: isDarkMode ? "#ffffff" : "#000000" }]}>
            {child}
            </Text>
        ))}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});