import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';

import TableActions from './TableActions';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DayjsUtils from '@date-io/dayjs/build/dayjs-utils';
// import { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';

// const dayjs = new DayjsUtils();

export async function getStaticProps() {
  const { data: offhire_db, error } = await supabase
    .from('offhire_db')
    .select('*')
    .is('submit_date', null);

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      offhire_db,
      error,
    },
  };
}

// const rows = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const columns = [
  {
    field: 'order_date',
    headerName: 'Order Date',
    width: 100,
    editable: true,
    type: 'date',
    headerAlign: 'center',
    align: 'center',
    // valueFormatter: (params) => dayjs(params?.value).format('DD/MM/YYYY'),
  },
  {
    field: 'customer',
    headerName: 'Customer',
    width: 70,
    headerAlign: 'center',
    align: 'center',
    editable: true,
  },
  {
    field: 'unit_no',
    headerName: 'Unit',
    width: 120,
    headerAlign: 'center',
    align: 'center',
    editable: true,
  },
  {
    field: 'survey_type',
    headerName: 'Survey Type',
    width: 80,
    headerAlign: 'center',
    align: 'center',
    editable: true,
    type: 'singleSelect',
    valueOptions: ['INS', 'OFF'],
  },
  {
    field: 'depot',
    headerName: 'Depot',
    width: 70,
    headerAlign: 'center',
    align: 'center',
    editable: true,
  },
  {
    field: 'survey_date',
    headerName: 'Survey Date',
    width: 100,
    editable: true,
    type: 'date',
    headerAlign: 'center',
    align: 'center',
    // valueFormatter: (params) => dayjs(params?.value).format('DD/MM/YYYY'),
  },
  {
    field: 'submit_date',
    headerName: 'Submit Date',
    width: 100,
    editable: true,
    type: 'date',
    headerAlign: 'center',
    align: 'center',
    // valueFormatter: (params) => dayjs(params?.value).format('DD/MM/YYYY'),
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 100,
    editable: true,
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    // valueFormatter: (params) => dayjs(params?.value).format('DD/MM/YYYY'),
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    type: 'actions',
    renderCell: (params) => {
      <TableActions {...{ params, rowId, setRowId }} />;
    },
    // const onClick = (e) => {
    //   e.stopPropagation(); // don't select this row after clicking
    //   console.log(params);
    //   // const {
    //   //   customer,
    //   //   depot,
    //   //   unit_no,
    //   //   survey_date,
    //   //   submit_date,
    //   //   approval_date,
    //   //   remark,
    //   // } = params.row;

    //   const api = params.api;
    //   const thisRow = {};

    //   const updateData = async (attrib) => {
    //     const { data, error } = await supabase
    //       .from('offhire_db')
    //       .update({ depot: depot })
    //       .eq('id', id);
    //   };
    //   api
    //     .getAllColumns()
    //     .filter((c) => c.field !== '__check__' && !!c)
    //     .forEach(
    //       (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //     );

    // console.log(thisRow);

    // return alert(JSON.stringify(thisRow, null, 4));
    // };

    //   return (
    //     <Button variant="outlined" size="small" onClick={onClick}>
    //       Save
    //     </Button>
    //   );
    // },
  },
];

// style={{ height: 800  }}

export default function ShowTableGrid({ offhire_db, error }) {
  // console.log(offhire_db);
  // const [value, setValue] = useState(null);
  // console.log(error);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={offhire_db}
        columns={columns}
        // getRowId={(row) => row._id}
        experimentalFeatures={{ newEditingApi: true }}
        loading={!offhire_db.length}
        rowHeight={35}
        rowsPerPageOptions={[10, 15, 25, 50]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        sx={{ height: '98vh', width: '70vw', margin: 'auto', my: 1 }}
        onCellEditCommit={(params) => setRowId(params.id)}
        // onCellClick={(params, event) => event.stopPropagation()}
      />
    </div>
  );
}
