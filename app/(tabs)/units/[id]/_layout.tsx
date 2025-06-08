import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot, TabTriggerProps } from "expo-router/ui";
import React from "react";
import PageHeader from "~/components/PageHeader";
import { Text } from "~/components/ui/text";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import useBackHandler from "~/hooks/useBackHandler";
import { bottomNavHeight } from "~/lib/constants/sizes";
import { cn } from "~/lib/utils";

export default function LettersTabs() {
    const pathname = usePathname();

    const router = useRouter();

    const prevPath = React.useRef<string>(pathname);

    const { id } = useLocalSearchParams<{ id: string }>();

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
            <PageHeader onBack={handleBack} />

            <TabSlot />

            <TabList style={{ height: bottomNavHeight }} className="flex-row items-start bg-background">
                {navigations.map((nav) => {
                    const isActive = pathname === nav.href;

                    return (
                        <TabTrigger
                            className={cn(
                                "h-12 flex-1 items-center justify-center border-b-2 bg-background",
                                isActive ? "border-b-foreground" : "border-b-background"
                            )}
                            name={nav.name}
                            href={nav.href}
                            key={nav.name}
                        >
                            <Text className={cn("w-full text-center font-sans-semibold text-lg uppercase", isActive ? "text-foreground" : "text-border")}>
                                {nav.title}
                            </Text>
                        </TabTrigger>
                    );
                })}
            </TabList>
        </Tabs>
    );
}
