import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
    <Image source={require('../assets/Logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
    image: {
        width: 256,
        height: 256,
        marginBottom: 48,
    },
});

export default memo(Logo);