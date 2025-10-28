import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { Trash, SquarePen } from "lucide-react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

//Component
import { Drawer } from "../components";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";

//API Lib
import { axiosInstance } from "../util/axiosInstance";

function Department() {
  const [openSnack, setOpenSnack] = useState({});

  const [openDrawer, setOpenDrawer] = useState({
    status: false,
    drawerType: "addNew",
  });

  const [formData, setFormData] = useState({
    deptCode: "",
    deptName: "",
  });

  const [table, setTable] = useState({
    columns: [
      { field: "id", headerName: "ID" },
      { field: "departmentCode", headerName: "Department Code", flex: 1 },
      { field: "departmentName", headerName: "Department Name", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
          <div className="flex gap-2 justify-center h-full">
            {/* ✅ Render JSX here */}
            <div className="my-auto">
              <SquarePen size={14} className="text-primary" />
            </div>
            <div className="my-auto">
              <Trash size={14} className="text-red-600" />
            </div>
          </div>
        ),
      },
    ],
    rows: [],
  });

  const handleSnackDrawer = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack((prev) => (prev ? false : true));
  };

  useEffect(() => {
    axiosInstance
      .get("/department")
      .then(function (response) {
        setTable((prev) => ({
          ...prev,
          rows: response.data.map((val, i) => {
            return {
              id: i,
              departmentCode: val.departmentcode,
              departmentName: val.departmentname,
            };
          }),
        }));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const paginationModel = { page: 0, pageSize: 5 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAddNewDepartment = async () => {
    await axiosInstance
      .post("/department", {
        departmentcode: formData.deptCode,
        departmentname: formData.deptName,
      })
      .then(function (response) {
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnack}
          onClose={handleSnackDrawer}
          message="I love snacks"
        />;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const handleOnSubmitNewDepartment = () => {
    handleSnackDrawer();
    onAddNewDepartment();
    setOpenDrawer((prev) => ({
      ...prev,
      drawerType: "addNew",
      status: true,
    }));
  };

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-2xl font-bold mb-4">Department</h2>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <TextField
              id="outlined-helperText"
              label="Department ID"
              placeholder="Please fill your department ID"
              size="small"
              className="flex-1"
            />
            <Button
              variant="outlined"
              onClick={() =>
                setOpenDrawer((prev) => ({
                  ...prev,
                  drawerType: "addNew",
                  status: true,
                }))
              }
            >
              Add New
            </Button>
          </div>

          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={table.rows}
              columns={table.columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              GridNoColumnsOverlay
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>
      <Drawer
        open={openDrawer.status}
        onClose={() =>
          setOpenDrawer((prev) => ({
            ...prev,
            status: false,
          }))
        }
      >
        {openDrawer.drawerType === "addNew" ? (
          <div className="flex flex-col gap-2 p-5">
            <span className="text-xl font-bold mb-4">Add New Department</span>

            {/* <div className="grid grid-cols-2 gap-2">
              <OutlinedInput placeholder="Department Code" size="small" />
              <OutlinedInput placeholder="Department Name" size="small" />
            </div> */}
            <form
              noValidate
              autoComplete="off"
              className="flex flex-col gap-2 items-end"
            >
              <div className="!grid !grid-cols-2 gap-2 w-full">
                <FormControl className="">
                  <OutlinedInput
                    placeholder="Department Code"
                    name="deptCode"
                    onChange={handleChange}
                    size="small"
                  />
                </FormControl>
                <FormControl>
                  <OutlinedInput
                    placeholder="Department Name"
                    name="deptName"
                    onChange={handleChange}
                    size="small"
                  />
                </FormControl>
              </div>

              <Button variant="contained" onClick={handleOnSubmitNewDepartment}>
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div>test</div>
        )}
      </Drawer>
    </>
  );
}

export default Department;
