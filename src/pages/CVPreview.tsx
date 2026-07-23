import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { templateThemes } from '../types/cv';
import { 
  ChevronLeftIcon, CheckCircle2Icon, Loader2, XIcon, 
  SendIcon, Menu, 
  UploadIcon, FileCheck, ImageIcon, Palette,
  ChevronDown, ChevronUp, Sliders
} from 'lucide-react';

const colorPalettes = [
  { name: 'Classic Blue', color: '#1e3a8a' },
  { name: 'Ocean Teal', color: '#0f766e' },
  { name: 'Royal Purple', color: '#581c87' },
  { name: 'Crimson Red', color: '#dc2626' },
  { name: 'Forest Green', color: '#166534' },
  { name: 'Amber Gold', color: '#b45309' },
  { name: 'Pink Rose', color: '#be185d' },
  { name: 'Slate Gray', color: '#475569' },
  { name: 'Cyan Sky', color: '#0891b2' },
  { name: 'Indigo', color: '#4338ca' },
  { name: 'Emerald', color: '#059669' },
  { name: 'Dark', color: '#111827' },
];

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor, setShowDS, setPhotoShape, setSectionPageBreak, adjustSectionSpacing, resetSectionSpacing } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');
  const [previewScale, setPreviewScale] = useState(0.45);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  
  // NEW: Manual Height State (Default 297mm for Standard A4)
  const [manualHeight, setManualHeight] = useState(297);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setPreviewScale(0.30);
      else if (width < 768) setPreviewScale(0.35);
      else if (width < 1024) setPreviewScale(0.40);
      else setPreviewScale(0.48);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!cvData) return null;

  // Passing manualHeight down into the previewed template data
  const finalCVData = {
    ...cvData,
    manualHeight, // Passed to TemplateRenderer via CVTemplateBase
    personalInfo: cvData.personalInfo,
    contact: cvData.contact,
    skills: cvData.skills || [],
    languages: cvData.languages || [],
    professionalQualifications: cvData.professionalQualifications || [],
    workExperience: cvData.workExperience || [],
    education: cvData.education,
    references: cvData.references || [],
    projects: cvData.projects || [],
    achievements: cvData.achievements || [],
    extracurriculars: cvData.extracurriculars || [],
    profileImage: cvData.personalInfo?.photo || cvData.profileImage,
    showDS: cvData.showDS,
    photoShape: cvData.photoShape || 'round'
  };

  const handleSlipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=43b8bf4b90a4c63f2f931edfc646c148`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) setSlipUrl(result.data.url);
    } catch (error) {
      alert("Slip upload failed!");
    } finally { setIsUploading(false); }
  };

  const handleWhatsApp = () => {
    if (!slipUrl) return alert("Please upload the payment slip first!");
    try {
      const messageData = { ...finalCVData, paymentSlip: slipUrl, ds: cvData.showDS ? 1 : 0 };
      const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(messageData))));
      const message = `*NEW CV ORDER*\n\n*Slip:* ${slipUrl}\n\n*Ref Data:*\n${encodedData}`;
      window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
    } catch (err) { alert("Error generating data!"); }
  };

  const displayedTemplates = showAllTemplates ? templateThemes : templateThemes.slice(0, 8);

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col md:flex-row relative font-sans select-none overflow-hidden">
      
      {/* Sidebar Section - Fixed scroll behavior */}
      <div className={`fixed md:relative z-[80] h-full bg-white border-r w-[300px] md:w-[380px] transition-transform duration-300 flex flex-col shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 border-b flex justify-between items-center shrink-0 bg-white">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
            <ChevronLeftIcon size={14}/> Editor
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400"><XIcon size={22}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/30">
          <button onClick={() => setShowPayment(true)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[13px] flex items-center justify-center gap-2.5 shadow-xl hover:bg-blue-700 transition-all active:scale-95">
            <SendIcon size={18}/> Get Full CV
          </button>
          
          {/* Date & Signature Toggle */}
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><FileCheck size={18} /></div>
                <div><p className="text-[10px] font-black uppercase">Date & Signature</p></div>
              </div>
              <button onClick={() => setShowDS(!cvData.showDS)} className={`w-10 h-5 rounded-full transition-all flex items-center px-1 ${cvData.showDS ? 'bg-blue-600 justify-end' : 'bg-zinc-200 justify-start'}`}><div className="w-3 h-3 bg-white rounded-full" /></button>
            </div>
          </div>

          {/* Photo Shape Toggle */}
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-xl text-purple-600"><ImageIcon size={18} /></div>
                <div><p className="text-[10px] font-black uppercase">Photo Shape</p></div>
              </div>
              <div className="flex gap-1 bg-zinc-100 rounded-lg p-0.5">
                <button onClick={() => setPhotoShape('round')} className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${cvData.photoShape === 'round' ? 'bg-white text-purple-600 shadow-sm' : 'text-zinc-400'}`}>Round</button>
                <button onClick={() => setPhotoShape('square')} className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${cvData.photoShape === 'square' ? 'bg-white text-purple-600 shadow-sm' : 'text-zinc-400'}`}>Square</button>
              </div>
            </div>
          </div>

          {/* Color Palette Picker */}
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><Palette size={18} /></div>
              <p className="text-[10px] font-black uppercase">Color Theme</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {colorPalettes.map((p) => (
                <button key={p.color} onClick={() => updateThemeColor(p.color)} title={p.name}
                  className={`w-8 h-8 rounded-xl transition-all border-2 ${cvData.customColor === p.color ? 'border-zinc-800 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: p.color }}
                />
              ))}
            </div>
            <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-full h-8 rounded-xl cursor-pointer bg-white border p-0.5" />
          </div>

          {/* Templates */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase text-zinc-400 text-center tracking-widest">Templates</p>
            <div className="grid grid-cols-1 gap-2">
              {displayedTemplates.map((t) => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'bg-white border-transparent hover:border-zinc-200'}`}>
                  <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
            <button onClick={() => setShowAllTemplates(!showAllTemplates)} className="w-full py-3 text-[10px] font-black uppercase text-zinc-400 flex items-center justify-center gap-1 hover:text-zinc-600 transition-colors">
              {showAllTemplates ? <><ChevronUp size={14}/> Show Less</> : <><ChevronDown size={14}/> Show All ({templateThemes.length})</>}
            </button>
          </div>

          {/* Section Spacing & Page Break Controls */}
          {(() => {
            const sectionMeta: { id: string; label: string; hasData: boolean }[] = [
              { id: 'professionalQualifications', label: 'Professional Qualifications', hasData: (cvData.professionalQualifications || []).length > 0 },
              { id: 'education', label: 'Education', hasData: (cvData.education?.aLevel?.subjects?.length || 0) > 0 || (cvData.education?.oLevel?.subjects?.length || 0) > 0 },
              { id: 'workExperience', label: 'Work Experience', hasData: (cvData.workExperience || []).length > 0 },
              { id: 'projects', label: 'Projects', hasData: (cvData.projects || []).length > 0 },
              { id: 'achievements', label: 'Achievements', hasData: (cvData.achievements || []).length > 0 },
              { id: 'extracurriculars', label: 'Extracurriculars', hasData: (cvData.extracurriculars || []).length > 0 },
              { id: 'references', label: 'References', hasData: (cvData.references || []).some((r: any) => r.name) },
            ];
            const dims: { key: 'marginTop' | 'marginBottom' | 'paddingTop' | 'paddingBottom'; label: string }[] = [
              { key: 'marginTop', label: 'Margin Top' },
              { key: 'marginBottom', label: 'Margin Bottom' },
              { key: 'paddingTop', label: 'Padding Top' },
              { key: 'paddingBottom', label: 'Padding Bottom' },
            ];
            return (
              <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600"><FileCheck size={18} /></div>
                  <p className="text-[10px] font-black uppercase">Spacing Adjustment</p>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                  {sectionMeta.map((meta) => (
                    <div key={meta.id}>
                      <div
                        onClick={() => meta.hasData && setSelectedSection(selectedSection === meta.id ? null : meta.id)}
                        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && meta.hasData) { e.preventDefault(); setSelectedSection(selectedSection === meta.id ? null : meta.id); } }}
                        tabIndex={meta.hasData ? 0 : -1}
                        role="button"
                        aria-expanded={selectedSection === meta.id}
                        className={`w-full flex items-center justify-between py-1.5 px-2 rounded-xl transition-colors text-left ${meta.hasData ? (selectedSection === meta.id ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-zinc-50 border border-transparent cursor-pointer') : 'opacity-40 cursor-default'}`}
                      >
                        <span className="text-[9px] font-bold uppercase text-zinc-600 truncate flex-1">{meta.label}</span>
                        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                          {meta.hasData && (
                            <button
                              onClick={() => setSectionPageBreak(meta.id, !cvData.sectionPageBreaks?.[meta.id as keyof typeof cvData.sectionPageBreaks])}
                              className={`w-7 h-3.5 rounded-full transition-all flex items-center px-0.5 ${cvData.sectionPageBreaks?.[meta.id as keyof typeof cvData.sectionPageBreaks] ? 'bg-emerald-500 justify-end' : 'bg-zinc-200 justify-start'}`}
                              title="Force page break before this section"
                            >
                              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                            </button>
                          )}
                          <ChevronDown size={12} className={`text-zinc-400 transition-transform ${selectedSection === meta.id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      {selectedSection === meta.id && meta.hasData && (
                        <div className="ml-2 pl-3 border-l-2 border-emerald-200 space-y-1 py-1.5 mb-1">
                          {dims.map((dim) => {
                            const val = cvData.sectionSpacing?.[meta.id]?.[dim.key] || 0;
                            return (
                              <div key={dim.key} className="flex items-center justify-between gap-2">
                                <span className="text-[7px] font-black uppercase text-zinc-400 w-16 shrink-0">{dim.label}</span>
                                <button onClick={() => resetSectionSpacing(meta.id)} className="p-0.5 text-zinc-300 hover:text-zinc-700 transition-colors" title="Reset">
                                  <span className="text-[7px] font-black text-zinc-400 min-w-[16px] text-center block">{val}px</span>
                                </button>
                              </div>
                            );
                          })}

                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Standalone Fine-Tune Seekbar (binds to selected section) */}
          {(() => {
            const sectionMeta: { id: string; label: string; hasData: boolean }[] = [
              { id: 'professionalQualifications', label: 'Professional Qualifications', hasData: (cvData.professionalQualifications || []).length > 0 },
              { id: 'education', label: 'Education', hasData: (cvData.education?.aLevel?.subjects?.length || 0) > 0 || (cvData.education?.oLevel?.subjects?.length || 0) > 0 },
              { id: 'workExperience', label: 'Work Experience', hasData: (cvData.workExperience || []).length > 0 },
              { id: 'projects', label: 'Projects', hasData: (cvData.projects || []).length > 0 },
              { id: 'achievements', label: 'Achievements', hasData: (cvData.achievements || []).length > 0 },
              { id: 'extracurriculars', label: 'Extracurriculars', hasData: (cvData.extracurriculars || []).length > 0 },
              { id: 'references', label: 'References', hasData: (cvData.references || []).some((r: any) => r.name) },
            ];
            const selMeta = sectionMeta.find(m => m.id === selectedSection);
            const currentVal = selectedSection ? (cvData.sectionSpacing?.[selectedSection]?.marginTop || 0) : 0;
            return (
              <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Sliders size={18} /></div>
                    <p className="text-[10px] font-black uppercase">Fine Tune</p>
                  </div>
                  {selMeta ? (
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {currentVal}px
                    </span>
                  ) : (
                    <span className="text-[8px] text-zinc-400 font-bold uppercase">Select a section above</span>
                  )}
                </div>
                {selMeta ? (
                  <>
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      value={currentVal}
                      onChange={(e) => {
                        const newVal = Number(e.target.value);
                        const diff = newVal - currentVal;
                        if (diff !== 0) adjustSectionSpacing(selectedSection!, 'marginTop', diff);
                      }}
                      className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[7px] text-zinc-400 font-bold uppercase">0px</span>
                      <span className="text-[7px] text-zinc-400 font-bold uppercase">500px</span>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center text-[9px] text-zinc-400 font-bold uppercase">Click a section in Spacing Adjustment above</div>
                )}
              </div>
            );
          })()}

          {/* Zoom Controls */}
          <div className="pb-10">
            <p className="text-[10px] font-black uppercase text-zinc-400 text-center mb-2">Zoom</p>
            <div className="flex bg-white border rounded-xl p-1 h-10">
              <button onClick={() => setPreviewScale(p => Math.max(0.1, p - 0.05))} className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-900 border-r text-lg font-bold">-</button>
              <span className="flex-1 flex justify-center items-center text-[10px] font-bold text-zinc-600">{Math.round(previewScale * 100)}%</span>
              <button onClick={() => setPreviewScale(p => Math.min(1, p + 0.05))} className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-900 text-lg font-bold">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 relative flex flex-col h-full bg-zinc-900 overflow-y-auto items-center p-6">
        
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden fixed top-6 left-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white z-50 transition-all border border-white/10">
          <Menu size={24}/>
        </button>

        <div className="w-full flex items-center justify-center my-auto py-8">
          <div className="shadow-2xl origin-top transition-transform duration-300" 
               style={{ transform: `scale(${previewScale})`, flexShrink: 0 }}>
            <CVTemplateBase cvData={finalCVData} />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200 my-auto">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 rounded-full hover:bg-zinc-200"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-6 text-center tracking-tight">Payment Details</h3>
            
            <div className="bg-zinc-950 text-white rounded-[2rem] p-7 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 px-6 py-2 rounded-bl-2xl font-black text-xs tracking-widest">RS. 300</div>
              <div className="space-y-4">
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Bank (BOC)</p><p className="text-2xl text-blue-400 font-black tracking-wider">91691764</p></div>
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Name</p><p className="text-sm font-bold uppercase tracking-wide">PTN Pathiranage</p></div>
              </div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:border-blue-400'}`}>
              {isUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? <CheckCircle2Icon size={32} className="text-green-600" /> : <UploadIcon size={24} className="text-zinc-300" />}
              <span className="text-[10px] font-black uppercase mt-3 text-zinc-400">{slipUrl ? 'Uploaded' : 'Upload Payment Slip'}</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleSlipUpload} />
            </label>

            <button onClick={handleWhatsApp} disabled={!slipUrl || isUploading} className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] mt-6 transition-all active:scale-95 ${slipUrl ? 'bg-blue-600 text-white shadow-lg' : 'bg-zinc-100 text-zinc-400'}`}>Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
}