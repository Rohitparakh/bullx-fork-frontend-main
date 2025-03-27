import { useFetchTokenDetails } from "@/hooks/useFetchTokenDetails";
import { useFetchTokenImage } from "@/hooks/useFetchTokenImage";
import Image from "next/image";

export default function CellImage({ address }: { address: string }) {
  const { tokenImage, isLoading }: any = useFetchTokenImage(address);
  const image = isLoading
    ? "/image.png"
    : typeof tokenImage == undefined || tokenImage?.length == 0
    ? "/image.png"
    : tokenImage;

  return (
    <Image
      src={image || "/image.png"}
      alt=""
      height={100}
      width={100}
      className="h-12 w-12 rounded-full"
    />
  );
}
