import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import appTheme from './constants/appTheme';
import { TScreenMode } from '~/stores/userStore';

export async function setAndroidNavigationBar(theme: TScreenMode) {
  if (Platform.OS !== 'android') return;

  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? appTheme.default.dark.background : appTheme.default.light.background
  );
}
