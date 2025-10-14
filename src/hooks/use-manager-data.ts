
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useUsers } from './use-users';
import { UserData } from './use-auth';

// This hook fetches data relevant to a manager's view
export function useManagerData(manager: UserData | null) {
  const { users, loading: usersLoading } = useUsers();
  const [teamMembers, setTeamMembers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usersLoading || !manager) {
      setLoading(true);
      return;
    }
    // Assuming manager's department is identified by their own 'departmentId'
    // or we filter employees who have a 'managerId' field.
    // For this example, we'll assume a manager manages their own department.
    const managedDepartmentId = manager.departmentId; 
    
    // In a real app, you might have a more complex logic, e.g. a manager can manage multiple departments
    if (managedDepartmentId) {
        const members = users.filter(u => u.departmentId === managedDepartmentId && u.uid !== manager.uid);
        setTeamMembers(members);
    }
    
    setLoading(false);
  }, [users, usersLoading, manager]);


  const teamProductivity = useMemo(() => {
      // This is a mock calculation. In a real app, this would be a complex aggregation.
      if (teamMembers.length === 0) return 88;
      // For demonstration, we'll just average something.
      // Let's pretend each user has a 'productivityScore' field.
      // Since they don't, we'll generate a random-like but stable score.
      const totalScore = teamMembers.reduce((acc, user) => {
          const score = (user.name.length * 10) % 30 + 70; // Stable "score" between 70-100
          return acc + score;
      }, 0);
      return Math.round(totalScore / teamMembers.length);

  }, [teamMembers]);

  return { teamMembers, teamProductivity, loading };
}


// Mock tasks for the team. In a real app, this would come from Firestore.
const allTasks = [
    { id: 1, title: "Q4 Presentation Draft", project: "Marketing", priority: "High" as const, due: "2025-10-28", status: "Submitted" as const, assignee: 'Ankit' },
    { id: 2, title: "Client Contact List Update", project: "Admin", priority: "Medium" as const, due: "2025-10-29", status: "In Progress" as const, assignee: 'Subrat' },
    { id: 3, title: "Login Page Bug Fix", project: "Website Revamp", priority: "High" as const, due: "2025-10-24", status: "Completed" as const, assignee: 'Deepika' },
    { id: 4, title: "New Ad Creatives", project: "Marketing", priority: "Medium" as const, due: "2025-10-22", status: "Completed" as const, assignee: 'Omnshu' },
    { id: 5, title: "Draft Newsletter", project: "Content Creation", priority: "Low" as const, due: "2025-10-15", status: "Overdue" as const, assignee: 'Anjan' },
    { id: 6, title: "Review PR #123", project: "Website Revamp", priority: "High" as const, due: "2025-10-25", status: "Submitted" as const, assignee: 'Deepika' },
    { id: 7, title: "Plan Team Offsite", project: "HR", priority: "Medium" as const, due: "2025-11-05", status: "Pending" as const, assignee: 'Subrat' },
    { id: 8, title: "User Auth Flow", project: "Website Revamp", priority: "High" as const, due: "2025-11-15", status: "Submitted" as const, assignee: 'Ankit' },
    { id: 9, title: "Submit Expense Report", project: "Admin", priority: "Low" as const, due: "2025-10-20", status: "Completed" as const, assignee: 'Omnshu' },
    { id: 10, title: "2025 Budget Proposal", project: "Finance", priority: "High" as const, due: "2025-11-10", status: "Submitted" as const, assignee: 'Ankit' },
    { id: 11, title: "Update Staging Environment", project: "Website Revamp", priority: "Medium" as const, due: "2025-11-01", status: "Submitted" as const, assignee: 'Subrat' },
    { id: 12, title: "Create Social Media Graphics for Launch", project: "Marketing", priority: "Medium" as const, due: "2025-11-04", status: "Submitted" as const, assignee: 'Anjan' },
];

// This hook simulates fetching tasks for the manager's team
export function useTeamTasks(teamMembers: UserData[]) {
    const [tasks, setTasks] = useState<typeof allTasks>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (teamMembers.length > 0) {
            const teamMemberNames = teamMembers.map(m => m.name);
            const teamTasks = allTasks.filter(t => t.assignee && teamMemberNames.includes(t.assignee));
            setTasks(teamTasks);
        } else {
            setTasks([]);
        }
        // Simulate network delay
        setTimeout(() => setLoading(false), 500);
    }, [teamMembers]);

    return { tasks, loading };
}
