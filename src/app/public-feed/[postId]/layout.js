import { FeedContextProvider } from "@/app/Providers/FeedProvider";

export default function RootLayout({ children }) {
  return <FeedContextProvider>{children}</FeedContextProvider>;
}
