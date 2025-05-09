import Layout from "../components/Layout";
import {
  HeroSection,
  ServicesSection,
  SessionsSection,
  AboutSection,
  MembershipPlansSection,
  TestimonialsSection,
  CTASection,
} from "../components/home";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <SessionsSection />
      <AboutSection />
      <MembershipPlansSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
