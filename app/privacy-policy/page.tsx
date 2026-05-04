export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-16">
      <div className="badge badge-primary badge-lg mb-4 text-white font-semibold px-4">Legal</div>
      <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none space-y-6 opacity-80">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="font-display text-2xl font-bold mt-8">1. Information We Collect</h2>
        <p>We collect information you provide when registering, such as name, email address, and profile photo URL.</p>
        <h2 className="font-display text-2xl font-bold mt-8">2. How We Use Your Information</h2>
        <p>We use your information to provide and improve our services, communicate with you, and personalize your experience.</p>
        <h2 className="font-display text-2xl font-bold mt-8">3. Data Security</h2>
        <p>We use industry-standard security measures to protect your information. Your password is securely hashed and never stored in plain text.</p>
        <h2 className="font-display text-2xl font-bold mt-8">4. Contact Us</h2>
        <p>If you have questions about this policy, contact us at <a href="mailto:hello@suncart.com" className="text-primary">hello@suncart.com</a>.</p>
      </div>
    </div>
  );
}
