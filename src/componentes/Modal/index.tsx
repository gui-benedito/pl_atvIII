import React, { ReactNode } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import './style.css';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  label: string;
  buttons?: ReactNode; 
  id?: number | null;
  className?: string;
}

export default function Modal({ isOpen, label, children, buttons, id, className }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='backgroundStyle'>
      <div className={`modalStyle ${className}`}>
        <h1 className='title'>
          {label}<span className='title-id'>{id}</span>
        </h1>
        <div className='content'>{children}</div>
        <div className='buttonContainer'>
          {buttons} 
        </div>
      </div>
    </div>
  );
}
