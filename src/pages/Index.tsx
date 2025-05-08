
import Layout from '../components/Layout';
import {
  HeroSection,
  ServicesSection,
  SessionsSection,
  AboutSection,
  TestimonialsSection,
  CTASection,
  MembershipPlansSection
} from '../components/home';

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
