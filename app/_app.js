import localFont from "next/font/local";

const helveticaNeue = localFont({
  src: [
    {
      path: "../public/assets/fonts/helvetica-neue/helvetica-47-light-condensed-587ebd7b5a6f6.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/helvetica-neue/helvetica-46-light-italic-587ebdb0ea724.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/helvetica-neue/HelveticaNeueBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/helvetica-neue/HelveticaNeue-BoldCondObl.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={helveticaNeue.className}>
      <Component {...pageProps} />
    </main>
  );
}
