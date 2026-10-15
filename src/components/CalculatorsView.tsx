import React, { useState } from 'react';
import { OfficerProfile, GradeLevel } from '../types/psr';
import { 
  Calculator, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Briefcase, 
  Award, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface CalculatorsViewProps {
  currentProfile: OfficerProfile;
  onLogAudit: (action: string, details: string) => void;
}

export const CalculatorsView: React.FC<CalculatorsViewProps> = ({
  currentProfile,
  onLogAudit,
}) => {
  const [activeTab, setActiveTab] = useState<'retirement' | 'promotion' | 'dta_leave'>('retirement');

  // Retirement Calculator State
  const [birthDate, setBirthDate] = useState('1976-08-15');
  const [entryDate, setEntryDate] = useState('2001-03-01');
  const [retirementResult, setRetirementResult] = useState<any>(null);

  // Promotion Calculator State
  const [selectedGL, setSelectedGL] = useState<GradeLevel>(currentProfile.gradeLevel);
  const [yearsOnCurrentGrade, setYearsOnCurrentGrade] = useState(currentProfile.yearsOnGrade || 3);
  const [hasPassedCCE, setHasPassedCCE] = useState(true);
  const [pmsScore, setPmsScore] = useState(72);

  // DTA & Leave Calculator State
  const [dtaGL, setDtaGL] = useState<GradeLevel>(currentProfile.gradeLevel);
  const [travelDays, setTravelDays] = useState(5);
  const [isMaleForPaternity, setIsMaleForPaternity] = useState(true);

  // Calculate Retirement (Rule 080201)
  const calculateRetirement = () => {
    if (!birthDate || !entryDate) return;

    const b = new Date(birthDate);
    const e = new Date(entryDate);

    const sixty = new Date(b.getFullYear() + 60, b.getMonth(), b.getDate());
    const thirtyFive = new Date(e.getFullYear() + 35, e.getMonth(), e.getDate());

    const isAgeEarlier = sixty <= thirtyFive;
    const finalDate = isAgeEarlier ? sixty : thirtyFive;

    const preRetirementDate = new Date(finalDate);
    preRetirementDate.setMonth(preRetirementDate.getMonth() - 3);

    const now = new Date();
    const diffTime = finalDate.getTime() - now.getTime();
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setRetirementResult({
      sixtyDate: sixty.toLocaleDateString('en-GB'),
      thirtyFiveDate: thirtyFive.toLocaleDateString('en-GB'),
      finalRetirementDate: finalDate.toLocaleDateString('en-GB'),
      bindingCriteria: isAgeEarlier 
        ? 'Attainment of Sixty (60) Years of Age' 
        : 'Completion of Thirty-Five (35) Years of Pensionable Service',
      preRetirementDate: preRetirementDate.toLocaleDateString('en-GB'),
      remainingDays,
      isPendingSoon: remainingDays <= 365,
    });

    onLogAudit('Retirement Calculated', `DOB: ${birthDate}, Entry: ${entryDate} -> Retirement: ${finalDate.toLocaleDateString('en-GB')}`);
  };

  React.useEffect(() => {
    calculateRetirement();
  }, []);

  // Calculate Promotion Eligibility (Rule 020701)
  const getPromotionMaturity = (gl: GradeLevel) => {
    if (['GL 01', 'GL 02', 'GL 03', 'GL 04', 'GL 05', 'GL 06'].includes(gl)) {
      return { yearsRequired: 2, cadreGroup: 'Junior Staff' };
    }
    if (['GL 07', 'GL 08', 'GL 09', 'GL 10', 'GL 12', 'GL 13', 'GL 14'].includes(gl)) {
      return { yearsRequired: 3, cadreGroup: 'Senior Staff / Professional Officers' };
    }
    return { yearsRequired: 4, cadreGroup: 'Directorate Staff (GL 15 - 17)' };
  };

  const maturity = getPromotionMaturity(selectedGL);
  const isMatured = yearsOnCurrentGrade >= maturity.yearsRequired;
  const isPmsEligible = pmsScore >= 60;
  const isFullyEligible = isMatured && isPmsEligible && hasPassedCCE;

  // DTA Calculations (Rule 040201)
  const getDTARate = (gl: GradeLevel): number => {
    if (['GL 01', 'GL 02', 'GL 03', 'GL 04'].includes(gl)) return 10000;
    if (['GL 05', 'GL 06'].includes(gl)) return 15000;
    if (['GL 07', 'GL 08', 'GL 09', 'GL 10'].includes(gl)) return 17500;
    if (['GL 12', 'GL 13', 'GL 14'].includes(gl)) return 20000;
    if (['GL 15', 'GL 16', 'GL 17'].includes(gl)) return 25000;
    return 35000; // Perm Sec / FCSC Admin / CEOs
  };

  const dtaRate = getDTARate(dtaGL);
  const totalDTA = dtaRate * travelDays;
  const annualLeaveDays = ['GL 01', 'GL 02', 'GL 03', 'GL 04', 'GL 05', 'GL 06'].includes(dtaGL) ? 14 : 30;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                Statutory Calculators
              </span>
              <span className="text-xs font-semibold text-slate-500">Chapters 2, 4, 6 & 8</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Civil Service Benefits & Statutory Entitlement Engines
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accurate statutory computations according to the Revised PSR 2021 and Federal circulars.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('retirement')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'retirement' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Retirement 60/35 Clock
            </button>
            <button
              onClick={() => setActiveTab('promotion')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'promotion' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Promotion Maturity
            </button>
            <button
              onClick={() => setActiveTab('dta_leave')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'dta_leave' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              DTA & Leave Rates
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: RETIREMENT 60/35 CLOCK */}
      {activeTab === 'retirement' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Statutory 60/35 Retirement Age Engine</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rule 080201: An officer must retire at 60 years of age or 35 years of pensionable service, whichever is earlier.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Official Date of Birth (As Declared on Entry)
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Date of First Pensionable Appointment
                </label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                <strong>Rule 030402 Warning:</strong> Any subsequent alteration of date of birth or date of entry without authenticated primary school records constitutes serious misconduct and attracts dismissal.
              </div>

              <button
                type="button"
                onClick={calculateRetirement}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Compute Statutory Retirement</span>
              </button>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
            {retirementResult ? (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Statutory Determination (Rule 080201)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-emerald-900 mt-1">
                    {retirementResult.finalRetirementDate}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Binding Trigger: {retirementResult.bindingCriteria}</span>
                  </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                      60 Years of Age
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                      {retirementResult.sixtyDate}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                      35 Years Service
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                      {retirementResult.thirtyFiveDate}
                    </span>
                  </div>
                </div>

                {/* Pre-Retirement Leave (Rule 060301) */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5 text-xs text-emerald-950">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Mandatory 3-Month Pre-Retirement Leave (Rule 060301)</span>
                  </div>
                  <p className="leading-relaxed">
                    Officer must proceed on pre-retirement leave on or before: <strong>{retirementResult.preRetirementDate}</strong> to process retirement savings accounts (RSA) with PENCOM and prepare handing-over notes.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Days remaining to retirement:</span>
                  <span className="font-bold text-slate-900">{retirementResult.remainingDays} Days</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* TAB 2: PROMOTION MATURITY & PMS MATRIX */}
      {activeTab === 'promotion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>Promotion Eligibility Assessment</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rule 020701: Minimum maturity period on grade + PMS Appraisal score requirements.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Grade Level</label>
                <select
                  value={selectedGL}
                  onChange={(e) => setSelectedGL(e.target.value as GradeLevel)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="GL 03">GL 03 (Junior Staff)</option>
                  <option value="GL 06">GL 06 (Executive Officer)</option>
                  <option value="GL 08">GL 08 (Entry Officer / Graduate)</option>
                  <option value="GL 10">GL 10 (Senior Administrative Officer)</option>
                  <option value="GL 12">GL 12 (Principal Officer)</option>
                  <option value="GL 14">GL 14 (Assistant Director)</option>
                  <option value="GL 15">GL 15 (Deputy Director)</option>
                  <option value="GL 16">GL 16 (Director / Special Cadre)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Years Spent on Current Grade Level: {yearsOnCurrentGrade} Years
                </label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={yearsOnCurrentGrade}
                  onChange={(e) => setYearsOnCurrentGrade(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Latest PMS / APER Score: {pmsScore}% (Min required: 60%)
                </label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="1"
                  value={pmsScore}
                  onChange={(e) => setPmsScore(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="cce"
                  checked={hasPassedCCE}
                  onChange={(e) => setHasPassedCCE(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded"
                />
                <label htmlFor="cce" className="font-semibold text-slate-700">
                  Passed Compulsory Confirmation Examination (CCE) (Rule 020206)
                </label>
              </div>
            </div>
          </div>

          {/* Promotion Eligibility Status Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Maturity Group: {maturity.cadreGroup}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isFullyEligible ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {isFullyEligible ? 'PROMOTION ELIGIBLE' : 'NOT YET ELIGIBLE'}
                </span>
                <span className="text-xs text-slate-600 font-semibold">
                  Required on Grade: {maturity.yearsRequired} Years
                </span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 text-xs">
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isMatured ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <span>Statutory Maturity Period ({yearsOnCurrentGrade} of {maturity.yearsRequired} Years)</span>
                <span className="font-bold">{isMatured ? 'SATISFIED' : 'PENDING'}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isPmsEligible ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <span>PMS / APER Score ({pmsScore}% vs 60% Benchmark)</span>
                <span className="font-bold">{isPmsEligible ? 'PASSED' : 'BELOW 60%'}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                hasPassedCCE ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <span>Confirmation Exam (CCE / ASCON) Status</span>
                <span className="font-bold">{hasPassedCCE ? 'CONFIRMED' : 'UNCONFIRMED'}</span>
              </div>
            </div>

            {/* Director 8-Year Cap Notice (Rule 020908) */}
            {['GL 17', 'Perm Sec'].includes(selectedGL) && (
              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs">
                <span className="font-bold block mb-0.5">PSR 2021 Tenure Policy Alert (Rule 020908):</span>
                <span>Directors on GL 17 are subject to a maximum cumulative tenure of eight (8) years, after which compulsory retirement applies regardless of biological age.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DTA & LEAVE CALCULATOR */}
      {activeTab === 'dta_leave' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                <span>Duty Tour Allowance (DTA) & Leave Entitlement</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rule 040201 (Approved Federal Government Circular Rates) & Chapter 6 Leave.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cadre Grade Level</label>
                <select
                  value={dtaGL}
                  onChange={(e) => setDtaGL(e.target.value as GradeLevel)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="GL 04">GL 01 - 04 (₦10,000 / Night)</option>
                  <option value="GL 06">GL 05 - 06 (₦15,000 / Night)</option>
                  <option value="GL 10">GL 07 - 10 (₦17,500 / Night)</option>
                  <option value="GL 13">GL 12 - 14 (₦20,000 / Night)</option>
                  <option value="GL 17">GL 15 - 17 (₦25,000 / Night)</option>
                  <option value="Perm Sec">Permanent Secretary / CEO (₦35,000 / Night)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Number of Official Duty Nights: {travelDays} Nights
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={travelDays}
                  onChange={(e) => setTravelDays(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">
                  Computed Total DTA Claim (Rule 040201)
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-900">
                  ₦{totalDTA.toLocaleString('en-NG')}
                </div>
                <p className="text-[11px] text-emerald-700">
                  (₦{dtaRate.toLocaleString('en-NG')} × {travelDays} Nights). Requires travel clearance & report.
                </p>
              </div>
            </div>
          </div>

          {/* Statutory Leave Summary for this Grade Level */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Statutory Leave Entitlements (Chapter 6)
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                Leave Entitlement Matrix for {dtaGL}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Annual Leave (Rule 060201)
                </span>
                <span className="text-base font-black text-slate-900 mt-1 block">
                  {annualLeaveDays} Calendar Days
                </span>
                <span className="text-[10px] text-slate-500">Cannot accumulate across years</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Casual Leave (Rule 060204)
                </span>
                <span className="text-base font-black text-slate-900 mt-1 block">
                  7 Working Days
                </span>
                <span className="text-[10px] text-slate-500">Deductible from annual leave</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Paternity Leave (Rule 060207)
                </span>
                <span className="text-base font-black text-emerald-800 mt-1 block">
                  14 Working Days
                </span>
                <span className="text-[10px] text-slate-500">PSR 2021 addition (Within 6 weeks)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Maternity Leave (Rule 060206)
                </span>
                <span className="text-base font-black text-purple-800 mt-1 block">
                  16 Weeks (Full Pay)
                </span>
                <span className="text-[10px] text-slate-500">+ 2 hrs daily nursing break (6 mos)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
