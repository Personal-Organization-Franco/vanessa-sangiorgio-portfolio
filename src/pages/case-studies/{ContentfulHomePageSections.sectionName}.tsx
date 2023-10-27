import MainLayout from "components/MainLayout";
import { PageProps } from "gatsby";

const SectionPage = (props: PageProps) => {
  console.log(props);
  return (
    <MainLayout>
      <div>Is there someone here?</div>
    </MainLayout>
  );
};

export default SectionPage;
