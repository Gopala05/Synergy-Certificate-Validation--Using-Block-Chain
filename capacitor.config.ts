import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.synergy.app",
  appName: "synergy",
  webDir: "out",
  server: {
    url: "https://synergy-certificate-validation-using.onrender.com",
    cleartext: true,
    androidScheme: "https",
  },
};

export default config;
