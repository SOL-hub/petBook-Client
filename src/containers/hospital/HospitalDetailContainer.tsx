import HospitalBasicInfo from "@components/hospital/HospitalBasicInfo";
import { HospitalInfoUL } from "@components/hospital/HospitalBasicInfo/styled";
import PossibleAnimalList from "@components/hospital/PossibleAnimalList";
import { ButtonBox } from "@components/hospital/HospitalDetail";
import {
  ButtonBoxDiv,
  LineDiv,
} from "@components/hospital/HospitalDetail/styled";
import { useResource } from "@lib/hooks/common/useResource";
import { HOSPITAL_DETAIL } from "@lib/resources/hospitalResource";
import { useRouter } from "next/router";
import styled from "styled-components";

const HospitalDetailContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const payload = {
    pathParam: String(id),
  };
  const { data } = useResource({
    resource: HOSPITAL_DETAIL,
    payload,
  });
  if (!data) {
    // TODO: add skeleton ui
    return null;
  }
  return (
    <>
      <Image
        alt="hospital thumbnail"
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdkFgdv%2FbtrA5bltSLO%2FjcrSxiECGbBln8xpuWx3F1%2Fimg.jpg"
      />
      <Container>
        <section className="Section">
          <h1 className="Title">{data.response.data.result.name}</h1>
          <HospitalBasicInfo address={data.response.data.result.address} />
          <PossibleAnimalList />
          <ButtonBox divider id={Number(id)} />
        </section>
        <LineDiv />
      </Container>
    </>
  );
};
const Image = styled.img`
  width: 100%;
  height: 233px;
  margin-bottom: 12px;
  border-radius: 12px;
`;
const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  .Section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px 24px 24px;
  }
  .Title {
    color: var(--black_01);
    font-weight: bold;
    font-size: 34px;
  }
  ${ButtonBoxDiv} {
    grid-template-columns: 1fr 1px 1fr 1px 1fr;
    margin: 16px 0 0 0;
    padding: 14px 58px;
    border: 1px solid var(--black_04);
    border-radius: 12px;
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.15);
  }
  ${HospitalInfoUL} {
    padding: 0;
    margin: 0;
  }
`;

export default HospitalDetailContainer;
