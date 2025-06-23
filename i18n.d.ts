import type { Resources } from "./libs/i18n";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: Resources["en"];
    }
}
