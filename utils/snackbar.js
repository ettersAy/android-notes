// utils/snackbar.js
// A minimal global Snackbar provider and hook with optional action button.
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

const SnackbarContext = createContext({
  showSnackbar: (_opts) => {},
  hideSnackbar: () => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [actionLabel, setActionLabel] = useState(null);
  const actionRef = useRef(null);
  const hideTimerRef = useRef(null);
  const translateY = useRef(new Animated.Value(80)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const hideSnackbar = useCallback(() => {
    if (!visible) return;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    Animated.parallel([
      Animated.timing(translateY, { toValue: 80, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) {
        setVisible(false);
        setMessage('');
        setActionLabel(null);
        actionRef.current = null;
      }
    });
  }, [opacity, translateY, visible]);

  const showSnackbar = useCallback((opts) => {
    const { message, actionLabel, onAction, duration = 3000 } =
      typeof opts === 'string' ? { message: opts } : opts || {};
console.log('utils/snackbar.js :' + message);
    // clear any running timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    setMessage(message || '');
    setActionLabel(actionLabel || null);
    actionRef.current = onAction || null;
    setVisible(true);

    // animate in
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 220, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 220, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    // auto hide unless there is an action and duration is 0
    const autoDuration = duration === 0 ? 0 : duration;
    if (autoDuration > 0) {
      hideTimerRef.current = setTimeout(() => hideSnackbar(), autoDuration);
    }
  }, [hideSnackbar, opacity, translateY]);

  const onPressAction = useCallback(() => {
    const cb = actionRef.current;
    hideSnackbar();
    if (typeof cb === 'function') {
      try { cb(); } catch {}
    }
  }, [hideSnackbar]);

  const ctx = useMemo(() => ({ showSnackbar, hideSnackbar }), [showSnackbar, hideSnackbar]);

    return (
        <SnackbarContext.Provider value={ctx}>
            {children}
            {/* Host */}
            <KeyboardAvoidingView
                pointerEvents="box-none"
                behavior={ 'padding'}
                style={styles.wrapper}
            >
                <Animated.View
                    pointerEvents={visible ? 'auto' : 'none'}
                    style={[styles.container, { width }, { opacity, transform: [{ translateY }] }]}
                >
                    <View style={styles.snack} accessibilityLiveRegion="polite" accessibilityRole={Platform.OS === 'ios' ? 'text' : undefined}>
                        <Text style={styles.text} numberOfLines={2}>{message}</Text>
                        <View style={styles.actions}>
                            {actionLabel ? (
                                <TouchableOpacity onPress={onPressAction} accessibilityRole="button" accessibilityLabel={actionLabel}>
                                    <Text style={styles.action}>{actionLabel}</Text>
                                </TouchableOpacity>
                            ) : null}
                            <TouchableOpacity onPress={hideSnackbar} accessibilityRole="button" accessibilityLabel="Close">
                                <Text style={styles.closeIcon}>❌</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </KeyboardAvoidingView>
        </SnackbarContext.Provider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        marginBottom: 70,
        //marginHorizontal: 20,
        alignItems: 'center',
    },
    snack: {
        maxWidth: '90%',

        flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    backgroundColor: '#323232',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
  },
    text: { color: 'white', flex: 1 },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    action: { color: '#BBDEFB', fontWeight: '600' },
    closeIcon: { color: 'white', fontSize: 16 },
});