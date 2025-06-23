
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600">
                Last updated: January 1, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    update your profile, or contact us for support.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Personal identification information (name, email address, phone number)</li>
                    <li>Professional information (company details, certifications, experience)</li>
                    <li>Communication data (messages, support requests)</li>
                    <li>Usage information (how you interact with our platform)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Communicate with you about products, services, and events</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                  <p className="text-gray-600 mb-4">
                    We do not sell, trade, or otherwise transfer your personally identifiable information 
                    to third parties without your consent, except as described in this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                  <p className="text-gray-600">
                    We implement appropriate security measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
                  <p className="text-gray-600">
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      Email: privacy@diligince.ai<br />
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

export default Privacy;
