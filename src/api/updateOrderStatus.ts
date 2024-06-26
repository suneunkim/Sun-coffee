import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { TypeOrderStatus } from "@/types/common";

const useOrderStatus = () => {
  const QueryClient = useQueryClient();

  const updateOrderStatus = async (
    orderId: string,
    newStatus: TypeOrderStatus,
  ) => {
    const orderRef = doc(db, "orders", orderId);
    try {
      await updateDoc(orderRef, {
        order_status: newStatus,
      });
      QueryClient.invalidateQueries(["orders"]);
    } catch (error) {
      console.log("상태 업데이트가 실패했습니다.", error);
    }
  };

  return { updateOrderStatus };
};

export default useOrderStatus;
