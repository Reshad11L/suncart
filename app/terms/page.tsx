export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-16">
      <div className="badge badge-primary badge-lg mb-4 text-white font-semibold px-4">Legal</div>
      <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-lg max-w-none space-y-6 opacity-80">
        <p>By using SunCart, you agree to these terms.</p>
        <h2 className="font-display text-2xl font-bold mt-8">1. Use of Service</h2>
        <p>SunCart is a demo eCommerce platform. All purchases are simulated and no real transactions occur.</p>
        <h2 className="font-display text-2xl font-bold mt-8">2. Accounts</h2>
        <p>You are responsible for maintaining the security of your account credentials.</p>
        <h2 className="font-display text-2xl font-bold mt-8">3. Contact</h2>
        <p>Email us at <a href="mailto:hello@suncart.com" className="text-primary">hello@suncart.com</a> for any concerns.</p>
      </div>
    </div>
  );
}
