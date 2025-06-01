import React from 'react';
import { TeamMember } from '@/types';
import TeamMemberRow from './TeamMemberRow';

interface Props {
  members: TeamMember[];
}

const TeamMembersTable: React.FC<Props> = ({ members }) => {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Edited</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <TeamMemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembersTable;
