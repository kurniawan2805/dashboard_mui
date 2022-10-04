import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';

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

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function ShowTableGrid({ offhire_db }) {
  // console.log(offhire_db);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
