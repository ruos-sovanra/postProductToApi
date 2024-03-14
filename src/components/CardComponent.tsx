import { Card } from "flowbite-react";
type CardComponentProps = {
  title: string;
  image: string;
  price: number;
};
const CardComponent = (props: CardComponentProps) => {
  return (
    <>
      <Card
        className="max-w-sm"
        renderImage={() => (
          <img
            src={props?.image || "defaul Image"}
            alt={props.title}
            className=" h-[300px] overflow-hidden object-cover"
          />
        )}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props?.title || "Title"}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props?.price || 0}
        </p>
      </Card>
    </>
  );
};

export default CardComponent;
