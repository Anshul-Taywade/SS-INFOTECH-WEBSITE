import { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Users, Plus, Mail, Shield, Award, Edit, Trash2, Sparkles } from 'lucide-react';

const initialStaff = [
  {
    id: 'team-1',
    name: 'Executive Director & Tech Leader',
    role: 'Executive Management',
    email: 'executive@ssinfotech.org',
    photo: '/images/gallery/ss-infotech-executive-leader.jpg',
    specialty: 'Enterprise Software Architecture & Strategy'
  },
  {
    id: 'team-2',
    name: 'Senior Software Specialist & Tech Lead',
    role: 'Engineering Lead',
    email: 'lead@ssinfotech.org',
    photo: '/images/gallery/ss-infotech-team-lead-1.jpg',
    specialty: 'Cloud Platforms & Full-Stack Development'
  }
];

export default function TeamManagerPage() {
  const [team, setTeam] = useState(initialStaff);

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Team &amp; Corporate Staff" />

      <main className="p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <span>Executive Team &amp; Specialists</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-400 border border-purple-800 uppercase font-mono">
                {team.length} Key Profiles
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Manage corporate team profiles, roles, and real media portraits.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member) => (
            <div key={member.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex gap-5 items-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black shrink-0 border border-slate-700">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1 font-outfit">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800 font-jakarta uppercase">
                  {member.role}
                </span>
                <h3 className="text-base font-black text-white">{member.name}</h3>
                <p className="text-xs text-purple-400 font-medium font-jakarta">{member.specialty}</p>
                <p className="text-xs text-slate-400 font-mono pt-1">{member.email}</p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
