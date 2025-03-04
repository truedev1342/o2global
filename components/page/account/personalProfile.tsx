import React from 'react';

const PersonalProfileView: React.FC = () => {
    return (
        <div>
            <h2>Personal Profile</h2>
            <form>
                <label>
                    Full Name: <input type="text" placeholder="Enter full name" />
                </label>
                <label>
                    Email: <input type="email" placeholder="Enter email" />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default PersonalProfileView;
