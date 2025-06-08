import { Href, useRouter } from "expo-router";

export default function useBackHandler(fallbackPath: Href) {
    const router = useRouter();

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace({ pathname: fallbackPath as any });
        }
    };

    return handleBack;
}
