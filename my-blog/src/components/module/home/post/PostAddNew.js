import { useForm } from "react-hook-form";
import styled from "styled-components";
import slugify from "slugify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import useFireBaseImage from "hook/useFireBaseImage";
import { Field, FieldCheckboxes } from "components/field";
import { Label } from "components/label";
import { Input } from "components/label/input";
import { Radio } from "components/checkbox";
import { postNew } from "utils/contains";
import Toggle from "components/toggle/Toggle";
import ImageUpload from "components/image/ImageUpload";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { userInfor } = useAuth();
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 2,
      title: "",
      slug: "",
      categoryId: "",
      hot: false,
      image: "",
      user: "",
      content: "",
    },
  });
  const [categories, setCategories] = useState([]);
  const watchHot = watch("hot");
  const [selectCategory, setSelectCategory] = useState({});
  const [content, setContent] = useState("");

  const handleValues = async (item) => {
    const colRef = doc(db, "catetories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfor.email)
      );
      const docSnapShot = await getDocs(q);
      docSnapShot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfor.email]);

  useEffect(() => {
    // truy vấn giá trị từ data
    async function getQuery() {
      const colRef = collection(db, "catetories");
      const q = query(colRef, where("status", "==", 1));
      // Push tất cả các dữ liệu lấy ra được truyền vào result
      let result = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories(result);
      });
    }
    getQuery();
  }, []);
  const { image, progress, deleteImage, onUpLoad, setImage } = useFireBaseImage(
    setValue,
    getValues
  );

  const addNewHandler = async (values) => {
    values.slug = slugify(values.slug || values.title, { lower: true });
    values.status = Number(values.status);
    // thêm bài viết
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...values,
      content,
      categoryId: values.category.id,
      userId: values.user.id,
      image,
      // userId: userInfor.uid,
      creactedAt: serverTimestamp(),
    });
    toast.success("Đăng bài thành công");
    reset({
      status: 2,
      title: "",
      slug: "",
      categoryId: {},
      hot: false,
      image: "",
      progress: 0,
      user: {},
      content: "",
    });
    setImage("");
    setSelectCategory({});
    setContent("");
  };
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
  if (!setValue || !getValues) return;
  const watchStatus = watch("status");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.title = "Post Add New";
  });

  return (
    <PostAddNewStyles>
      <form onSubmit={handleSubmit(addNewHandler)}>
        <div className="form-layout">
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
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
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
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Category Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              className="h-[250px]"
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
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
              />
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto w-[250px]">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
