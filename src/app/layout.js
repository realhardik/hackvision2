import "./globals.css";
import ScrollInit from "@/utils/scrollInit.js";

export const metadata = {
  title: "Hackvision",
  description: "TSDC x CSI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'P2P';
                src: url('/assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf') format('truetype');
              }
              @font-face {
                font-family: 'PixelDigi';
                src: url('/assets/fonts/Pixel-Digivolve/Pixel Digivolve.otf') format('opentype');
              }
              @font-face {
                font-family: 'medodica';
                src: url('/assets/fonts/medodica/MedodicaRegular.otf') format('opentype');
              }
              @font-face {
                font-family: 'CG';
                src: url('/assets/fonts/ClashGrotesk/Fonts/WEB/fonts/ClashGrotesk-Variable.woff2') format('woff2');
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
      {children}
      <ScrollInit />
      </body>
    </html>
  );
}
