import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-sm">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
