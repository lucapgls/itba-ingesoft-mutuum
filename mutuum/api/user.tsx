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