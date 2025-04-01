import React from 'react';
import { FaSpinner, FaUpload, FaDownload, FaFileAlt, FaCloudUploadAlt } from 'react-icons/fa';
import { useFileConverter } from '../../../../hooks/useFileConverter';
import './FileConverter.css';
import './FileConverter.styles.css';

export const FileConverter = () => {
  const {
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
  } = useFileConverter();

  return (
    <div className="file-converter-container">
      <header className="converter-header">
        <title>Conversor TXT</title>
        <h1 className="converter-title">Conversor de Arquivos TXT</h1>
        <p className="converter-subtitle">Transforme seus arquivos .txt para letra maiúscula com segurança</p>
      </header>
      
      <form onSubmit={handleSubmit} className="converter-form">
        <div 
          className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="file-upload" className="upload-label">
            <div className="upload-icon">
              <FaCloudUploadAlt size={48} />
              <p>Arraste e solte ou clique para enviar</p>
              <span className="file-types">Formatos suportados: .txt</span>
            </div>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              disabled={isLoading}
              className="file-input"
              accept=".txt"
            />
          </label>
          
          {fileName && (
            <div className="file-selected">
              <FaFileAlt className="file-icon" />
              <span className="file-name">{fileName}</span>
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="convert-button"
          disabled={!file || isLoading}
        >
          {isLoading ? (
            <span className="button-content">
              <FaSpinner className="spinner" /> Processando...
            </span>
          ) : (
            <span className="button-content">
              <FaUpload /> Converter Arquivo
            </span>
          )}
        </button>
      </form>

      {downloadLink && (
        <div className="download-container">
          <a 
            href={downloadLink} 
            download={`${fileName.replace(/\.txt$/, '')}_convertido.txt`}
            className="download-button"
          >
            <FaDownload /> Baixar Arquivo Convertido
          </a>
        </div>
      )}
    </div>
  );
};