import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleButtons = ({ role, page }) => {
    const trimmedPage = page.trim();

    const getButtonsByRole = (role) => {
        switch (role) {
            case "Manager":
            case "Admin":
                return [
                    { label: 'Create', color: '#5AA6FF', textColor: '#FFFFFF', path: `/${trimmedPage}/create` },
                    // { label: 'Edit', color: '#F4F4F4', textColor: '#1E78EC', path: `/${trimmedPage}/edit` },
                    { label: 'Approve', color: '#F43333', textColor: '#FFFFFF', path: `/${trimmedPage}/approve` }
                ];
            case "Employee":
                return [
                    { label: 'Create', color: '#5AA6FF', textColor: '#FFFFFF', path: `/${trimmedPage}/create` },
                    // { label: 'Edit', color: '#F4F4F4', textColor: '#1E78EC', path: `/${trimmedPage}/edit` },
                ];
            default:
                return [];
        }
    };

    const buttons = getButtonsByRole(role);
    const navigate = useNavigate();

    const handleButtonClick = (button) => {
        navigate(button.path);
    };

    return (
        <div className="flex gap-2">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(button)}
                    className="py-2 px-2 border-solid border-0 rounded my-5 text-sm font-bold hover:opacity-90"
                    style={{
                        backgroundColor: button.color,
                        color: button.textColor,
                        width: '145px'
                    }}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default RoleButtons;

