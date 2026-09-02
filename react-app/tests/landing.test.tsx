import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../src/components/HeroSection';
import { EligibilityQuiz } from '../src/components/EligibilityQuiz';
import { SalaryCalculator } from '../src/components/SalaryCalculator';
import { CurriculumSyllabus } from '../src/components/CurriculumSyllabus';
import { OfficialValidation } from '../src/components/OfficialValidation';
import { WhatsAppFloating } from '../src/components/WhatsAppFloating';
import { FaqSection } from '../src/components/FaqSection';

describe('Supletivo Brasil - Suite de Testes Completa', () => {
  it('deve renderizar a HeroSection com o título principal e os cards', () => {
    const handleOpenModal = vi.fn();
    render(<HeroSection onOpenLeadModal={handleOpenModal} />);

    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Estude/i);
    expect(mainHeading).toHaveTextContent(/Conclua/i);
    expect(mainHeading).toHaveTextContent(/Dê a Virada/i);

    expect(screen.getByLabelText(/Ver informações sobre Ensino Médio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ver informações sobre Fundamental/i)).toBeInTheDocument();
  });

  it('deve interagir com a Calculadora Salarial e calcular projeção', () => {
    const handleOpenModal = vi.fn();
    render(<SalaryCalculator onOpenLeadModal={handleOpenModal} />);

    expect(screen.getByText(/Calcule o Retorno do seu/i)).toBeInTheDocument();
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '2500' } });
    expect(screen.getByText(/R\$ 2\.500/i)).toBeInTheDocument();
  });

  it('deve permitir trocar abas na Grade Curricular', () => {
    render(<CurriculumSyllabus />);

    expect(screen.getByText(/Estrutura Pedagógica Completa/i)).toBeInTheDocument();
    const mathTab = screen.getByRole('button', { name: /Matemática & Tecnologias/i });
    fireEvent.click(mathTab);
    expect(screen.getByText(/Operações Fundamentais e Regra de Três/i)).toBeInTheDocument();
  });

  it('deve validar amparo legal e seletor de estado no Validador Oficial', () => {
    const handleOpenModal = vi.fn();
    render(<OfficialValidation onOpenLeadModal={handleOpenModal} />);

    expect(screen.getByText(/Amparo Jurídico & Diário Oficial/i)).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'RJ' } });
    expect(screen.getByText(/CEE-RJ \/ Resolução Vigente/i)).toBeInTheDocument();
  });

  it('deve abrir o popover do WhatsApp flutuante ao clicar no gatilho', () => {
    const handleOpenModal = vi.fn();
    render(<WhatsAppFloating onOpenLeadModal={handleOpenModal} />);

    const toggleBtn = screen.getByLabelText(/Atendimento via WhatsApp/i);
    fireEvent.click(toggleBtn);
    expect(screen.getByText(/Plantão de Dúvidas Online/i)).toBeInTheDocument();
    expect(screen.getByText(/Chamar no WhatsApp/i)).toBeInTheDocument();
  });

  it('deve calcular corretamente a elegibilidade no Quiz', () => {
    const handleSelectCourse = vi.fn();
    render(<EligibilityQuiz onSelectCourse={handleSelectCourse} />);

    const ageInput = screen.getByRole('spinbutton');
    fireEvent.change(ageInput, { target: { value: '22' } });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'medio_incompleto' } });

    expect(screen.getByText(/Parabéns! Você está 100% elegível para o Ensino Médio ou Fundamental/i)).toBeInTheDocument();
  });

  it('deve exibir resposta padrão aberta e alternar perguntas no FAQ', () => {
    render(<FaqSection />);

    expect(screen.getByText(/Perguntas Frequentes/i)).toBeInTheDocument();
    expect(screen.getByText(/A certificação é emitida por instituição parceira devidamente credenciada/i)).toBeInTheDocument();

    const secondQuestion = screen.getByText(/Quanto tempo leva para concluir\?/i);
    fireEvent.click(secondQuestion);
    expect(screen.getByText(/O tempo médio de conclusão varia entre 3 a 6 meses/i)).toBeInTheDocument();
  });
});
