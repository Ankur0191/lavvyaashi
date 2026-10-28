import { LifeBuoy, Mail, MessageCircle, Phone } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="bg-bg-primary border border-border p-8 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <LifeBuoy className="w-6 h-6 text-gold" />
        <h2 className="text-xl font-serif text-text">Customer Support</h2>
      </div>
      
      <p className="text-sm text-text-muted mb-8 max-w-2xl">
        We're here to help! If you have any questions about your order, our products, or your account, please reach out to our support team through any of the channels below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg flex flex-col items-center text-center hover:bg-bg-secondary transition-colors">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-medium text-text mb-2 uppercase tracking-wider text-sm">Email Support</h3>
          <p className="text-sm text-text-muted mb-4">We aim to respond to all emails within 24 hours.</p>
          <a href="mailto:support@lavvyaashi.com" className="text-gold font-medium hover:underline">
            support@lavvyaashi.com
          </a>
        </div>

        <div className="p-6 border border-border rounded-lg flex flex-col items-center text-center hover:bg-bg-secondary transition-colors">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-medium text-text mb-2 uppercase tracking-wider text-sm">WhatsApp Chat</h3>
          <p className="text-sm text-text-muted mb-4">Available Monday to Saturday, 9am to 6pm.</p>
          <a href="#" className="text-gold font-medium hover:underline">
            Message Us
          </a>
        </div>
      </div>
    </div>
  );
}
