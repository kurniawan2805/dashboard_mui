import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
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
  },
  {
    field: 'unit_no',
    headerName: 'Unit',
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'survey_type',
    headerName: 'Survey Type',
    width: 70,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'depot',
    headerName: 'Depot',
    width: 70,
    headerAlign: 'center',
    align: 'center',
  },
];

// style={{ height: 800  }}

export default function ShowTableGrid({ offhire_db }) {
  // console.log(offhire_db);
  const [value, setValue] = useState(null);
  return (
    <div>
      <DataGrid
        rows={offhire_db}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        sx={{ height: '100vh' }}
      />
    </div>
  );
}
