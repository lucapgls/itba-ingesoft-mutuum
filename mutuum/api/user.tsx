import API_BASE_URL from "./api_temp"

const API_SLUG = (slug: string) => {
    return `${API_BASE_URL}/api/v1/users${slug}`
};

export const fetchUser = async (userId: string) => {
    try {
        const response = await fetch(API_SLUG(`/info?userId=${userId}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching user');
        }

        const data = await response.json();
       
        return data.user;
    } catch (error) {
        throw error;
    }
}

export const updatePhoneNumber = async (userId: string, phoneNumber: string) => {
    try {
        const response = await fetch(API_SLUG(`/updateInfo`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                phone_number: phoneNumber,
            }),
        });

        if (!response.ok) {
            throw new Error('Error updating phone number');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateDni = async (userId: string, dni: string) => {
    try {
        const response = await fetch(API_SLUG(`/updateInfo`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                dni: dni,
            }),
        });

        if (!response.ok) {
            throw new Error('Error updating DNI');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateProfilePicture = async (userId: string, profilePicture: string) => {
    try {
        const response = await fetch(API_SLUG(`/updateInfo`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                profile_picture: profilePicture,
            }),
        });

        if (!response.ok) {
            throw new Error('Error updating profile picture');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}