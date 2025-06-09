import { Tabs } from "expo-router";
import React from "react";
import Hiragana from "~/components/icons/Hiragana";
import Brain from "~/components/icons/Brain";
import Settings from "~/components/icons/Settings";
import Home from "~/components/icons/Home";
import Dictionary from "~/components/icons/Dictionary";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { bottomNavHeight } from "~/lib/constants/sizes";
import { useScreenMode } from "~/lib/useColorScheme";

export default function TabLayout() {
  const { colors, fonts } = useScreenMode();

  const navigations = React.useMemo<React.ComponentProps<typeof Tabs.Screen>[]>(() => {
    const listeners = {
      tabPress: () => {
        triggerHaptic();
      },
    };

    const data: React.ComponentProps<typeof Tabs.Screen>[] = [
      {
        name: "letters",
        options: {
          title: "Letters",
          tabBarIcon: ({ color }) => <Hiragana width={32} height={32} color={color} />,
        },
      },
      {
        name: "units",
        options: {
          title: "Units",
          tabBarIcon: ({ color }) => <Dictionary color={color} />,
        },
      },
      {
        name: "index",
        options: {
          title: "Home",
          tabBarIcon: ({ color }) => <Home width={32} height={32} color={color} />,
        },
      },
      {
        name: "exercise",
        options: {
          title: "Exercise",
          tabBarIcon: ({ color }) => <Brain width={28} height={28} color={color} />,
        },
      },
      {
        name: "settings",
        options: {
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        },
      },
    ];

    return data.map((nav) => ({ ...nav, listeners }));
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          height: bottomNavHeight,
          borderTopWidth: 0,
          borderTopColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: colors.background,
        },
        tabBarLabelPosition: "below-icon",

        tabBarLabelStyle: {
          fontFamily: fonts.bold.fontFamily,
        },

        headerShown: false,
      }}
    >
      {navigations.map((nav) => (
        <Tabs.Screen key={nav.name} {...nav} />
      ))}
    </Tabs>
  );
}
