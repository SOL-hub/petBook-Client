import { BookmarkBlankIcon } from "@components/common/icon/Bookmark";
import CustomSwiper, {
  SlideNextButton,
  SlidePrevButton,
} from "@components/common/Slider";
import navigator from "@lib/modules/navigator";
import { replaceQuery } from "@lib/modules/queryString";
import { useRouter } from "next/router";
import { SwiperSlide } from "swiper/react";
import PossibleAnimalList from "@components/common/hospital/PossibleAnimalList";
import HospitalBasicInfo from "@components/common/hospital/HospitalBasicInfo";
import Stats from "@components/common/hospital/Stats";
import { ImageSliderDiv, ItemHeader } from "./styled";

interface Props {
  id: number;
}

const HospitalItem = ({ id }: Props) => {
  const router = useRouter();
  const navigateToDetail = () => {
    const url = replaceQuery({ router, key: "name", query: "병원이름" });
    navigator({
      url,
      options: {
        shallow: true,
      },
    });
  };
  return (
    <article>
      <HospitalItem.ImageSlider id={id} />
      <ItemHeader>
        <h1 onClick={navigateToDetail}>병원 이름이 들어갑니다</h1>
        <button type="button">
          <BookmarkBlankIcon />
        </button>
      </ItemHeader>
      <PossibleAnimalList />
      <HospitalBasicInfo />
      <Stats />
      {/* 리뷰 좋았어요 나빴어요 */}
    </article>
  );
};

const ImageSlider = ({ id }: Props) => {
  const prevElId = `slider_prev_${id}`;
  const nextElId = `slider_next_${id}`;
  return (
    <ImageSliderDiv>
      <SlidePrevButton prevElId={prevElId} />
      <CustomSwiper loop prevElId={prevElId} nextElId={nextElId}>
        <SwiperSlide>illust</SwiperSlide>
        <SwiperSlide>asdfasdf</SwiperSlide>
      </CustomSwiper>
      <SlideNextButton nextElId={nextElId} />
    </ImageSliderDiv>
  );
};

HospitalItem.ImageSlider = ImageSlider;
export default HospitalItem;
