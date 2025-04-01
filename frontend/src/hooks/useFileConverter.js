import { useState, useCallback } from 'react';
import { fileService } from '../api/services/fileService';
import { ApiError } from '../Errors/ApiError';

export const useFileConverter = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
    setError(null);
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setError(null);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError("Por favor, selecione um arquivo!");
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      setError("Arquivo muito grande! Limite: 10MB");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const blob = await fileService.convertFile(file);
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err.message === "Failed to fetch") {
        setError("Erro de conexão com o servidor. Tente novamente mais tarde.");
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  return {
    file,
    fileName,
    downloadLink,
    isLoading,
    error,
    isDragging,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleSubmit
  };
};