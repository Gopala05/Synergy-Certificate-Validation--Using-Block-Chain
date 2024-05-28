import React, { useEffect, useState } from "react";
import Image from "next/image";

import images from "../Image/index";
import style from "./Filter.module.css";

const Filter = ({
  activeSelect,
  setActiveSelect,
  setImageCopy,
  imagesCopy,
  setAllImages,
  allImages,
  oldImages,
}) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const handleSearch = (value) => {
    const filteredImages = allImages.filter(({ owner }) =>
      owner.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredImages.length === 0) {
      setAllImages(imagesCopy);
    } else {
      setAllImages(filteredImages);
    }
  };

  const onClearSearch = () => {
    if (allImages.length && imagesCopy.length) {
      setAllImages(imagesCopy);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

  //   return () => clearTimeout(timer);
  // }, [debouncedSearch]);

  // useEffect(() => {
  //   setAllImages(oldImages);
  //   setImageCopy(oldImages);

  //   if (search) {
  //     handleSearch(search);
  //   } else {
  //     onClearSearch();
  //   }
  // }, [search]);

  const filter = [
    {
      name: "Old Images",
    },
    {
      name: "Recent Images",
    },
  ];

  // useEffect(() => {
  //   if (activeSelect == "Old Images") {
  //     setAllImages(oldImages);
  //   } else {
  //     setAllImages(oldImages.reverse());
  //   }
  // }, [activeSelect]);

  return (
    <div className={style.Filter}>
      <div className={style.Filter_box}>
        <Image src={images.search} width={20} height={20} />
        <input
          type="text"
          placeholder="Search Address"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        className={style.filter}
        onClick={() => (toggle ? setToggle(false) : setToggle(true))}
      >
        <div className={style.filter_title}>
          <h4>{activeSelect}</h4>
          <Image src={images.arrow} width={10} height={10} />
        </div>

        {toggle && (
          <div className={style.filter_box}>
            {filter.map((element, index) => (
              <p key={index} onClick={() => setActiveSelect(element.name)}>
                {element.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
