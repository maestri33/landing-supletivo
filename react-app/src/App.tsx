import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { StepsJourney } from './components/StepsJourney';
import { EligibilityQuiz } from './components/EligibilityQuiz';
import { StoriesSection } from './components/StoriesSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<'medio' | 'fundamental' | 'ambos'>('ambos');

  const handleOpenLeadModal = (course: 'medio' | 'fundamental' | 'ambos' = 'ambos') => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <HeroSection onOpenLeadModal={handleOpenLeadModal} />
      <BenefitsSection />
      <StepsJourney onOpenLeadModal={handleOpenLeadModal} />
      <EligibilityQuiz onSelectCourse={handleOpenLeadModal} />
      <StoriesSection />
      <PricingSection onOpenLeadModal={handleOpenLeadModal} />
      <FaqSection />
      <Footer />

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
};

export default App;
