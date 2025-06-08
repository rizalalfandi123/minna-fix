import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { ScreenMode } from '~/contexts/userContext';
import appTheme from './constants/appTheme';

export async function setAndroidNavigationBar(theme: ScreenMode) {
  if (Platform.OS !== 'android') return;

  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? appTheme.default.dark.background : appTheme.default.light.background
  );
}
