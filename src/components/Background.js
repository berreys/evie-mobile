import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const Background = ({
                    colors = ['#00A6D7', '#20C6F7'],
                    style,
                    children
                }) => {
    return (
        <LinearGradient colors={colors} style={[styles.background, style]}>
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center'
    }
});

export default Background;
