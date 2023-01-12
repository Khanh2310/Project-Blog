import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/label/input";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/contains";
// import { db } from "../../../firebase-app/firebase-config";
// import { categoryStatus } from "../../../utils/contains";
// import { Button } from "../../button";
// import Radio from "../../checkbox/Radio";
// import { Field } from "../../field";
// import { Label } from "../../label";
// import { Input } from "../../label/input";

const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const handleSubmitCategory = async (values) => {
    if (!isValid) return;
    values.slug = slugify(values.slug || values.name, { lower: true });
    const colRef = collection(db, "catetories");
    values.status = Number(values.status);
    try {
      await addDoc(colRef, {
        ...values,
        createdAt: serverTimestamp(),
      });
      toast.success("Thêm danh mục thành công");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");

  return (
    <>
      {/* <DashBoardHeading
        title="New category"
        desc="Add new category"
      ></DashBoardHeading> */}
      <form onSubmit={handleSubmit(handleSubmitCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout mt-10">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          kind="secondary"
          className="mx-auto"
          type="submit"
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </>
  );
};

export default CategoryAddNew;
