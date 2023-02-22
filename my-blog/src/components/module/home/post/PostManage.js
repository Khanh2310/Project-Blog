import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import { Table } from "components/table";
import { userRole } from "utils/contains";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { Loading } from "components/loading";
const PostManage = () => {
  const [postList, setPostList] = useState("");
  const [postListUser, setPostListUser] = useState([]);
  const [lastDocs, setLastDocs] = useState(0);

  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const POST_PAGE = 2;

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      // search posts
      const q = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PAGE));

      const documentSnapshots = await getDocs(q);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDocs(lastVisible);
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(q, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setPostList(result);
        setPostListUser(result);
      });
    }
    fetchData();
  }, [filter]);

  const hanleLoadMorePost = async () => {
    setLoading(true);
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDocs),
      limit(POST_PAGE)
    );
    setLastDocs(nextRef);

    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setPostList([...postList, ...result]);
    });
    setLastDocs(nextRef);
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDocs(lastVisible);
    setLoading(false);
  };

  const date = postList?.creactedAt?.seconds
    ? new Date(postList?.creactedAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  const handlDeletePost = (postId) => {
    const colRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  // handle Search
  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 250);

  // Update
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Post Manage";
  });
  const { userInfor } = useAuth();

  useEffect(() => {
    async function getQuery() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("user.email", "==", userInfor.email));
      // Push tất cả các dữ liệu lấy ra được truyền vào result
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setPostListUser(result);
      });
    }
    getQuery();
  }, [userInfor.email]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1 className="dashboard-heading text-[30px] font-semibold mb-5">
        Manage post
      </h1>
      <div className="mb-10 flex justify-end gap-5">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <Table> 
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userInfor.role === userRole.ADMIN ? (
            postList.length > 0 &&
            postList.map((post) => (
              <tr key={post.id}>
                <td></td>
                <td title={post.id}>{post?.id.slice(0, 4) + "..."}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post?.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{post.title}</h3>
                      <time className="text-sm text-gray-500">
                        Date: {formatDate}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500 whitespace-nowrap">
                    {post?.category?.name}
                  </span>
                </td>
                <td>
                  <span className="text-gray-500 whitespace-nowrap">
                    {post?.user?.name}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post.id}`)
                      }
                    ></ActionEdit>

                    <ActionDelete
                      onClick={() => handlDeletePost(post.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <>
              {postListUser &&
                postListUser.length > 0 &&
                postListUser.map((item) => (
                  <tr key={item.id}>
                    <td></td>
                    <td title={item.id}>{item?.id.slice(0, 4) + "..."}</td>

                    <td>
                      <div className="flex items-center gap-x-3">
                        <img
                          src={item?.image}
                          alt=""
                          className="w-[66px] h-[55px] rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <time className="text-sm text-gray-500">
                            Date: {formatDate}
                          </time>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray-500 whitespace-nowrap">
                        {item?.category?.name}
                      </span>
                    </td>
                    <td>
                      <span className="text-gray-500 whitespace-nowrap">
                        {item?.user?.name}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-x-3 text-gray-500">
                        <ActionView
                          onClick={() => navigate(`/${item.slug}`)}
                        ></ActionView>
                        <ActionEdit
                          onClick={() =>
                            navigate(`/manage/update-post?id=${item.id}`)
                          }
                        ></ActionEdit>

                        <ActionDelete
                          onClick={() => handlDeletePost(item.id)}
                        ></ActionDelete>
                      </div>
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </Table>

      {userInfor.role === userRole.ADMIN
        ? total > postList.length && (
            <div className="mt-10 w-[500px] mx-auto">
              <Button onClick={hanleLoadMorePost}>
                {loading ? <Loading></Loading> : "LoadMore"}
              </Button>
            </div>
          )
        : total > postListUser.length && (
            <div className="mt-10 w-[500px] mx-auto">
              <Button onClick={hanleLoadMorePost}>
                {loading ? <Loading></Loading> : "LoadMore"}
              </Button>
            </div>
          )}
    </div>
  );
};

export default PostManage;
