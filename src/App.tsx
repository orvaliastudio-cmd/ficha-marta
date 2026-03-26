/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Printer, Trash2, Save, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface ChakraData {
  equilibrado: boolean;
  desequilibrio: boolean;
  observacoes: string;
}

interface FormData {
  cliente: {
    dataAtendimento: string;
    dataNascimento: string;
    nomeCompleto: string;
  };
  numerologia: {
    alma: string;
    personalidade: string;
    destino: string;
  };
  leitura: {
    licaoDeVida: string;
    anoPessoal: string;
  };
  planosConsciencia: boolean[];
  karma: string;
  dharma: string;
  chakras: {
    coronario: ChakraData;
    frontal: ChakraData;
    laringeo: ChakraData;
    cardiaco: ChakraData;
    plexoSolar: ChakraData;
    esplenico: ChakraData;
    basico: ChakraData;
  };
  pinaculos: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  };
}

const initialChakra = { equilibrado: false, desequilibrio: false, observacoes: '' };

const initialData: FormData = {
  cliente: { dataAtendimento: '', dataNascimento: '', nomeCompleto: '' },
  numerologia: { alma: '', personalidade: '', destino: '' },
  leitura: { licaoDeVida: '', anoPessoal: '' },
  planosConsciencia: Array(9).fill(false),
  karma: '',
  dharma: '',
  chakras: {
    coronario: { ...initialChakra },
    frontal: { ...initialChakra },
    laringeo: { ...initialChakra },
    cardiaco: { ...initialChakra },
    plexoSolar: { ...initialChakra },
    esplenico: { ...initialChakra },
    basico: { ...initialChakra },
  },
  pinaculos: { p1: '', p2: '', p3: '', p4: '' },
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Ficha de Atendimento - Marta Ana Chiconato";
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handlePrintBlank = () => {
    const currentData = { ...formData };
    setFormData(initialData);
    // Small timeout to ensure the UI updates before the print dialog opens
    setTimeout(() => {
      window.print();
      setFormData(currentData);
    }, 100);
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os campos?')) {
      setFormData(initialData);
    }
  };

  const updateField = (section: keyof FormData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  };

  const togglePlano = (index: number) => {
    const newPlanos = [...formData.planosConsciencia];
    newPlanos[index] = !newPlanos[index];
    setFormData((prev) => ({ ...prev, planosConsciencia: newPlanos }));
  };

  const updateChakra = (key: keyof FormData['chakras'], field: keyof ChakraData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      chakras: {
        ...prev.chakras,
        [key]: {
          ...prev.chakras[key],
          [field]: value,
        },
      },
    }));
  };

  // Dynamic Title for PDF Filename
  useEffect(() => {
    const clientName = formData.cliente.nomeCompleto.trim();
    if (clientName) {
      document.title = `Ficha de Atendimento - ${clientName}`;
    } else {
      document.title = "Ficha de Atendimento";
    }
  }, [formData.cliente.nomeCompleto]);

  return (
    <div className="min-h-screen bg-stone-100 py-4 md:py-8 px-2 md:px-4 print:p-0 print:bg-white">
      {/* Top Bar - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <h1 className="text-xl md:text-2xl font-bold text-stone-800 flex items-center gap-2">
          <FileText className="w-5 h-5 md:w-6 md:h-6" />
          Ficha de Atendimento
        </h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors shadow-sm text-sm md:text-base"
          >
            <Trash2 className="w-4 h-4" />
            Limpar
          </button>
          <button
            onClick={handlePrintBlank}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors shadow-sm text-sm md:text-base"
          >
            <FileText className="w-4 h-4" />
            BAIXAR EM PDF FICHA EM BRANCO
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-colors shadow-sm text-sm md:text-base"
          >
            <Printer className="w-4 h-4" />
            BAIXAR EM PDF FICHA PREENCHIDA
          </button>
        </div>
      </div>

      {/* Instructions - Visible only on Screen, at the top for better visibility */}
      <div className="max-w-4xl mx-auto mb-8 px-4 print:hidden">
        <div className="bg-stone-100 border border-stone-200 rounded-lg p-6 text-stone-700 text-sm shadow-sm">
          <h4 className="font-bold uppercase tracking-wider mb-4 text-stone-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-stone-800 rounded-full"></span>
            Instruções para Impressão e Uso Digital
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="font-bold text-stone-400">•</span>
              <p><strong>Para Preencher Online:</strong> Clique nos campos de texto e caixas de seleção. Ao finalizar, use o botão <strong>"BAIXAR EM PDF FICHA PREENCHIDA"</strong> e escolha a opção <strong>"Salvar como PDF"</strong>.</p>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-stone-400">•</span>
              <p><strong>Para Imprimir com Qualidade:</strong> No menu de impressão, certifique-se de que a opção <strong>"Gráficos de plano de fundo"</strong> esteja marcada para que os símbolos dos Chakras apareçam.</p>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-stone-400">•</span>
              <p><strong>Ajuste de Margem:</strong> Selecione <strong>"Ajustar à página"</strong> ou <strong>"Margens: Nenhuma"</strong> para garantir que o layout seja respeitado no papel.</p>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-stone-400">•</span>
              <p><strong>Confidencialidade:</strong> Este é um Formulário de Análise Energética Confidencial.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* The Form Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[160mm] mx-auto bg-[#fdfcf8] shadow-xl p-4 sm:p-8 md:p-12 print:shadow-none print:p-0 print:m-0 min-h-screen md:min-h-[297mm] text-stone-900 print-container"
        ref={printRef}
      >
        {/* Header Banner */}
        <div className="mb-12">
          <img 
            src="https://i.ibb.co/3mVPmrm8/marta-perfil-fundo-transparente.png" 
            alt="Banner Marta Ana Chiconato" 
            className="w-full h-auto object-contain max-h-48"
            referrerPolicy="no-referrer"
          />
          <div className="mt-6 border-t border-stone-300 w-full"></div>
        </div>

        {/* Section 1: Cliente */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-4">
            1. CLIENTE
            <div className="flex-grow border-t border-stone-200"></div>
          </h3>
          <div className="grid grid-cols-2 gap-6 print:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase text-stone-500">Data do Atendimento</label>
              <input
                type="text"
                value={formData.cliente.dataAtendimento}
                onChange={(e) => updateField('cliente', 'dataAtendimento', e.target.value)}
                className="border-b border-stone-300 bg-transparent outline-none py-1 focus:border-stone-800"
                placeholder="___/___/___"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase text-stone-500">Data de Nascimento</label>
              <input
                type="text"
                value={formData.cliente.dataNascimento}
                onChange={(e) => updateField('cliente', 'dataNascimento', e.target.value)}
                className="border-b border-stone-300 bg-transparent outline-none py-1 focus:border-stone-800"
                placeholder="___/___/___"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-xs uppercase text-stone-500">NOME DE BATISMO</label>
              <input
                type="text"
                value={formData.cliente.nomeCompleto}
                onChange={(e) => updateField('cliente', 'nomeCompleto', e.target.value)}
                className="border-b border-stone-400 bg-transparent outline-none py-1 focus:border-stone-800"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Numerologia */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-4">
            2. NUMEROLOGIA
            <div className="flex-grow border-t border-stone-200"></div>
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 print:flex-row print:items-center print:gap-3">
              <label className="text-sm font-medium min-w-[100px]">Alma:</label>
              <input
                type="text"
                value={formData.numerologia.alma}
                onChange={(e) => updateField('numerologia', 'alma', e.target.value)}
                className="flex-grow border-b border-stone-400 bg-transparent outline-none py-1"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 print:flex-row print:items-center print:gap-3">
              <label className="text-sm font-medium min-w-[100px]">Personalidade:</label>
              <input
                type="text"
                value={formData.numerologia.personalidade}
                onChange={(e) => updateField('numerologia', 'personalidade', e.target.value)}
                className="flex-grow border-b border-stone-400 bg-transparent outline-none py-1"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 print:flex-row print:items-center print:gap-3">
              <label className="text-sm font-medium min-w-[100px]">Destino:</label>
              <input
                type="text"
                value={formData.numerologia.destino}
                onChange={(e) => updateField('numerologia', 'destino', e.target.value)}
                className="flex-grow border-b border-stone-400 bg-transparent outline-none py-1"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Leitura */}
        <section className="mb-4 print:mb-0 print:break-after-page">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-4">
            3. LEITURA
            <div className="flex-grow border-t border-stone-200"></div>
          </h3>
          <div className="border border-stone-300 p-4 rounded-sm">
            <div className="mb-4">
              <label className="text-sm font-medium block mb-2">Lição de Vida:</label>
              <textarea
                value={formData.leitura.licaoDeVida}
                onChange={(e) => updateField('leitura', 'licaoDeVida', e.target.value)}
                rows={4}
                className="w-full bg-transparent border-none outline-none resize-none leading-relaxed"
                style={{ backgroundImage: 'linear-gradient(transparent, transparent 27px, #e5e7eb 27px)', backgroundSize: '100% 28px' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Ano Pessoal:</label>
              <input
                type="text"
                value={formData.leitura.anoPessoal}
                onChange={(e) => updateField('leitura', 'anoPessoal', e.target.value)}
                className="w-32 border-b border-stone-400 bg-transparent outline-none py-1"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Planos de Consciência */}
        <section className="mb-8 print:mt-8 print:break-before-page">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-4">
            4. PLANOS DE CONSCIÊNCIA
            <div className="flex-grow border-t border-stone-200"></div>
          </h3>
          <div className="space-y-4 pl-0 sm:pl-4">
            {[
              { label: 'MENTAL', nums: [1, 8] },
              { label: 'EMOCIONAL', nums: [2, 3, 6] },
              { label: 'FÍSICO', nums: [4, 5] },
              { label: 'ESPIRITUAL', nums: [7, 9] },
            ].map((plano) => (
              <div key={plano.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 print:flex-row print:items-center print:gap-8">
                <span className="text-sm font-bold min-w-[140px] tracking-widest">— {plano.label}</span>
                <div className="flex flex-wrap gap-4 sm:gap-8">
                  {plano.nums.map((num) => (
                    <div 
                      key={num} 
                      className="flex items-center gap-3 cursor-pointer group" 
                      onClick={() => togglePlano(num - 1)}
                    >
                      <span className="text-sm font-medium">[{num}]</span>
                      <div className={`w-5 h-5 border border-stone-400 flex items-center justify-center rounded-sm transition-colors group-hover:border-stone-600 ${formData.planosConsciencia[num - 1] ? 'bg-stone-800 border-stone-800' : ''}`}>
                        {formData.planosConsciencia[num - 1] && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Karma e Darma */}
        <section className="mb-12">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-4">
            5. KARMA E DARMA
            <div className="flex-grow border-t border-stone-200"></div>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="border border-stone-300 p-4 rounded-sm">
              <label className="text-sm font-medium block mb-2">Karma:</label>
              <textarea
                value={formData.karma}
                onChange={(e) => setFormData(prev => ({ ...prev, karma: e.target.value }))}
                rows={5}
                className="w-full bg-transparent border-none outline-none resize-none leading-relaxed"
                style={{ backgroundImage: 'linear-gradient(transparent, transparent 27px, #e5e7eb 27px)', backgroundSize: '100% 28px' }}
              />
            </div>
            <div className="border border-stone-300 p-4 rounded-sm">
              <label className="text-sm font-medium block mb-2">Dharma:</label>
              <textarea
                value={formData.dharma}
                onChange={(e) => setFormData(prev => ({ ...prev, dharma: e.target.value }))}
                rows={5}
                className="w-full bg-transparent border-none outline-none resize-none leading-relaxed"
                style={{ backgroundImage: 'linear-gradient(transparent, transparent 27px, #e5e7eb 27px)', backgroundSize: '100% 28px' }}
              />
            </div>
          </div>
        </section>

        {/* Page Break for Print - Start Page 3 */}
        <div className="break-before-page"></div>

        {/* Section 7: Pináculos - Now on Page 3 */}
        <section className="mb-6 pt-4 print:pt-0 print:mb-4">
          <div className="text-center mb-6 print:mb-2">
            <h2 className="text-xl tracking-widest uppercase font-bold print:text-lg">Pináculos — <span className="italic text-[#8b2b2b]">Ciclos de Vida</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-4 print:gap-2">
            {[
              { key: 'p1', label: '1º PINÁCULO' },
              { key: 'p2', label: '2º PINÁCULO' },
              { key: 'p3', label: '3º PINÁCULO' },
              { key: 'p4', label: '4º PINÁCULO' },
            ].map((p) => (
              <div key={p.key} className="border border-stone-300 p-3 rounded-sm print:p-2">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-2 print:mb-1">{p.label}</h4>
                <textarea
                  value={formData.pinaculos[p.key as keyof FormData['pinaculos']]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pinaculos: { ...prev.pinaculos, [p.key]: e.target.value }
                  }))}
                  rows={4}
                  className="w-full bg-transparent border-none outline-none resize-none leading-relaxed text-sm print:text-xs"
                  style={{ backgroundImage: 'linear-gradient(transparent, transparent 23px, #e5e7eb 23px)', backgroundSize: '100% 24px' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Page Break for Print - Start Page 4 */}
        <div className="break-before-page"></div>

        {/* Section 6: Análise Energética - Chakras - Now on Page 4 */}
        <section className="mb-6 pt-4 print:pt-0 print:mb-4">
          <div className="text-center mb-4 print:mb-2">
            <h2 className="text-xl tracking-widest uppercase font-bold print:text-lg">Análise Energética — <span className="italic text-[#8b2b2b]">Chakras</span></h2>
          </div>
          
          <div className="relative">
            <div className="space-y-4 print:space-y-2">
              {[
                { key: 'coronario', label: 'Coronário', icon: 'https://i.ibb.co/Vs1dW6X/1-coronario.png' },
                { key: 'frontal', label: 'Frontal', icon: 'https://i.ibb.co/xKNqLz36/2-frontal.png' },
                { key: 'laringeo', label: 'Laríngeo', icon: 'https://i.ibb.co/xq7r2nQg/3-laringeo.png' },
                { key: 'cardiaco', label: 'Cardíaco', icon: 'https://i.ibb.co/qFBJtLS7/4-cardiaco.png' },
                { key: 'plexoSolar', label: 'Plexo Solar', icon: 'https://i.ibb.co/LzS9tTkv/5-plexo-solar.png' },
                { key: 'esplenico', label: 'Chakra Esplênico', icon: 'https://i.ibb.co/LXfy4DFW/6-espl-nico.png' },
                { key: 'basico', label: 'Chakra Básico', icon: 'https://i.ibb.co/8g4nnQvh/7-basico.png' },
              ].map((chakra) => (
                <div key={chakra.key} className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-6 print:flex-row print:items-start print:gap-4">
                  <div className="w-[80px] print:w-[60px] flex justify-center">
                    <img 
                      src={chakra.icon} 
                      alt={chakra.label} 
                      className="w-12 h-12 print:w-10 print:h-10 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow pt-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                      <span className="text-lg italic font-medium text-center sm:text-left print:text-base">{chakra.label}</span>
                      <div className="flex justify-center sm:justify-end gap-3 sm:gap-4 print:gap-3">
                        <label className="flex items-center gap-1 text-[10px] sm:text-xs uppercase cursor-pointer print:text-[9px]">
                          <input
                            type="checkbox"
                            checked={formData.chakras[chakra.key as keyof FormData['chakras']].equilibrado}
                            onChange={(e) => updateChakra(chakra.key as keyof FormData['chakras'], 'equilibrado', e.target.checked)}
                            className="w-3 h-3 accent-stone-800"
                          />
                          Equilibrado
                        </label>
                        <label className="flex items-center gap-1 text-[10px] sm:text-xs uppercase cursor-pointer print:text-[9px]">
                          <input
                            type="checkbox"
                            checked={formData.chakras[chakra.key as keyof FormData['chakras']].desequilibrio}
                            onChange={(e) => updateChakra(chakra.key as keyof FormData['chakras'], 'desequilibrio', e.target.checked)}
                            className="w-3 h-3 accent-stone-800"
                          />
                          Desequilíbrio
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                      <span className="text-[10px] uppercase text-stone-500 whitespace-nowrap print:text-[9px]">Obs:</span>
                      <input
                        type="text"
                        value={formData.chakras[chakra.key as keyof FormData['chakras']].observacoes}
                        onChange={(e) => updateChakra(chakra.key as keyof FormData['chakras'], 'observacoes', e.target.value)}
                        className="flex-grow border-b border-stone-300 bg-transparent outline-none py-0.5 text-sm print:text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center text-[9px] uppercase tracking-widest text-stone-400 print:mt-4">
            Formulário de Análise Energética — Confidencial
          </div>
        </section>
      </motion.div>

      {/* Footer - Hidden on Print */}
      <div className="max-w-4xl mx-auto mt-8 mb-12 px-4 text-center text-stone-500 text-sm print:hidden">
        <p>© 2026 Marta Ana Chiconato. Todos os direitos reservados.</p>
        <p className="mt-2 text-xs">
          Desenvolvido por <a href="https://www.orvalia.com.br" target="_blank" rel="noopener noreferrer" className="text-[#008686] font-semibold hover:text-[#006666] transition-colors">Orvalia Studio</a>
        </p>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          html, body {
            height: auto !important;
            background: white !important;
          }
          * {
            box-sizing: border-box !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            overflow-x: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 210mm !important; /* Full A4 width */
            margin: 0 !important;
            padding: 20mm !important; /* Internal margin for content */
            box-shadow: none !important;
            background-color: #fdfcf8 !important;
            display: block !important;
            position: relative !important;
            overflow: visible !important;
            min-height: 297mm !important;
          }
          /* Header Banner adjustment */
          .mb-12 {
            margin-bottom: 15px !important;
          }
          .mt-6 {
            margin-top: 10px !important;
          }
          /* Fix for textareas with lines */
          textarea {
            border: none !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color: black !important;
            font-size: 10pt !important;
            background-image: linear-gradient(transparent, transparent 23px, #ccc 23px) !important;
            line-height: 24px !important;
            width: 100% !important;
          }
          /* Ensure sections don't break awkwardly */
          section {
            page-break-inside: avoid;
            margin-bottom: 15px !important;
            display: block !important;
            width: 100% !important;
          }
          input::placeholder {
            color: transparent !important;
          }
          /* Ensure images print well */
          img {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            margin: 0 auto !important;
          }
          /* Ensure textareas and inputs show their content properly */
          input {
            border: none !important;
            border-bottom: 1.5px solid #000 !important;
            color: black !important;
            font-size: 11pt !important;
            background: transparent !important;
            width: 100% !important;
            display: block !important;
            padding-bottom: 2px !important;
            margin-top: 4px !important;
          }
          label {
            font-weight: bold !important;
            font-size: 9pt !important;
            color: #444 !important;
          }
          h1, h2, h3, h4, span {
            color: black !important;
          }
          .grid {
            display: grid !important;
            gap: 1.5rem !important;
          }
          .flex {
            display: flex !important;
          }
          .flex-col {
            flex-direction: column !important;
          }
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .col-span-2 {
            grid-column: span 2 / span 2 !important;
          }
          .print\:break-before-page {
            break-before: page !important;
            page-break-before: always !important;
            display: block !important;
          }
          .print\:break-after-page {
            break-after: page !important;
            page-break-after: always !important;
            display: block !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
