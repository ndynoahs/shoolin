import React from 'react';

interface InviteFormProps {
  inviteEmail: string;
  setInviteEmail: (email: string) => void;
  onSendInvite: () => void;
}

const InviteForm: React.FC<InviteFormProps> = ({
  inviteEmail,
  setInviteEmail,
  onSendInvite
}) => {
  return (
    <div className="flex space-x-2 mb-6">
      <input
        type="email"
        placeholder="Enter email to invite"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <button
        onClick={onSendInvite}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Send Invite
      </button>
    </div>
  );
};

export default InviteForm;
