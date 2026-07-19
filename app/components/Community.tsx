"use client";

import { useState } from "react";

export default function Community() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Direct WhatsApp message payload for signing up to the community list
    const repNumber = "2349021012556";
    const msg = `🥚 *KEMKEM COOP CLUB - SIGN UP* 🥚\n` +
                `===============================\n` +
                `Name: *${name}*\n` +
                `Email: *${email || "Not Provided"}*\n` +
                `WhatsApp: *${phone}*\n\n` +
                `Please add me to the continuous follow-up list for fresh harvests, early order notifications, and nutritional news!`;
    
    window.open(`https://wa.me/${repNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    setStatus("success");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <section id="community" className="py-24 bg-cream/10 border-t border-b border-secondary/5 relative overflow-hidden">
      {/* Decorative floating organic circle */}
      <div className="absolute right-[-10%] top-[-10%] h-80 w-80 rounded-full bg-primary/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Descriptive Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest block">
              Coop Club Community
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              Join Our Fresh Harvest Network
            </h2>
            <p className="text-secondary/70 text-sm leading-relaxed">
              We notify our community members the moment a fresh batch of quail eggs is collected, hand-sorted, and packed into crates.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mt-0.5">✓</span>
                <p className="text-xs text-secondary/70"><strong>Restock Alerts:</strong> Get notified instantly when fresh crates are available for order.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mt-0.5">✓</span>
                <p className="text-xs text-secondary/70"><strong>Nutritional Guides:</strong> Free articles on the health impacts of quail eggs for family nutrition.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mt-0.5">✓</span>
                <p className="text-xs text-secondary/70"><strong>Continuous Follow-Ups:</strong> Dedicated support for custom pack requests and delivery feedback.</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border border-secondary/5 rounded-3xl p-8 sm:p-12 shadow-xl">
            {status === "success" ? (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <div className="h-16 w-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary">Sign-Up Redirected!</h3>
                <p className="text-secondary/60 text-xs max-w-sm mx-auto">
                  Your details have been prefilled for WhatsApp. Send the message to our representative to finalize joining our Coop Club community list.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-cream border border-secondary/10 text-secondary text-xs font-semibold py-2 px-6 rounded-full hover:bg-cream/40 transition-all cursor-pointer"
                >
                  Join Another Account
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-secondary/5 pb-4 mb-4">
                  <h3 className="font-serif text-lg font-bold text-secondary mb-1">Coop Club Registration</h3>
                  <p className="text-[11px] text-secondary/50">Enter your details to join our follow-up list and receive fresh stock updates.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1.5">Full Name</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-4 py-2.5 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1.5">WhatsApp Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 08031234567"
                      className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-4 py-2.5 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1.5">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-4 py-2.5 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#25D366] text-white text-xs font-bold py-3 px-8 rounded-full hover:bg-[#20ba59] transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    {/* WhatsApp Icon */}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.95 9.95 0 0 0 4.887 1.33c5.508 0 9.99-4.478 9.991-9.985a9.97 9.97 0 0 0-2.928-7.057 9.97 9.97 0 0 0-7.08-2.941zM6.88 18.062l-.307-.182a8.21 8.21 0 0 1-1.258-1.026l-.168-.182a8.3 8.3 0 0 1-1.328-4.708 8.32 8.32 0 0 1 8.31-8.31 8.28 8.28 0 0 1 5.88 2.43 8.28 8.28 0 0 1 2.43 5.88 8.32 8.32 0 0 1-8.31 8.31 8.22 8.22 0 0 1-4.053-1.058l-.348-.203-3.13.82.842-3.081zm7.746-4.502c-.266-.134-1.57-.775-1.813-.863-.243-.089-.42-.133-.596.133-.177.266-.685.864-.84 1.04-.155.177-.31.199-.576.066a7.25 7.25 0 0 1-2.138-1.32 7.97 7.97 0 0 1-1.479-1.84c-.155-.266-.016-.41.117-.542.121-.12.266-.31.4-.465.133-.155.177-.266.266-.443.089-.177.044-.332-.022-.465-.067-.133-.597-1.439-.818-1.97-.215-.518-.465-.448-.596-.454-.15-.008-.321-.01-.492-.01a.948.948 0 0 0-.686.321c-.243.266-.929.908-.929 2.215 0 1.307.952 2.568 1.085 2.746.133.177 1.874 2.862 4.542 4.012.635.273 1.13.436 1.516.559.64.203 1.222.174 1.68.106.512-.077 1.57-.642 1.792-1.262.221-.62.221-1.15.155-1.262-.067-.111-.243-.177-.51-.311z"/>
                    </svg>
                    Submit & Join via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
