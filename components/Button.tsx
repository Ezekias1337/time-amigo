import React, { FC } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, fontSizes, borderRadius } from '../styles/variables';
import FontAwesomeIconNames from "../types/FontAwesome";

interface ButtonProps {
  text: string;
  variant: 'primary' | 'primaryDark' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'neutralDark';
  icon?: FontAwesomeIconNames; // Ensuring the icon is a valid FontAwesome icon name
  leftIcon?: boolean;
  rightIcon?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClickHandler?: ((event: GestureResponderEvent) => void) | null;
  url?: string;
  buttonId?: string | null;
  additionalClassNames?: string;
  buttonSize?: 'small' | 'medium' | 'large';
}

const Button: FC<ButtonProps> = ({
  text,
  variant,
  icon,
  leftIcon = false,
  rightIcon = false,
  loading = false,
  disabled = false,
  onClickHandler = null,
  url,
  buttonId = null,
  additionalClassNames,
  buttonSize = 'small',
}) => {
  const navigation = useNavigation();

  const handlePress = (event: GestureResponderEvent) => {
    if (url) {
      navigation.navigate(url as never);
    } else if (onClickHandler) {
      onClickHandler(event);
    }
  };

  const renderButtonContent = () => (
    <View style={styles.buttonContent}>
      {leftIcon && icon && <FontAwesome name={icon} style={styles.leftIcon} />}
      {loading ? (
        <ActivityIndicator color={styles.loader.color} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
      {rightIcon && icon && <FontAwesome name={icon} style={styles.rightIcon} />}
    </View>
  );

  const variantStyles = variantToStyle[variant];
  const sizeStyles = sizeToStyle[buttonSize];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles,
        sizeStyles,
        additionalClassNames ? (styles as any)[additionalClassNames] : {},
        (disabled || loading) && styles.disabledButton,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={buttonId || undefined}
    >
      {renderButtonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: borderRadius.borderRadius,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: fontSizes.body,
  },
  leftIcon: {
    paddingRight: 16,
  },
  rightIcon: {
    paddingLeft: 16,
  },
  disabledButton: {
    backgroundColor: colors.neutral200,
    borderColor: colors.neutral400,
  },
  smallButton: {
    fontSize: fontSizes.body,
  },
  mediumButton: {
    fontSize: fontSizes.general,
  },
  largeButton: {
    fontSize: fontSizes.header3,
  },
  loader: {
    color: colors.neutral800,
  },
  primaryButton: {
    backgroundColor: colors.primary500,
    color: colors.primary100,
    borderColor: colors.primary100,
  },
  primaryDarkButton: {
    backgroundColor: colors.primary900,
    color: colors.primary200,
    borderColor: colors.primary200,
  },
  successButton: {
    backgroundColor: colors.success500,
    color: colors.success900,
    borderColor: colors.success900,
  },
  warningButton: {
    backgroundColor: colors.warning500,
    color: colors.warning900,
    borderColor: colors.warning900,
  },
  errorButton: {
    backgroundColor: colors.error500,
    color: colors.error900,
    borderColor: colors.error900,
  },
  infoButton: {
    backgroundColor: colors.info500,
    color: colors.info900,
    borderColor: colors.info900,
  },
  neutralButton: {
    backgroundColor: colors.neutral200,
    color: colors.neutral800,
    borderColor: colors.neutral800,
  },
  neutralDarkButton: {
    backgroundColor: colors.neutral900,
    color: colors.neutral300,
    borderColor: colors.neutral300,
  },
});

const variantToStyle = {
  primary: styles.primaryButton,
  primaryDark: styles.primaryDarkButton,
  success: styles.successButton,
  warning: styles.warningButton,
  error: styles.errorButton,
  info: styles.infoButton,
  neutral: styles.neutralButton,
  neutralDark: styles.neutralDarkButton,
};

const sizeToStyle = {
  small: styles.smallButton,
  medium: styles.mediumButton,
  large: styles.largeButton,
};

export default Button;
