"use client"

import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode";

interface ExtendedProviderProps extends ColorModeProviderProps {
  initialColorMode?: "light" | "dark";
}

function CustomColorModeScript({ mode = "light" }: { mode?: "light" | "dark" }) {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `
          try {
            var currentMode = localStorage.getItem('chakra-ui-color-mode');
            if (!currentMode) {
              localStorage.setItem('chakra-ui-color-mode', '${mode}');
              document.documentElement.setAttribute('data-theme', '${mode}');
            }
          } catch (e) {}
        `,
      }}
    />
  );
}

export function Provider({ initialColorMode = "light", ...props }: ExtendedProviderProps) {
  return (
    <>
      <CustomColorModeScript mode={initialColorMode} />
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </>
  );
}