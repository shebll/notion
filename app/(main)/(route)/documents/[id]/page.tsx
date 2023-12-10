import React from "react";
type props = {
  param: {
    id: string;
  };
};
function page({ param }: props) {
  return <div>{param.id}</div>;
}

export default page;
