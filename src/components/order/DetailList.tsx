import { AccordionUI } from "../elements/Accordion";

interface Props {
  products: {
    name: string;
    quantity: number;
    subtotal: number;
    imageURL: string;
  }[];
  id: string;
}

const DetailList = ({ products, id }: Props) => {
  return (
    <AccordionUI>
      {products.map((product, i) => (
        <div key={id + i}>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-orange-100 rounded-lg my-2 mr-2">
              {product.imageURL ? (
                <img src={product.imageURL} alt={product.name} className="" />
              ) : (
                <div />
              )}
            </div>
            <div className="flex flex-col my-2">
              <h4>{product.name}</h4>
              <div className="space-x-5">
                <span>{product.subtotal.toLocaleString("ko-kr")}원</span>
                <span className="text-gray-600">{`x ${product.quantity}`}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </AccordionUI>
  );
};

export default DetailList;
