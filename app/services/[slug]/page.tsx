import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/services";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Services
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-8">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">{service.title}</h1>
              <div className="text-sm font-semibold text-teal-600 bg-teal-50 inline-block px-3 py-1 rounded-md mb-6">
                {service.duration}
              </div>

              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="text-xl leading-relaxed mb-6">
                  {service.fullDescription}
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">What's included in this service</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Certified & background-verified nurses",
                    "Personalized care assessment",
                    "Regular status updates & monitoring",
                    "Flexible scheduling (Daily/Weekly/Monthly)",
                    "Direct communication with nursing staff",
                    "Emergency support coordination"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                      <CheckCircle2 className="h-5 w-5 text-teal-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-96">
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-lg sticky top-32">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Book this service</h3>
                <p className="text-gray-600 mb-8">
                  Get in touch with us to discuss your requirements and book a certified nurse for your home.
                </p>

                <div className="space-y-4">
                  <Button className="w-full h-14 rounded-full text-lg shadow-none" size="lg" asChild>
                    <Link href="/#contact">Contact Sales</Link>
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-full text-lg border-2" size="lg" asChild>
                    <Link href="/">Get App</Link>
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Verified Quality</div>
                      <div className="text-xs text-gray-500">100% background checked</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
