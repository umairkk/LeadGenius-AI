import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-shell text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b88a24]">
          404
        </p>
        <h1 className="mt-4 text-5xl font-black text-[#07192f]">Page not found</h1>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-slate-600">
          The page you are looking for is not available. Return to the homepage
          or book a free strategy session.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-[#07192f] px-6 py-3 text-sm font-black text-white"
          >
            Go Home
          </Link>
          <Link
            href="/booking"
            className="gold-gradient rounded-full px-6 py-3 text-sm font-black text-slate-950"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
