import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

/** Small product tile used on /packages etc. */
const ProductCard: FC<ProductCardProps> = ({ product }) => (
  <Link href={`/products/${product.id}`} className="group block">
    <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-sm">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </div>

    <div className="mt-2">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">
        {product.price.toLocaleString("is-IS")} kr.
      </p>
    </div>
  </Link>
);

export default ProductCard;
