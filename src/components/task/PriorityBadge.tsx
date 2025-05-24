import React from 'react';
import '../../styles/common/PriorityBadge.css';

interface PriorityBadgeProps {
    priority: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
    const priorityClass = `priority-badge priority-${priority.toLowerCase()}`;

    let label = '';
    switch (priority) {
        case 'LOW':
            label = 'Thấp';
            break;
        case 'MEDIUM':
            label = 'Trung bình';
            break;
        case 'HIGH':
            label = 'Cao';
            break;
        default:
            label = priority;
    }

    return <span className={priorityClass}>{label}</span>;
};

export default PriorityBadge;