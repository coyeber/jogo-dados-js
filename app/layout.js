import "./globals.css";

export const metadata = {
  title: "Jogo de Dados",
  description: "Jogo de dados entre 2 jogadores com 5 rodadas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
