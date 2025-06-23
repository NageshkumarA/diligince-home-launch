
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-gray-600">
                Last updated: January 1, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 mb-4">
                    By accessing and using Diligince.ai ("Platform", "Service", "we", "us", or "our"), 
                    you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                  <p className="text-gray-600">
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                  <p className="text-gray-600 mb-4">
                    Diligince.ai is an AI-powered platform that connects industrial plants with vendors, 
                    professionals, and logistics partners across India. Our service includes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Marketplace for industrial services and products</li>
                    <li>AI-powered matching algorithms</li>
                    <li>Communication tools between stakeholders</li>
                    <li>Document management and procurement tools</li>
                    <li>Project management capabilities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                  <p className="text-gray-600 mb-4">
                    To access certain features of the Platform, you must create an account. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Providing accurate and complete information</li>
                    <li>Updating your information as needed</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
                  <p className="text-gray-600 mb-4">You agree not to use the Platform to:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Post false, misleading, or defamatory content</li>
                    <li>Engage in fraudulent activities</li>
                    <li>Interfere with the Platform's operation</li>
                    <li>Harass or harm other users</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content and Intellectual Property</h2>
                  <p className="text-gray-600 mb-4">
                    You retain ownership of content you submit to the Platform. By submitting content, 
                    you grant us a non-exclusive, worldwide license to use, display, and distribute 
                    your content in connection with the Service.
                  </p>
                  <p className="text-gray-600">
                    The Platform and its original content, features, and functionality are owned by 
                    Diligince.ai and are protected by copyright, trademark, and other laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy</h2>
                  <p className="text-gray-600">
                    Your privacy is important to us. Please review our Privacy Policy, which also 
                    governs your use of the Platform, to understand our practices.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payments and Fees</h2>
                  <p className="text-gray-600 mb-4">
                    Some features of the Platform may require payment. You agree to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Pay all applicable fees as described on the Platform</li>
                    <li>Provide accurate billing information</li>
                    <li>Pay charges incurred by your account</li>
                    <li>Accept that fees are non-refundable except as required by law</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                  <p className="text-gray-600">
                    We may terminate or suspend your account and access to the Platform immediately, 
                    without prior notice, for conduct that we believe violates these Terms or is 
                    harmful to other users, us, or third parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers</h2>
                  <p className="text-gray-600">
                    The Platform is provided "as is" without warranties of any kind. We do not 
                    guarantee the accuracy, completeness, or usefulness of any information on the Platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                  <p className="text-gray-600">
                    In no event shall Diligince.ai be liable for any indirect, incidental, special, 
                    consequential, or punitive damages resulting from your use of the Platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
                  <p className="text-gray-600">
                    These Terms shall be interpreted and governed by the laws of India, and you 
                    submit to the jurisdiction of the courts of Andhra Pradesh, India.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
                  <p className="text-gray-600">
                    We reserve the right to modify these Terms at any time. We will notify users 
                    of any material changes. Your continued use of the Platform after such 
                    modifications constitutes acceptance of the updated Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                  <p className="text-gray-600">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      Email: legal@diligince.ai<br />
                      Address: Visakhapatnam, Andhra Pradesh, India
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
