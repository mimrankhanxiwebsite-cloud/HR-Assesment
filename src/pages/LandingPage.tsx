import NavigationBar from '../components/landing/NavigationBar'
import HeroSection from '../components/landing/HeroSection'
import TrustedCompanies from '../components/landing/TrustedCompanies'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorks from '../components/landing/HowItWorks'
import DashboardPreview from '../components/landing/DashboardPreview'
import AssessmentCategories from '../components/landing/AssessmentCategories'
import WhyChooseUs from '../components/landing/WhyChooseUs'
import Testimonials from '../components/landing/Testimonials'
import PricingSection from '../components/landing/PricingSection'
import FAQSection from '../components/landing/FAQSection'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/30 selection:text-primary">
      <NavigationBar />
      
      <main>
        <HeroSection />
        <TrustedCompanies />
        <FeaturesSection />
        <HowItWorks />
        <DashboardPreview />
        <AssessmentCategories />
        <WhyChooseUs />
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
