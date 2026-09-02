import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../src/components/HeroSection';
import { EligibilityQuiz } from '../src/components/EligibilityQuiz';
import { FaqSection } from '../src/components/FaqSection';
import { SalaryCalculator } from '../src/components/SalaryCalculator';
import { CurriculumSyllabus } from '../src/components/CurriculumSyllabus';
import { OfficialValidation } from '../src/components/OfficialValidation';
import { WhatsAppFloating } from '../src/components/WhatsAppFloating';

describe('Supletivo Brasil - Suite de Testes Completa', () => {
  it('deve renderizar a HeroSection com o título principal e os cards', () => {
    const handleOpen = vi.fn();
    render(<HeroSection onOpenLeadModal={handleOpen} />);
    
    expect(screen.getByText(/Estude\./i)).toBeInTheDocument();
    expect(screen.getByText(/Dê a Virada\./i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ensino Médio/i).length).toBeGreaterThan(0);
  });

  it('deve interagir com a Calculadora Salarial e calcular projeção', () => {
    const handleOpen = vi.fn();
    render(<SalaryCalculator onOpenLeadModal={handleOpen} />);

    expect(screen.getByText(/Calcule o Retorno do seu/i)).toBeInTheDocument();
    const btnEM = screen.getByText(/Ensino Médio \(\+45%\)/i);
    fireEvent.click(btnEM);
    expect(screen.getByText(/Garantir Meu Aumento Salarial/i)).toBeInTheDocument();
  });

  it('deve permitir trocar abas na Grade Curricular', () => {
    render(<CurriculumSyllabus />);

    expect(screen.getByText(/O que você vai estudar no seu ritmo/i)).toBeInTheDocument();
    const tabMatematica = screen.getByRole('button', { name: /Matemática & Tecnologias/i });
    fireEvent.click(tabMatematica);
    expect(screen.getByText(/Matemática Básica, Álgebra, Geometria e Finanças/i)).toBeInTheDocument();
  });

  it('deve validar amparo legal e seletor de estado no Validador Oficial', () => {
    render(<OfficialValidation />);

    expect(screen.getByText(/Validação Nacional/i)).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'RJ' } });
    expect(screen.getByText(/Rio de Janeiro - RJ/i)).toBeInTheDocument();
  });

  it('deve abrir o popover do WhatsApp flutuante ao clicar no gatilho', () => {
    const handleOpen = vi.fn();
    render(<WhatsAppFloating onOpenLeadModal={handleOpen} />);

    const trigger = screen.getByLabelText(/Atendimento via WhatsApp/i);
    fireEvent.click(trigger);
    expect(screen.getByText(/Plantão de Dúvidas Online/i)).toBeInTheDocument();
  });

  it('deve calcular corretamente a elegibilidade no Quiz', () => {
    const handleSelectCourse = vi.fn();
    render(<EligibilityQuiz onSelectCourse={handleSelectCourse} />);

    const ageInput = screen.getByPlaceholderText(/Ex: 28/i);
    fireEvent.change(ageInput, { target: { value: '25' } });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'medio_incompleto' } });

    expect(screen.getByText(/Parabéns! Você está 100% elegível/i)).toBeInTheDocument();
  });

  it('deve exibir resposta padrão e abrir novas perguntas no FAQ', () => {
    render(<FaqSection />);

    // Item inicial aberto 'mec'
    expect(screen.getByText(/A certificação é emitida por instituição parceira/i)).toBeInTheDocument();

    const faqQuestion = screen.getByText(/Quanto tempo leva para concluir\?/i);
    fireEvent.click(faqQuestion);
    expect(screen.getByText(/O tempo médio de conclusão varia entre 3 a 6 meses/i)).toBeInTheDocument();
  });
});
