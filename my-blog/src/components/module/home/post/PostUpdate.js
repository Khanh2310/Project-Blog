import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { db } from "firebase-app/firebase-config";
import useFireBaseImage from "hook/useFireBaseImage";
import DashBoardHeading from "components/module/dashboard/DashBoardHeading";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/label/input";
import { Radio } from "components/checkbox";
import { postNew } from "utils/contains";
import Toggle from "components/toggle/Toggle";
import ImageUpload from "components/image/ImageUpload";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
Quill.register("modules/imageUploader", ImageUploader);
const PostUpdate = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const [param] = useSearchParams();
  const postId = param.get("id");
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [selectCategory, setSelectCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState();
  const hanleUpdatePost = (values) => {
    if (!isValid) return;
    values.status = Number(values.status);
    const colRef = doc(db, "posts", postId);
    updateDoc(colRef, {
      ...values,
      image,
      content,
    });
    toast.success("Đăng bài thành công");
  };

  useEffect(() => {
    async function fetchCategory() {
      const colRef = doc(db, "posts", postId);
      const docData = await getDoc(colRef);
      if (docData) {
        reset(docData.data());
        setSelectCategory(docData.data()?.category || "");
        setContent(docData.data()?.content || "");
      }
    }
    fetchCategory();
  }, [postId, reset]);

  useEffect(() => {
    async function getQuery() {
      const colRef = collection(db, "catetories");
      const q = query(colRef, where("status", "==", 1));
      // Push tất cả các dữ liệu lấy ra được truyền vào result
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getQuery();
  }, []);

  const imageUrl = getValues("image");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl); // lấy vị trí chính xác của ảnh
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { deleteImage, onUpLoad, progress, image, setImage } = useFireBaseImage(
    setValue,
    getValues,
    imageName,
    deleteImagePost
  );
  const handleValues = async (item) => {
    const colRef = doc(db, "catetories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  async function deleteImagePost() {}
  useEffect(() => {
    setImage(imageUrl);
  }, [setImage, imageUrl]);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=133a8368ee1fbc500e8b8d1f67b1ecbe",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  return (
    <div>
      <DashBoardHeading
        title="Update Post"
        desc="A update post"
      ></DashBoardHeading>

      <form onSubmit={handleSubmit(hanleUpdatePost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postNew.APPROVED}
                value={postNew.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postNew.PENDING}
                value={postNew.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postNew.REJECT}
                value={postNew.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Category Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              className="h-[300px] w-[500px]"
              deleteImage={deleteImage}
              onChange={onUpLoad}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Please select an option"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => {
                        handleValues(item);
                      }}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>

            {selectCategory?.name && (
              <p className="inline-block p-4 bg-green-100 font-medium rounded-lg ">
                {selectCategory.name}
              </p>
            )}
          </Field>
        </div>

        <div className="mb-10">
          <Field>
            <Label></Label>
            <div className="w-full">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="entry-content"
                modules={modules}
              />
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
