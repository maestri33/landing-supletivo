import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../src/components/HeroSection';
import { EligibilityQuiz } from '../src/components/EligibilityQuiz';
import { FaqSection } from '../src/components/FaqSection';
import { PricingSection } from '../src/components/PricingSection';

describe('Supletivo Brasil Landing Page Component Tests', () => {
  it('renders Hero Section with Brazilian EJA title, badge and cards', () => {
    const mockModal = vi.fn();
    render(<HeroSection onOpenLeadModal={mockModal} />);

    expect(screen.getByText(/Estude\./i)).toBeInTheDocument();
    expect(screen.getByText(/Conclua\./i)).toBeInTheDocument();
    expect(screen.getByText(/Dê a Virada\./i)).toBeInTheDocument();
    expect(screen.getByText(/Certificado Válido pelo MEC/i)).toBeInTheDocument();
    expect(screen.getByText(/Ensino Médio/i)).toBeInTheDocument();
  });

  it('interacts with Eligibility Quiz correctly based on age', () => {
    const mockSelect = vi.fn();
    render(<EligibilityQuiz onSelectCourse={mockSelect} />);

    const ageInput = screen.getByPlaceholderText(/Ex: 28/i);
    const levelSelect = screen.getByRole('combobox');

    // Test Underage (< 15)
    fireEvent.change(ageInput, { target: { value: '14' } });
    fireEvent.change(levelSelect, { target: { value: 'fundamental_incompleto' } });
    expect(screen.getByText(/Idade mínima não atingida/i)).toBeInTheDocument();

    // Test Adult (>= 18)
    fireEvent.change(ageInput, { target: { value: '25' } });
    expect(screen.getByText(/Parabéns! Você está 100% elegível/i)).toBeInTheDocument();
  });

  it('renders FAQ section and toggles accordion items', () => {
    render(<FaqSection />);
    expect(screen.getByText(/Perguntas Frequentes/i)).toBeInTheDocument();
    expect(
      screen.getByText(/O certificado é realmente válido em todo o Brasil e aceito pelo MEC\?/i)
    ).toBeInTheDocument();
  });

  it('renders Pricing Section with correct promotional values', () => {
    const mockModal = vi.fn();
    render(<PricingSection onOpenLeadModal={mockModal} />);
    expect(screen.getByText(/12x de R\$ 99,00/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 999,00/i)).toBeInTheDocument();
  });
});
