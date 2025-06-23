import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot, TabTriggerProps } from "expo-router/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "~/components/PageHeader";
import { Text } from "~/components/ui/text";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { bottomNavHeight } from "~/lib/constants/sizes";
import { cn } from "~/lib/utils";
import { UNITS } from "~/services/queries/unitQueries";
import { Unit } from "~/types";

export default function LettersTabs() {
  const pathname = usePathname();

  const { t } = useTranslation();

  const router = useRouter();

  const queryClient = useQueryClient();

  const prevPath = React.useRef<string>(pathname);

  const { id } = useLocalSearchParams<{ id: string }>();

  const unitData = React.useMemo(() => {
    const units = queryClient.getQueryData<Array<Unit>>([UNITS]);

    const unit = (units ?? []).find((unit) => unit.id === id);

    return unit;
  }, [id]);

  const navigations: Array<TabTriggerProps & { title: string }> = [
    { name: "vocabulary", href: `/units/${id}/vocabulary`, title: "Vocabulary" },
    { name: "grammar", href: `/units/${id}/grammar`, title: "Grammar" },
    { name: "exercise", href: `/units/${id}/exercise`, title: "Exercise" },
  ];

  React.useEffect(() => {
    if (prevPath.current !== pathname) {
      triggerHaptic();

      prevPath.current = pathname;
    }
  }, [pathname]);

  const handleBack = () => {
    router.replace({ pathname: "/units" });
  };

  return (
    <Tabs>
      <PageHeader title={unitData ? t("unit_name", { name: `${unitData.number}` }) : t("unit_name", { name: "" })} onBack={handleBack} />

      <TabSlot />

      <TabList style={{ height: bottomNavHeight }} className="flex-row items-start bg-background">
        {navigations.map((nav) => {
          const isActive = pathname === nav.href;

          return (
            <TabTrigger
              className={cn("h-12 flex-1 items-center justify-center border-b-2 bg-background", isActive ? "border-b-foreground" : "border-b-background")}
              name={nav.name}
              href={nav.href}
              key={nav.name}
            >
              <Text className={cn("w-full text-center font-sans-semibold text-lg uppercase", isActive ? "text-foreground" : "text-border")}>{nav.title}</Text>
            </TabTrigger>
          );
        })}
      </TabList>
    </Tabs>
  );
}
