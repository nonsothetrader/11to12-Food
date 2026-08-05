
import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<SVGSVGElement>) {
  // The className is passed to the Image component to control sizing.
  // The original SVG props are spread to maintain compatibility.
  return (
    <Image
      src="https://i.ibb.co/9m4qVJcL/logo-11-to-12.png"
      alt="11 to 12 Logo"
      width={100} // Intrinsic width of the logo image
      height={100} // Intrinsic height of the logo image
      {...props}
    />
  );
}
