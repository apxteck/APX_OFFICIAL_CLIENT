import { Mail, Phone, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Service } from '@/app/types/service.types';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/forms/ContactForm').then(mod => mod.ContactForm), { ssr: true });

interface ContactPageSectionProps {
  services: Service[];
}

export function ContactPageSection({ services }: ContactPageSectionProps) {
  return (
    <section aria-labelledby="contact-heading" className="py-12 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Info Cards & Map */}
        <div className="lg:col-span-5 space-y-8">
          <header className="space-y-4">
            <h1 id="contact-heading" className="text-4xl font-extrabold tracking-tight text-foreground">
              Get in Touch
            </h1>
            <p className="text-foreground/75 leading-relaxed">
              Have questions about our custom services, API systems, or packages? Talk to our
              technology experts.
            </p>
          </header>

          {/* Cards */}
          <address className="grid sm:grid-cols-2 gap-4 not-italic">
            <div className="p-5 rounded-2xl bg-foreground/[0.01] border border-glass-border flex gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" role="presentation" />
              <div>
                <h2 className="font-bold text-sm">Write to Us</h2>
                <a href="mailto:info@apxteck.com" className="text-xs text-foreground/60 mt-1 hover:text-accent transition-colors">
                  info@apxteck.com
                </a>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-foreground/[0.01] border border-glass-border flex gap-3">
              <Phone className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" aria-hidden="true" role="presentation" />
              <div>
                <h2 className="font-bold text-sm">Call Our Office</h2>
                <a href="tel:+919405282582" className="text-xs text-foreground/60 mt-1 hover:text-accent transition-colors">
                  +91 94052 82582
                </a>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-foreground/[0.01] border border-glass-border flex gap-3 sm:col-span-2">
              <MapPin className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" aria-hidden="true" role="presentation" />
              <div>
                <h2 className="font-bold text-sm">Business Address</h2>
                <p className="text-xs text-foreground/60 mt-1">
                  Flat No. 24, 3rd Floor, Balaji Residency Dighe, Manaji Nagar, Narhe, Pune. 411041
                </p>
              </div>
            </div>
          </address>

          {/* Map Embed */}
          <div className="w-full h-64 rounded-3xl overflow-hidden border border-glass-border shadow-inner">
            <iframe
              src="https://maps.google.com/maps?q=Balaji%20Residency%20Dighe,%20Manaji%20Nagar,%20Narhe,%20Pune%20411041&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="APXTeck Office Location in Pune"
            />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-8 md:p-10 border border-glass-border">
            <ContactForm services={services} />
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

