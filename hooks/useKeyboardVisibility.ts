import React from 'react';
import { Keyboard, Platform } from 'react-native';

type KeyboardVisibility = {
  isVisible: boolean;
  height: number;
};

const useKeyboardVisibility = (): KeyboardVisibility => {
  const [keyboardStatus, setKeyboardStatus] = React.useState<KeyboardVisibility>({
    isVisible: false,
    height: 0,
  });

  React.useEffect(() => {
    const showEvent = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideEvent = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showListener = Keyboard.addListener(showEvent, (e) => {
      setKeyboardStatus({
        isVisible: true,
        height: e.endCoordinates.height,
      });
    });
    
    const hideListener = Keyboard.addListener(hideEvent, () => {
      setKeyboardStatus(prev => ({
        ...prev,
        isVisible: false,
      }));
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return keyboardStatus;
};

export default useKeyboardVisibility;