import { FeedContextProvider } from "@/app/Providers/FeedProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <FeedContextProvider>{children}</FeedContextProvider>
    </html>
  );
}
