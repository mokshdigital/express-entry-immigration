import Link from "next/link";

export default function Home() {
  return (
    <div className="container py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-brand-navy">
          Welcome to Express Entry Immigration Services
        </h1>
        <p className="text-lg text-gray-600">
          Your trusted partner for Canadian immigration. Expert guidance for
          study permits, work permits, permanent residency, and citizenship
          applications.
        </p>
        <div className="flex justify-center gap-4 pt-8">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md bg-brand-navy px-8 py-3 text-sm font-medium text-white hover:bg-brand-red transition-colors"
          >
            Explore Services
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-brand-navy px-8 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}