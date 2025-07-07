import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot, TabTriggerProps } from "expo-router/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "~/components/PageHeader";
import { Text } from "~/components/ui/text";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { bottomNavHeight } from "~/lib/constants/sizes";
import { cn } from "~/lib/utils";
import { useGetDetailUnit } from "~/services/queries/unitQueries";

export default function LettersTabs() {
  const pathname = usePathname();

  const { t } = useTranslation();

  const router = useRouter();

  const prevPath = React.useRef<string>(pathname);

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: unit } = useGetDetailUnit(id);

  const navigations: Array<TabTriggerProps & { title: string }> = [
    { name: "vocabulary", href: `/units/${id}`, title: "Vocabulary" },
    { name: "grammar", href: `/units/${id}/grammar`, title: "Grammar" },
  ];

  React.useEffect(() => {
    if (prevPath.current !== pathname) {
      triggerHaptic();

      prevPath.current = pathname;
    }
  }, [pathname]);

  const handleBack = () => {
    router.push({ pathname: "/units" });
  };

  return (
    <Tabs>
      <PageHeader title={unit ? t("unit_name", { name: `${unit.number}` }) : t("unit_name", { name: "" })} onBack={handleBack} />

      <TabSlot />

      <TabList style={{ height: bottomNavHeight }} className="flex-row items-start bg-background">
        {navigations.map((nav) => {
          const isActive = pathname === nav.href;

          return (
            <TabTrigger
              className={cn("h-12 flex-1 items-center justify-center border-b-2 bg-background", isActive ? "border-b-foreground" : "border-b-background")}
              href={nav.href}
              key={nav.name}
              name={nav.name}
            >
              <Text className={cn("w-full text-center font-sans-semibold text-lg uppercase", isActive ? "text-foreground" : "text-border")}>{nav.title}</Text>
            </TabTrigger>
          );
        })}
      </TabList>
    </Tabs>
  );
}
