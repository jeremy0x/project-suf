
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import SessionsSection from '../components/home/SessionsSection';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingPreviewSection from '../components/home/PricingPreviewSection';
import CTASection from '../components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <SessionsSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
