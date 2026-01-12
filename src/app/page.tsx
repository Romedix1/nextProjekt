import Image from "next/image";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <header>
        <h1>Witaj na mojej stronie 🚀</h1>
        <p>To jest przykładowa strona napisana w React (Next.js).</p>
      </header>

      <section style={{ marginTop: "30px" }}>
        <h2>O mnie</h2>
        <p>
          Tworzę aplikacje webowe w React i Next.js. Ta strona to prosty
          przykład komponentu strony głównej.
        </p>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>Grafika</h2>
        <Image
          src="/example.jpg"
          alt="Przykładowy obraz"
          width={400}
          height={250}
          style={{ borderRadius: "12px" }}
        />
      </section>

      <footer style={{ marginTop: "50px", color: "#666" }}>
        <p>© 2026 Moja strona</p>
      </footer>
    </main>
  );
}
