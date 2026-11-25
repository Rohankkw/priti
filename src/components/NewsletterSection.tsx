import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="border-t border-[#0B1220]/10 bg-[#F7F3EC] px-5 py-16 text-[#0B1220] lg:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-lg">
          <h2 className="font-display text-4xl tracking-[0.03em]">
            The Monthly <span className="font-serif italic font-normal text-[#C86D10]">India Dispatch</span>
          </h2>
          <p className="mt-2 text-sm text-[#0B1220]/70">
            Receive seasonal festival calendars, newly opened heritage palaces, and private member fares. Zero spam.
          </p>
        </div>

        {subscribed ? (
          <div className="flex items-center gap-3 rounded-full border border-[#138808]/30 bg-[#138808]/10 px-6 py-3.5 text-sm font-medium text-[#138808]">
            <CheckCircle2 className="h-5 w-5" />
            <span>Welcome aboard — your first India Dispatch arrives this Friday.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0B1220]/45" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  className="w-full rounded-full border border-[#0B1220]/20 bg-white py-3.5 pl-11 pr-4 text-sm text-[#0B1220] placeholder:text-[#0B1220]/45 focus:border-[#FF9933] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#0B1220] px-7 py-3.5 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#FF9933] hover:text-[#0B1220]"
              >
                Subscribe
              </button>
            </div>
            {error && <p className="mt-2 pl-4 text-xs font-medium text-red-700">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
