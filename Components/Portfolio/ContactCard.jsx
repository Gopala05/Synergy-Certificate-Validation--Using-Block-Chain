import React from "react";
import { cn } from "../../utils/utils";
import { Col, Row } from "antd";

const ContactCard = ({ image, width, bgColor, year, title, subtitle }) => {
  return (
    <div
      className={cn(
        "shadow-xl shadow-black/20 hover:scale-110 transition-all w-full rounded-2xl px-5 py-6 items-start flex flex-col gap-y-2 text-sm font-bold",
        bgColor
      )}
    >
      <Row className="flex w-full gap-x-5">
        <Col lg={3} className="flex w-full justify-end h-fit pt-1">
          <img src={image} alt="Call Icon" className={cn("w-6", width)} />
        </Col>
        <Col lg={19} className="flex flex-col flex-wrap w-full">
          <div className="flex text-lg justify-start w-full items-center text-gray-500">
            <div>{year}</div>
          </div>
          <div className="text-xl normal-case text-start font-bold">
            {title}
          </div>
          <div className="text-lg font-semibold normal-case text-start">
            {subtitle}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactCard;
