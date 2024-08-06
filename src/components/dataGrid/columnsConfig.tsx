import { GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Transaction } from '../../services/types';
import PriceChangeSpan from './PriceChangeSpan';
import { Box } from '@mui/system';
import StyledLink from '../StyledLink';
import { DocumentData } from 'firebase/firestore';

export const createColumns = (
	handleAddButtonClick: (rowId: string) => void,
	transactions?: Transaction[] | DocumentData[],
	handleRemoveTransaction?: (coin: string) => void
): GridColDef[] => [
	{ field: 'col1', headerName: '#', width: 50, resizable: false, disableColumnMenu: true },
	{
		field: 'image',
		headerName: '',
		flex: 1,
		maxWidth: 60,
		resizable: false,
		hideSortIcons: true,
		disableColumnMenu: true,
		disableReorder: true,
		sortable: false,
		renderCell: ({ value }) => (
			<Box marginTop='10px'>
				<img src={value} width='30px' />
			</Box>
		),
	},
	{
		field: 'nameWithSymbol',
		headerName: 'Waluta',
		flex: 1,
		resizable: false,
		disableColumnMenu: true,
		renderCell: ({ id, value }) => (
			<StyledLink linkTo={`/coin-details/${id}`} label={value} color='black' marginTop='14px' fontSize='0.9rem' />
		),
	},
	{
		field: 'currentPrice',
		headerName: 'Kurs',
		flex: 1,
		resizable: false,
		disableColumnMenu: true,
	},
	{
		field: 'dayChangeValue',
		headerName: '24h',
		flex: 1,
		resizable: false,
		disableColumnMenu: true,
		renderCell: ({ value }) => <PriceChangeSpan value={value} />,
	},
	{ field: 'totalVolume', headerName: 'Wolumen 24h', flex: 1, resizable: false, disableColumnMenu: true },
	{ field: 'marketCap', headerName: 'Kapitalizacja rynkowa', flex: 1, resizable: false, disableColumnMenu: true },
	{
		field: 'totalAmount',
		headerName: 'Ilość',
		flex: 1,
		resizable: false,
		disableColumnMenu: true,
	},
	{
		field: 'currentValue',
		headerName: 'Wartość',
		flex: 1,
		resizable: false,
		disableColumnMenu: true,
	},
	{
		field: 'addValue',
		headerName: transactions?.length ? 'Edytuj' : 'Dodaj',
		flex: 1,
		resizable: false,
		disableColumnMenu: true,
		sortable: false,
		renderCell: ({ row }) => {
			return (
				<Button
					sx={{
						minWidth: '40px',
					}}
					onClick={() => {
						handleAddButtonClick(row.id);
					}}>
					+
				</Button>
			);
		},
	},
	{
		field: 'removeValue',
		headerName: 'Usuń',
		flex: 1,
		resizable: false,
		disableColumnMenu: true,
		sortable: false,
		renderCell: ({ row }) => {
			const transaction = (transactions ? transactions : []).find(t => t.coin === row.id);

			return (
				<Button
					sx={{
						minWidth: '40px',
					}}
					onClick={() => {
						if (handleRemoveTransaction) {
							handleRemoveTransaction(row.id);
						}
					}}
					disabled={!transaction || transaction.amount <= 0}>
					-
				</Button>
			);
		},
	},
];
