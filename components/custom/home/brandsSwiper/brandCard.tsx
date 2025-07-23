import Image from "next/image";
import Link from "next/link";

const BrandCard = () => {
  return (
    <Link href={"/products?brand=nivia"} className="flex-center w-full">
      <div className="rounded-md w-full flex flex-col gap-3 justify-center">
        <div className="w-full aspect-square relative mx-auto">
          <Image
            src="/images/uploads/category.jpg"
            fill
            alt=""
            className="aspect-square rounded-full border border-teal-700 object-cover"
          />
        </div>

        <div className="text-center">نيفيا</div>
      </div>
    </Link>
  );
};

export default BrandCard;
