import Layout from "../components/Layout";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import SessionsSection from "../components/home/SessionsSection";
import AboutSection from "../components/home/AboutSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import MembershipPlansSection from "../components/home/MembershipPlansSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <SessionsSection />
      <AboutSection />
      <MembershipPlansSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
