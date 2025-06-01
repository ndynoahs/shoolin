import React from 'react';
import { TeamMember } from '@/types';

interface Props {
  member: TeamMember;
}

const TeamMemberRow: React.FC<Props> = ({ member }) => {
  return (
    <tr className="border-t border-gray-200">
      <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
        <span className="text-sm font-medium text-gray-900">{member.name}</span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{member.email}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{member.dateAdded}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{member.lastEdited}</td>
      <td className="px-4 py-3 text-right text-sm text-indigo-600 cursor-pointer hover:underline">
        Remove
      </td>
    </tr>
  );
};

export default TeamMemberRow;
