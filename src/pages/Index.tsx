
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import SessionsSection from '../components/home/SessionsSection';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import MembershipPlansSection from '../components/home/MembershipPlansSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <SessionsSection />
      <AboutSection />
      <TestimonialsSection />
      <MembershipPlansSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
