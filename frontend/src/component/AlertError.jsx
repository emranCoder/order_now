import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeToast } from "../redux/ToastSlice";

export default function AlertError() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);

  return (
    toast.type && (
      <div className="w-80 mt-5 absolute right-5 z-20 px-0 shadow-lg">
        <Collapse in={open}>
          <Alert
            severity={toast.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    dispatch(removeToast());
                  }, 1000);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {toast.msg}
          </Alert>
        </Collapse>
      </div>
    )
  );
}
