import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";

//components
import MapSlideItems from "./MapSlideItem";
import SearchBar from "./common/SearchBar";

const SlideBox = styled.div`
  width: 30rem;
  height: 100%;
  background-color: #fff;
  position: fixed;

  top: 59px;
  z-index: 9;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
`;
const Handler = styled.div`
  width: 80px;
  height: 140px;
  position: absolute;
  background-color: #f0892f;
  color: white;
  z-index: 8;
  left: -80px;
  top: 50%;
  border-radius: 30px 0 0 30px;
  transform: translateY(-50%);
  padding: 30px 10px;
  box-sizing: border-box;
  text-align: center;
  svg {
    width: 40px;
    height: 40px;
  }
  h3 {
    font-size: 14px;
  }
`;

const SlideContainer = styled.div`
  overflow: auto;
  height: calc(100% - 59px);
  padding: 20px 25px;
  box-sizing: border-box;
`;

const MapFilterSlider = () => {
  const [filterActive, setFilterActive] = useState(false);
  const [searchItems, setSearchItems] = useState<any>([]);

  const handleSlide = () => {
    filterActive === false ? setFilterActive(true) : setFilterActive(false);
  };

  useEffect(() => {
    let mapData = [
      {
        text: "병원",
        value: 0,
        mapDetailList: [
          {
            addrName: "청담",
            phoneNum: "010-3333-4444",
          },
          {
            addrName: "서초",
            phoneNum: "010-3333-4444",
          },
        ],
      },
      {
        text: "병원2",
        value: 1,
        mapDetailList: [
          {
            addrName: "강남",
            phoneNum: "010-3333-4444",
          },
          {
            addrName: "구월",
            phoneNum: "010-3333-4444",
          },
        ],
      },
      {
        text: "병원3",
        value: 2,
        mapDetailList: [
          {
            addrName: "청담",
            phoneNum: "010-3333-4444",
          },
        ],
      },
      {
        text: "병원4",
        value: 3,
      },
      {
        text: "병원5",
        value: 3,
      },
    ];
    setSearchItems(mapData);
  }, [filterActive]);

  return (
    <>
      <SlideBox style={{ right: filterActive === true ? "0rem" : "-30rem" }}>
        <Handler onClick={handleSlide}>
          <IoIosArrowBack />
          <h3>펼쳐보기</h3>
        </Handler>
        <SlideContainer>
          <SearchBar type="map" />
          <MapSlideItems searchItems={[searchItems]} />
        </SlideContainer>
      </SlideBox>
    </>
  );
};

export default MapFilterSlider;
