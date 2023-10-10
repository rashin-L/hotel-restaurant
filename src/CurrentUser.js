
import React, { useEffect, useState } from 'react';

const CurrentUser = (WrappedComponent) => {
    const EnhancedComponent = (props) => {
        const [user, setUser] = useState(null);
        useEffect(() => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }, []);
        return <WrappedComponent user={user} {...props} />;
    };
    return EnhancedComponent;
};

export default CurrentUser;