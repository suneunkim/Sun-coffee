import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
// 토스트를 추가할 곳이 생길 수 있으니 기본 형태로 저장한 상태

const ToastWithTitle = () => {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }}
    >
      Show Toast
    </Button>
  );
};

export default ToastWithTitle;
