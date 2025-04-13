import ContractTree from "../components/contract-tree";

export default function Home() {
  const tree = require("../data/input.json");

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="text-foreground dark:text-background">
        {/* <span className="text-3xl sm:text-4xl font-bold">Ivo Contract</span> */}
      </nav>

      <main className="text-foreground dark:text-background">
        <ContractTree tree={tree[0]} />
      </main>

      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-foreground dark:text-background">Made with 💗 by Anthony Bui.</span>
      </footer>
    </div>
  );
}
