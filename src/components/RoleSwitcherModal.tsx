import React, { useState } from 'react';
import { OfficerProfile, GradeLevel, UserRole, SecurityClearance } from '../types/psr';
import { DEMO_OFFICER_PROFILES } from '../data/psrCorpus';
import { 
  X, 
  Shield, 
  UserCheck, 
  Lock, 
  CheckCircle2, 
  Building2, 
  BadgeAlert,
  Save,
  KeyRound
} from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: OfficerProfile;
  onSelectProfile: (profile: OfficerProfile) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectProfile,
}) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [formData, setFormData] = useState<OfficerProfile>(currentProfile);

  if (!isOpen) return null;

  const handleSelectPrebuilt = (profile: OfficerProfile) => {
    onSelectProfile(profile);
    onClose();
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectProfile(formData);
    setIsCustomizing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Officer Access Control & Cadre Verification
              </h2>
              <p className="text-xs text-slate-300">
                Switch between Civil Service Grade Levels & Cadres to test Role-Based Access Controls
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {!isCustomizing ? (
            <>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Pre-Configured Public Service Officer Cadres
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DEMO_OFFICER_PROFILES.map((profile) => {
                    const isSelected = profile.id === currentProfile.id;
                    return (
                      <div
                        key={profile.id}
                        onClick={() => handleSelectPrebuilt(profile)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition relative ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                            : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50/80'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 text-emerald-700">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-800 text-white rounded">
                            {profile.gradeLevel}
                          </span>
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            {profile.role.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {profile.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{profile.cadre}</p>
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
                          <span className="truncate max-w-[160px] font-medium">{profile.mda.split(',')[0]}</span>
                          <span className="font-semibold text-emerald-800">{profile.securityClearance}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Access Control Privilege Matrix Summary */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                  <KeyRound className="w-4 h-4 text-emerald-700" />
                  <span>Access Control Permissions for Currently Selected Cadre:</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Query Defense</span>
                    <span className="font-bold text-emerald-700">Enabled (All GL)</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Issue Formal Query</span>
                    <span className={`font-bold ${
                      ['directorate', 'fcsc_admin'].includes(currentProfile.role) || ['GL 15', 'GL 16', 'GL 17'].includes(currentProfile.gradeLevel)
                        ? 'text-emerald-700'
                        : 'text-rose-600'
                    }`}>
                      {['directorate', 'fcsc_admin'].includes(currentProfile.role) || ['GL 15', 'GL 16', 'GL 17'].includes(currentProfile.gradeLevel)
                        ? 'Authorized'
                        : 'Restricted (GL 15+)'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Tenure & SSC Oversight</span>
                    <span className={`font-bold ${
                      ['directorate', 'fcsc_admin'].includes(currentProfile.role)
                        ? 'text-emerald-700'
                        : 'text-amber-600'
                    }`}>
                      {['directorate', 'fcsc_admin'].includes(currentProfile.role) ? 'Full Access' : 'Read Only'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">System Audit Trail</span>
                    <span className={`font-bold ${
                      currentProfile.role === 'fcsc_admin' ? 'text-purple-700' : 'text-slate-500'
                    }`}>
                      {currentProfile.role === 'fcsc_admin' ? 'Super Admin' : 'Officer Log'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(currentProfile);
                    setIsCustomizing(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition"
                >
                  Edit / Enter Custom Officer Profile
                </button>
              </div>
            </>
          ) : (
            /* Custom Profile Form */
            <form onSubmit={handleSaveCustom} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Officer Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Staff / IPPIS Number</label>
                  <input
                    type="text"
                    required
                    value={formData.staffNumber}
                    onChange={(e) => setFormData({ ...formData, staffNumber: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade Level</label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => {
                      const gl = e.target.value as GradeLevel;
                      let role: UserRole = 'senior_officer';
                      if (['GL 01', 'GL 02', 'GL 03', 'GL 04', 'GL 05', 'GL 06'].includes(gl)) role = 'junior_officer';
                      else if (['GL 15', 'GL 16', 'GL 17', 'Perm Sec'].includes(gl)) role = 'directorate';
                      else if (gl === 'FCSC Admin') role = 'fcsc_admin';
                      setFormData({ ...formData, gradeLevel: gl, role });
                    }}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="GL 03">GL 03 (Junior Staff)</option>
                    <option value="GL 06">GL 06 (Executive Officer / Senior Clerical)</option>
                    <option value="GL 08">GL 08 (Entry Officer / Graduate Cadre)</option>
                    <option value="GL 10">GL 10 (Senior Administrative Officer)</option>
                    <option value="GL 12">GL 12 (Principal Officer)</option>
                    <option value="GL 14">GL 14 (Assistant Director)</option>
                    <option value="GL 15">GL 15 (Deputy Director)</option>
                    <option value="GL 17">GL 17 (Director of Department)</option>
                    <option value="Perm Sec">Permanent Secretary</option>
                    <option value="FCSC Admin">FCSC Administrator / Auditor</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cadre / Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.cadre}
                    onChange={(e) => setFormData({ ...formData, cadre: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Ministry, Department or Agency (MDA)</label>
                  <input
                    type="text"
                    required
                    value={formData.mda}
                    onChange={(e) => setFormData({ ...formData, mda: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Security Clearance</label>
                  <select
                    value={formData.securityClearance}
                    onChange={(e) => setFormData({ ...formData, securityClearance: e.target.value as SecurityClearance })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Restricted">Restricted</option>
                    <option value="Confidential">Confidential</option>
                    <option value="Secret">Secret</option>
                    <option value="Top Secret">Top Secret</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duty Station</label>
                  <input
                    type="text"
                    value={formData.station}
                    onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCustomizing(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Profile & Access</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
