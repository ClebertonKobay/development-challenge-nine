'use client'
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from 'react-query'

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
