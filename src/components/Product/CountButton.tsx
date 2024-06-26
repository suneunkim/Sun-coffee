import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

interface Props {
  plus: boolean;
  [key: string]: any;
}

const CountButton = ({ plus, ...rest }: Props) => {
  return (
    <button {...rest}>
      {plus ? (
        <CiCircleMinus className="w-6 h-6" />
      ) : (
        <CiCirclePlus className="w-6 h-6" />
      )}
    </button>
  );
};

export default CountButton;
