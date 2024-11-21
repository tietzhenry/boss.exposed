import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { GridProvider } from "@/components/providers/grid-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
              <GridProvider>{children} </GridProvider>
              <ReactQueryDevtools />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
