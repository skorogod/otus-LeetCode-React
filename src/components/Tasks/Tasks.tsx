import React, { useCallback } from "react";
import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { taskService } from "../../api/services/taskService";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { prepareRows } from "./methods/prepareRows";
import { Task } from "../../shared/interfaces/Task";
import { Tags } from "../Tags/Tags";

export const loader = async () => {
    const tasks = await taskService.getTasks()
    return tasks
}

export function Tasks() {
    console.log("TASKS RENDER")
    const tasks = useLoaderData() as Task[]

    const rows = prepareRows(tasks)

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'title',
          headerName: 'Title',
          width: 150,
          editable: true,
        },
        {
          field: 'solution',
          headerName: 'Solution',
          width: 150,
          editable: true,
          renderCell: (params) => (
            <Link to={params.value}>Перейти</Link>
          )
        },
        {
          field: 'level',
          headerName: 'Level',
          width: 110,
          editable: true,
        },
        {
          field: 'tags',
          headerName: 'Tags',
          width: 300,
          renderCell: (params) => (
            <Tags task={params.value.task}></Tags>
          )
          
        }
      ];

    return (
        <Box sx={{ height: 400, width: '100%', marginTop: '50px' }}>
          <DataGrid
            rows={prepareRows(tasks)}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      );
}