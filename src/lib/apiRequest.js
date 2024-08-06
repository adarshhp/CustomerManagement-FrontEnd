const baseURL = 'http://192.168.2.83:5003/api';

const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseURL}${endpoint}`, options);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export default apiRequest;