import React from "react";

export default function ModalConfirm({
  isOpen,
  title,
  text,
  onClose,
  onConfirm,
  children,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Kiểm tra nếu người dùng click vào vùng nền (backdrop)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">
          {title || "Xác nhận"}
        </h2>
        <p className="mt-4 text-gray-600">{text}</p>
        {children}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="px-4 py-2.5 text-gray-600 cursor-pointer font-bold border border-gray-300 rounded hover:bg-gray-100 border-none"
            onClick={onClose}
          >
            Hủy
          </button>
          {onConfirm && (
            <button
              className="px-4 py-2.5 text-white cursor-pointer font-bold bg-blue-600 rounded hover:bg-blue-700 border-none"
              onClick={onConfirm}
            >
              Xác nhận
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
