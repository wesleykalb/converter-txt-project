import { ApiError } from '../../Errors/ApiError';

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/api' 
  : '/api';

export const fileService = {
  convertFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/fileconverter/convert`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(errorData.message);
    }

    return await response.blob();
  }
};