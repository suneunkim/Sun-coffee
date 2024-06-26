import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  productsPerRow: number;
}

const ProductCardSkelton = ({ productsPerRow }: Props) => {
  return (
    <>
      {Array.from({ length: productsPerRow }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 mb-4">
          <Skeleton className="h-[230px] w-[400px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardSkelton;
