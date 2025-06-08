import { usePathname } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot, TabTriggerProps } from "expo-router/ui";
import React from "react";
import { Text } from "~/components/ui/text";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { placeholderColor } from "~/lib/constants/appTheme";
import { bottomNavHeight } from "~/lib/constants/sizes";
import { useScreenMode } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";

export default function LettersTabs() {
  const { themeValue } = useScreenMode();

  const pathname = usePathname();

  const prevPath = React.useRef<string>(pathname);

  const navigations: Array<TabTriggerProps & { title: string }> = [
    { name: "index", href: "/letters", title: "Hiragana" },
    { name: "katakana", href: "/letters/katakana", title: "Katakana" },
    { name: "kanji", href: "/letters/kanji", title: "Kanji" },
  ];

  React.useEffect(() => {
    if (prevPath.current !== pathname) {
      triggerHaptic();

      prevPath.current = pathname;
    }
  }, [pathname]);

  return (
    <Tabs>
      <TabList className="flex-row">
        {navigations.map((nav) => {
          const isActive = pathname === nav.href;

          return (
            <TabTrigger
              className={cn("flex-1 items-center justify-center border-b-2 bg-background", isActive ? "border-b-foreground" : "border-b-background")}
              style={{
                height: bottomNavHeight,
              }}
              name={nav.name}
              href={nav.href}
              key={nav.name}
            >
              <Text
                className={cn("w-full text-center font-sans-semibold text-lg uppercase")}
                style={{
                  color: isActive ? themeValue.colors.foreground : placeholderColor,
                }}
              >
                {nav.title}
              </Text>
            </TabTrigger>
          );
        })}
      </TabList>
      <TabSlot />
    </Tabs>
  );
}
