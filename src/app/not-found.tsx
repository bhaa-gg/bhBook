import React from "react";
import notFoundImage from "../assets/rb_7899.png";
import Image from "next/image";

const notFound = () => {
  return (
    <div className="w-full mt-10 text-center ">
      <Image
        className="mx-auto "
        src={notFoundImage}
        alt="notFoundImage"
        width={750}
        height={300}
      ></Image>
    </div>
  );
};

export default notFound;
