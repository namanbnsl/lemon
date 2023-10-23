import '~/styles/globals.css';

import { Poppins } from 'next/font/google';

import { AuthProvider } from '~/components/provider/AuthProvider';
import { ThemeProvider } from '~/components/provider/ThemeProvider';

const font = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800']
});

export const metadata = {
  title: 'lemon',
  description: 'analytics',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
