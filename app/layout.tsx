import Header from "@/components/Header/Header";
import "./global.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata = {
  title: {
    template: "%s | 짭 GMD 한국포럼",
    default: "짭 GMD 한국포럼",
  },
  description: "짝퉁 GMD 한국포럼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
