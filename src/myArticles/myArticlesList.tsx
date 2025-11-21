import { CustomInput } from "@/components/ui/CustomInput";
import Stepper from "./Stepper/Stepper";
import { SearchIcon } from "@/assets/SearchIcon";
import AddArticle from "./AddArticle/AddArticle";
import MyArticles from "./ListSteps/myArticles";

const MyArticlesList = () => {
  return (
    <div className="h-full space-y-5 p-3">
      <Stepper />
      <div className="h-[75%] space-y-5">
        <div className="h-4/5 w-full rounded border-2 border-x-2 border-dashed border-[#dee2e6] px-2 py-6">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-center md:justify-end gap-3">
              <div className="relative w-auto">
                <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/3 z-10 flex -translate-x-1/2 transform items-center">
                  <SearchIcon />
                </div>
                <CustomInput
                  label=""
                  className="rounded-lg border-[#E6E6E6] bg-[#FAFAFA] py-2 pl-12 pr-4"
                  placeholder="Chercher"
                />
              </div>
              <AddArticle />
            </div>
            <MyArticles />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyArticlesList;
