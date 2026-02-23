import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "YESHOUA TV",
  description: "Ta chaîne chrétienne en direct",
  manifest: "/manifest.json", // C'est ça qui crée l'icône sur le téléphone
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Empêche le zoom pour que ça ressemble à une vraie app
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, backgroundColor: 'black', color: 'white', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
