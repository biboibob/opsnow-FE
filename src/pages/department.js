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

//API Lib
import { axiosInstance } from "../util/axiosInstance";

function Department() {
  const [openDrawer, setOpenDrawer] = useState(false);

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
            <Button variant="outlined" onClick={() => setOpenDrawer(true)}>Add New</Button>
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
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className="p-4">Add New Department Soon</div>
      </Drawer>
    </>
  );
}

export default Department;
