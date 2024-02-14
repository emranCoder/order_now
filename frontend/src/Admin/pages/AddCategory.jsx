import React from "react";
import AddIcon from "@mui/icons-material/Add";
export default function AddCategory() {
  return (
    <div className="rounded-xl border shadow-lg p-10 max-sm:p-5">
      <div className="container">
        <div className="category-box">
          <div className="head flex justify-between">
            <h3 className="text-lg font-semibold text-slate-600">Category</h3>
            <div className="tooltip" data-tip="Add Category">
              <button
                className=" bg-transparent mr-5 border-dotted border-slate-500 p-1  border-2 rounded-full text-slate-500 cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <AddIcon sx={{ fontSize: 25 }} />
              </button>
            </div>
          </div>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">New Category!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action justify-center">
                <form method="dialog">
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1oc"
                  />
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="rounded-lg my-5 w-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1oc textarea textarea-bordered"
                  />
                  <div className="grid grid-cols-2 gap-1 my-5">
                    <button
                      type="btn"
                      className="rounded-lg bg-sky-600 btn hover:bg-green-600 text-white"
                    >
                      GO
                    </button>
                    <button className="btn bg-slate-500 text-white hover:bg-red-500 ">
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
