import { useState } from "react";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message sent!",
      description: "We will get back to you as soon as possible.",
    });
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <PublicHeader />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-corporate-navy-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-corporate-navy-600/5 rounded-full blur-3xl"></div>
      </div>

      <main className="flex-grow pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-corporate-navy-600"
                style={{
                  boxShadow: '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff'
                }}>
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333] mb-6">
              Let's Start a{" "}
              <span className="bg-gradient-to-r from-corporate-navy-600 to-corporate-navy-500 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            <p className="text-lg text-[#828282] max-w-2xl mx-auto leading-relaxed">
              Have questions or ready to transform your procurement process? We're here to help you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 md:p-10"
                style={{
                  boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
                }}>
                <h2 className="text-2xl font-bold text-[#333333] mb-2">Send us a Message</h2>
                <p className="text-[#828282] mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[#333333] font-semibold mb-2 block">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-[#FAFAFA] border-0 text-[#333333] placeholder:text-[#828282] focus-visible:ring-2 focus-visible:ring-corporate-navy-500/30 rounded-xl"
                        style={{
                          boxShadow: 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff'
                        }}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-[#333333] font-semibold mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-[#FAFAFA] border-0 text-[#333333] placeholder:text-[#828282] focus-visible:ring-2 focus-visible:ring-corporate-navy-500/30 rounded-xl"
                        style={{
                          boxShadow: 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff'
                        }}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-[#333333] font-semibold mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="bg-[#FAFAFA] border-0 text-[#333333] placeholder:text-[#828282] focus-visible:ring-2 focus-visible:ring-corporate-navy-500/30 rounded-xl"
                      style={{
                        boxShadow: 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff'
                      }}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-[#333333] font-semibold mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your needs..."
                      rows={6}
                      className="bg-[#FAFAFA] border-0 text-[#333333] placeholder:text-[#828282] focus-visible:ring-2 focus-visible:ring-corporate-navy-500/30 rounded-xl resize-none"
                      style={{
                        boxShadow: 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff'
                      }}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-corporate-navy-600 to-corporate-navy-500 text-white rounded-xl font-semibold py-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info Cards - Takes 1 column */}
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  boxShadow: '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                }}>
                <div className="w-12 h-12 bg-gradient-to-br from-corporate-navy-600 to-corporate-navy-500 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Visit Us</h3>
                <p className="text-[#828282] leading-relaxed">
                  Visakhapatnam<br />
                  Andhra Pradesh, India
                </p>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  boxShadow: '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                }}>
                <div className="w-12 h-12 bg-gradient-to-br from-corporate-navy-600 to-corporate-navy-500 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Call Us</h3>
                <a 
                  href="tel:+919848756956" 
                  className="text-[#828282] hover:text-corporate-navy-600 transition-colors duration-200"
                >
                  +91 9848756956
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  boxShadow: '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                }}>
                <div className="w-12 h-12 bg-gradient-to-br from-corporate-navy-600 to-corporate-navy-500 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Email Us</h3>
                <a 
                  href="mailto:support@Diligince.ai" 
                  className="text-[#828282] hover:text-corporate-navy-600 transition-colors duration-200 break-all"
                >
                  support@Diligince.ai
                </a>
              </div>

              {/* Business Hours Card */}
              <div className="bg-gradient-to-br from-corporate-navy-600 to-corporate-navy-500 rounded-2xl p-6"
                style={{
                  boxShadow: '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                }}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Business Hours</h3>
                <div className="text-white/90 space-y-1 text-sm">
                  <p>Monday - Friday</p>
                  <p className="font-semibold">9:00 AM - 6:00 PM IST</p>
                  <p className="mt-2">Saturday</p>
                  <p className="font-semibold">10:00 AM - 2:00 PM IST</p>
                  <p className="mt-2">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
