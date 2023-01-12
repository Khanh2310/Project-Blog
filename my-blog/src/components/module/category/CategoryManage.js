import React, { useEffect, useState } from "react";

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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Table } from "components/table";
import LabelStatus from "components/label/LabelStatus";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { db } from "firebase-app/firebase-config";
import { useAuth } from "contexts/auth-context";
import { categoryStatus, userRole } from "utils/contains";
import { Button } from "components/button";
import { Loading } from "components/loading";
const CategoryManage = () => {
  const [categoryStatusManage, setCategoryStatusManage] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDocs, setLastDocs] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const CATEGOTY_PAGE = 1;
  const handleSearchCategories = (e) => {
    setFilter(e.target.value);
  };
  const hanleLoadMore = async () => {
    setLoading(true);
    const nextRef = query(
      collection(db, "catetories"),
      startAfter(lastDocs),
      limit(CATEGOTY_PAGE)
    );
    setLastDocs(nextRef);

    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setCategoryStatusManage([...categoryStatusManage, ...result]);
    });
    setLastDocs(nextRef);
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDocs(lastVisible);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "catetories");
      // search category
      const q = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGOTY_PAGE));
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      const documentSnapshots = await getDocs(q);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDocs(lastVisible);
      onSnapshot(q, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setCategoryStatusManage(result);
      });
    }
    fetchData();
  }, [filter]);

  //delete danh mục
  const handleDelete = async (docId) => {
    const colRef = doc(db, "catetories", docId);
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
  const navigate = useNavigate();
  const { userInfor } = useAuth();
  if (userInfor.role !== userRole.ADMIN) return;

  return (
    <div>
      <div className="mb-10 flex justify-end">
        <div className="search-box  ">
          <button className="btn-search flex items-center justify-center">
            <span className="text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Enter your Search..."
            onChange={handleSearchCategories}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categoryStatusManage.length > 0 &&
            categoryStatusManage.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="text-gray-400 italic">{category.slug}</span>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/category-update?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDelete(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categoryStatusManage.length && (
        <div className="mt-10 w-[300px] mx-auto">
          <Button
            type="submit"
            className="mt-10 bg-gray-400 p-4 rounded-xl text-white block mx-auto
        "
            onClick={hanleLoadMore}
          >
            {loading ? <Loading></Loading> : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
