import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wrench, 
  History, 
  GraduationCap, 
  MessageCircle, 
  ClipboardList,
  HelpCircle,
  Settings,
  Mail,
  Trash2,
  Edit3
} from 'lucide-react';
import ContentHeader from '../layout/ContentHeader';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateAdded: string;
  lastEdited: string;
}

const TeamSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Teams');
  const [inviteEmail, setInviteEmail] = useState('');
  
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Jimoh Rasheed',
      email: 'johndoe@gmail.com',
      avatar: '/api/placeholder/40/40',
      dateAdded: 'Feb 22, 2022',
      lastEdited: 'Feb 22, 2022'
    }
  ]);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Wrench, label: 'AI Tools', active: false },
    { icon: History, label: 'Work History', active: false },
    { icon: GraduationCap, label: 'Launch a Class', active: false },
    { icon: MessageCircle, label: 'AI Chat', active: false },
    { icon: ClipboardList, label: 'Assignment', active: false },
  ];

  const handleSendInvite = () => {
    if (inviteEmail.trim()) {
      console.log('Sending invite to:', inviteEmail);
      setInviteEmail('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
   

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}

        <ContentHeader title="Settings" />


        {/* Content */}
        <div className="p-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {['Profile', 'Teams', 'Billings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Team Members Section */}
          <div className="max-w-4xl">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Team Members</h2>
              <p className="text-gray-600">Manage your team members and their account permissions here.</p>
            </div>

            {/* Invite Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Invite people to your team</h3>
              <p className="text-gray-600 mb-4">We'll email them instructions and a link to create an account</p>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invite email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSendInvite}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Send Invite
                  </button>
                </div>
              </div>
            </div>

            {/* Team Members Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium text-gray-900">Name</div>
                  <div className="font-medium text-gray-900">Date added</div>
                  <div className="font-medium text-gray-900">Last Edited</div>
                  <div></div>
                </div>
              </div>
              
              {teamMembers.map((member) => (
                <div key={member.id} className="px-6 py-4 border-b border-gray-100 last:border-b-0">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                    <div className="text-gray-600">{member.dateAdded}</div>
                    <div className="text-gray-600">{member.lastEdited}</div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSettingsPage;