import { TypeProduct } from "@/types/common";
import { useState } from "react";

const useProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct | null>(
    null,
  );
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleProductSelect = (data: TypeProduct) => {
    setSelectedProduct(data);
    setShowDetailModal(true);
  };
  const closeModal = () => {
    setShowDetailModal(false);
  };
  return {
    selectedProduct,
    showDetailModal,
    handleProductSelect,
    closeModal,
  };
};

export default useProductModal;
