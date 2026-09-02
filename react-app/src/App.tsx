import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { CurriculumSyllabus } from './components/CurriculumSyllabus';
import { SalaryCalculator } from './components/SalaryCalculator';
import { OfficialValidation } from './components/OfficialValidation';
import { StepsJourney } from './components/StepsJourney';
import { EligibilityQuiz } from './components/EligibilityQuiz';
import { StoriesSection } from './components/StoriesSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { LeadModal } from './components/LeadModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<'medio' | 'fundamental' | 'ambos'>('ambos');

  const handleOpenModal = (courseName?: string) => {
    if (courseName === 'fundamental') {
      setSelectedCourse('fundamental');
    } else if (courseName === 'medio') {
      setSelectedCourse('medio');
    } else {
      setSelectedCourse('ambos');
    }
    setModalOpen(true);
  };

  const handleSelectQuizCourse = (course: 'medio' | 'fundamental' | 'ambos') => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 selection:bg-orange-500 selection:text-white flex flex-col font-sans">
      {/* 1. Hero Principal com Acordeão Interativo e Imagens Contextualizadas */}
      <HeroSection onOpenLeadModal={() => handleOpenModal()} />

      {/* 2. Destaques & Segurança Jurídica MEC */}
      <BenefitsSection />

      {/* 3. Calculadora Interativa de Retorno Salarial / ROI do Diploma */}
      <SalaryCalculator onOpenLeadModal={handleOpenModal} />

      {/* 4. Grade Curricular Interativa & Áreas do Conhecimento */}
      <CurriculumSyllabus />

      {/* 5. Validação Nacional & Diário Oficial por Estado */}
      <OfficialValidation />

      {/* 6. Linha do Tempo e Passo a Passo */}
      <StepsJourney onOpenLeadModal={handleOpenModal} />

      {/* 7. Simulador de Elegibilidade EJA */}
      <EligibilityQuiz onSelectCourse={handleSelectQuizCourse} />

      {/* 8. Depoimentos e Histórias Reais */}
      <StoriesSection />

      {/* 9. Tabela de Preços e Garantia 7 Dias */}
      <PricingSection onOpenLeadModal={handleOpenModal} />

      {/* 10. FAQ Detalhado */}
      <FaqSection />

      {/* 11. Rodapé Institucional */}
      <Footer />

      {/* 12. Modal de Matrícula e Captação de Leads */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCourse={selectedCourse}
      />

      {/* 13. Atendimento WhatsApp Flutuante com Widget Interativo */}
      <WhatsAppFloating onOpenLeadModal={() => handleOpenModal()} />
    </div>
  );
};

export default App;
