import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/label/input";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/contains";
const CategoryUpdate = () => {
  const {
    watch,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [param] = useSearchParams();
  const categoryId = param.get("id");

  useEffect(() => {
    async function fetchUpdate() {
      const colRef = doc(db, "catetories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchUpdate();
  }, [categoryId, reset]);
  const naviate = useNavigate();
  if (!categoryId) return null;
  const handleSubmitCategory = async (values) => {
    values.status = Number(values.status);
    const colRef = doc(db, "catetories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: values.status,
    });
    toast.success("Cập nhật danh mục thành công");
    naviate("/manage/category");
  };

  const watchStatus = watch("status");

  return (
    <>
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

export default CategoryUpdate;
