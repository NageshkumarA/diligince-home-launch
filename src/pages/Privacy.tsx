
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="lead">
                Effective Date: April 1, 2025
              </p>
              <p>
                At diligince.ai, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website or use our platform.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide to us when you register on the platform, 
                express interest in obtaining information about us or our products and services, participate 
                in activities on the platform, or otherwise contact us.
              </p>
              <p>
                The personal information that we collect depends on the context of your interactions with us 
                and the platform, the choices you make, and the features you use. The personal information we 
                collect may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact data (email address, phone number, etc.)</li>
                <li>Credentials (password and similar security information)</li>
                <li>Business data (company name, job role, industry)</li>
                <li>Payment information (for transaction processing)</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect or receive:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate account creation and the login process</li>
                <li>To provide, operate, and maintain our platform</li>
                <li>To improve our platform to better serve you</li>
                <li>To communicate with you about your account or transactions</li>
                <li>To send you updates and marketing communications</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To protect our services and investigate violations of our terms</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
              <p>
                We may share information with third parties that perform services for us or on our behalf, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processing</li>
                <li>Data analytics</li>
                <li>Email delivery</li>
                <li>Hosting services</li>
                <li>Customer service</li>
              </ul>
              <p>
                We may also disclose your information where required by law, where we believe it is necessary to 
                comply with a legal obligation, or to protect our rights or the safety of others.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information. 
                While we have taken reasonable steps to secure the personal information you provide to us, please be 
                aware that no security measures are perfect or impenetrable, and we cannot guarantee that your 
                information will not be accessed, disclosed, altered, or destroyed by unauthorized parties.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict processing of your data</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@diligince.ai.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Effective Date" at the top.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@diligince.ai<br />
                Phone: +91 9848756956<br />
                Address: Visakhapatnam, Andhra Pradesh, India
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
