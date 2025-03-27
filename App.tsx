import { configureFonts, DefaultTheme, Provider as PaperProvider, useTheme } from "react-native-paper";
import AppNavigator from "./navigation/Navigator";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { persistor, store } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded, fontError] = useFonts({
    "NotoSansKRBold": require("./assets/fonts/NotoSansKR-Bold.ttf"),
    "NotoSansKRExtraBold": require("./assets/fonts/NotoSansKR-ExtraBold.ttf"),
    "NotoSansKRLight": require("./assets/fonts/NotoSansKR-Light.ttf"),
    "NotoSansKRMedium": require("./assets/fonts/NotoSansKR-Medium.ttf"),
    "NotoSansKRRegular": require("./assets/fonts/NotoSansKR-Regular.ttf"),
    "NotoSansKRSemiBold": require("./assets/fonts/NotoSansKR-SemiBold.ttf"),
  });

  const baseFont = {
    fontFamily: 'NotoSansKR-Regular',
  } as const;

  const baseVariants = configureFonts({ config: baseFont });

  const customVariants = {
    // Customize individual base variants:
    displayMedium: {
      fontFamily: 'NotoSansKR-Medium',
    },
    bold: {
      fontFamily: 'NotoSansKR-Bold',
    },
    extraBold: {
      fontFamily: 'NotoSansKR-ExtraBold',
    },
    light: {
      fontFamily: 'NotoSansKR-Light',
    },
    semiBold: {
      fontFamily: 'NotoSansKR-SemiBold',
    }

  } as const;

  const fonts = configureFonts({
    config: {
      ...baseVariants,
      ...customVariants,
    },
  });

  const theme = {
    ...DefaultTheme,
    fonts: {
      regular: { fontFamily: "NotoSansKRRegular" },
      medium: { fontFamily: "NotoSansKRMedium" },
      light: { fontFamily: "NotoSansKRLight" },
      thin: { fontFamily: "NotoSansKRLight" },
      bold: { fontFamily: "NotoSansKRBold" },
      extrabold: {
        fontFamily: "NotoSansKRExtraBold"
      }
    },
  };

  if (!fontError && !fontLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={{ ...theme, fonts }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

